import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDHMzRoyxpJ5cpDa1XcqmEhcuJDzqSOnzk",
    authDomain: "smart-grocery-dev.firebaseapp.com",
    projectId: "smart-grocery-dev",
    storageBucket: "smart-grocery-dev.firebasestorage.app",
    messagingSenderId: "200546799246",
    appId: "1:200546799246:web:ec47c0c44067579c7943df",
    measurementId: "G-SVSQ999219"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();