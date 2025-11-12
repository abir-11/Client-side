// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwXb0qPjenFVfYdX6J-o1ZayUwPxinQYE",
  authDomain: "react-firebase-auth-6546f.firebaseapp.com",
  projectId: "react-firebase-auth-6546f",
  storageBucket: "react-firebase-auth-6546f.firebasestorage.app",
  messagingSenderId: "591825837605",
  appId: "1:591825837605:web:6d1ee460e7a79244f529cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);