// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-8d458.firebaseapp.com",
  projectId: "mern-estate-8d458",
  storageBucket: "mern-estate-8d458.appspot.com",
  messagingSenderId: "390557272018",
  appId: "1:390557272018:web:b42d4f80f9453824f32a0b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
