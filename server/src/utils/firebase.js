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
    apiKey: NEXT_PUBLIC_apiKey,
    authDomain: NEXT_PUBLIC_authDomain,
    projectId: NEXT_PUBLIC_projectId,
    storageBucket: NEXT_PUBLIC_storageBucket,
    messagingSenderId: NEXT_PUBLIC_messagingSenderId,
    appId: NEXT_PUBLIC_appId,
    measurementId: NEXT_PUBLIC_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore()
const storage = getStorage();
export { app, auth, db, storage }