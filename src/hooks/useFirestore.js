import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null); // Manejo de errores

  useEffect(() => {
    // Crear una referencia a la colección con ordenamiento
    const q = query(
      collection(projectFirestore, collectionName),
      orderBy("createdAt", "desc") // Asegúrate de usar el nombre correcto del campo de timestamp
    );

    // Escuchar los cambios en la colección
    const unsub = onSnapshot(
      q,
      (snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
        setError(null); // Limpiar errores si la carga es exitosa
      },
      (err) => {
        setError(err.message || "Error al obtener documentos");
        setDocs([]); // Limpiar documentos en caso de error
      }
    );

    // Limpieza de la suscripción
    return () => unsub();
  }, [collectionName]);

  return { docs, error }; // Devolver el error junto con los documentos
};

export default useFirestore;

