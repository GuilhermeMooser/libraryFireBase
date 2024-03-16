// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLcVUbI9y_Fgtp-fJjvGBy39vMgn-f54E",
  authDomain: "exemplo1-4d5c8.firebaseapp.com",
  databaseURL: "https://exemplo1-4d5c8-default-rtdb.firebaseio.com",
  projectId: "exemplo1-4d5c8",
  storageBucket: "exemplo1-4d5c8.appspot.com",
  messagingSenderId: "738540581265",
  appId: "1:738540581265:web:4daa22eeca641eb8746a30",
  measurementId: "G-6MKRLNXN5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth};
