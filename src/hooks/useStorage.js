import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { projectStorage, projectFirestore } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return;

    // Crear una referencia a la ubicación del archivo en Firebase Storage
    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, 'images'); 

    // Crear una tarea de carga
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Supervisar el progreso de la carga
    const handleStateChanged = (snapshot) => {
      const percentage =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    };

    const handleError = (err) => {
      setError(err.message || "Error desconocido");
    };

    const handleComplete = async () => {
      try {
        // Obtener la URL de descarga después de que se complete la carga
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const createdA = serverTimestamp(); // Usar serverTimestamp directamente
        await addDoc(collectionRef, { url: downloadURL, createdA });
        setUrl(downloadURL);
      } catch (err) {
        setError(err.message || "Error al obtener la URL de descarga");
      }
    };

    uploadTask.on("state_changed", handleStateChanged, handleError, handleComplete);

    // Limpiar la tarea en caso de que el componente se desmonte
    return () => {
      uploadTask.cancel(); // Cancelar la tarea si es necesario
    };
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
