import React, { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

const ImageGrid = ({ setSelectedImg }) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(projectFirestore, "images")
      );
      const imagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(imagesData);
    };

    fetchData();
  }, []);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img src={doc.url} alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;

