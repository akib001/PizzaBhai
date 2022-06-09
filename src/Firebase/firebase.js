// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5EFkIulaLwaKEIFlUKI4y9gioxqksUdM",
  authDomain: "rent-space-f74e9.firebaseapp.com",
  projectId: "rent-space-f74e9",
  storageBucket: "rent-space-f74e9.appspot.com",
  messagingSenderId: "344906644462",
  appId: "1:344906644462:web:c7d97e7157ed9d0fca6cff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};