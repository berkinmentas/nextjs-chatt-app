// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJZlS2HU40G2BiIvJKK0AMEFlnYAszKh0",
  authDomain: "chat-app-d0659.firebaseapp.com",
  projectId: "chat-app-d0659",
  storageBucket: "chat-app-d0659.appspot.com",
  messagingSenderId: "698681533016",
  appId: "1:698681533016:web:2f1e2449ef76cbf91c602d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { auth, firestore, storage };
