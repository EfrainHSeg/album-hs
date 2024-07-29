import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, serverTimestamp } from 'firebase/firestore'; 

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjvmmQt9w-f0maol3oUH5UXVxjjDaSp1g",
  authDomain: "fotos-hsg.firebaseapp.com",
  projectId: "fotos-hsg",
  storageBucket: "fotos-hsg.appspot.com",
  messagingSenderId: "670457493700",
  appId: "1:670457493700:web:eccc814e506aebee22f191",
  measurementId: "G-9N58P463WF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

// Use serverTimestamp directly from Firestore
const timestamp = serverTimestamp;

export { projectStorage, projectFirestore, timestamp };


