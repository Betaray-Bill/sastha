// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8K-4aUtsAuv52xHHM8fqxhw03-q_i-74",
    authDomain: "silver-white.firebaseapp.com",
    projectId: "silver-white",
    storageBucket: "silver-white.firebasestorage.app",
    messagingSenderId: "406705848343",
    appId: "1:406705848343:web:dfd15d1d5be2374cc49c52",
    measurementId: "G-BWWC32674S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore()
const storage = getStorage();
export { app, auth, db, storage }