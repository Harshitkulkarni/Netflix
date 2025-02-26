// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeox-RRaE9N7VrfJO3t0eo3iXevGBQFus",
  authDomain: "netflix-f3215.firebaseapp.com",
  projectId: "netflix-f3215",
  storageBucket: "netflix-f3215.firebasestorage.app",
  messagingSenderId: "146393443852",
  appId: "1:146393443852:web:0d058be02142b8c3ad8829",
  measurementId: "G-SN3K9C1QDB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
