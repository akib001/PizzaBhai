// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAL0N1DDE5PErh_25vFihwZzgbQ2cozKYY',
  authDomain: 'react-http-597d3.firebaseapp.com',
  databaseURL: 'https://react-http-597d3-default-rtdb.firebaseio.com',
  projectId: 'react-http-597d3',
  storageBucket: 'react-http-597d3.appspot.com',
  messagingSenderId: '353984176080',
  appId: '1:353984176080:web:6b50fb5fff9b938a1ea3d5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
