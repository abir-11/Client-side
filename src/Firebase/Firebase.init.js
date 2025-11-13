// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXmZq4UmFzW0hDxIwvZ5-0bizg1l1nzW4",
  authDomain: "my-kishilink.firebaseapp.com",
  projectId: "my-kishilink",
  storageBucket: "my-kishilink.firebasestorage.app",
  messagingSenderId: "409457439123",
  appId: "1:409457439123:web:0e5c769b2398e19510f866"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);