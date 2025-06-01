// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🔥 Firestore added

// 🔐 Your config
const firebaseConfig = {
  apiKey: "AIzaSyCxVLZ_MMCt5WrO-jPmZJAA9il-zsaAHJk",
  authDomain: "renderx-auth.firebaseapp.com",
  projectId: "renderx-auth",
  storageBucket: "renderx-auth.appspot.com",
  messagingSenderId: "287827637885",
  appId: "1:287827637885:web:075979b41288fe0fefa314",
  measurementId: "G-KJF9HGZ82P",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth & Firestore setup
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // ✅ Firestore initialized

// Export to use in components
export { auth, googleProvider, db };
