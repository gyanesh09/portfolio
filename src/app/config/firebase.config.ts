// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF4JIFP8ZeDOKO6UXHM3997ZuKIYTRmLE",
  authDomain: "my-portfolio-5722a.firebaseapp.com",
  projectId: "my-portfolio-5722a",
  storageBucket: "my-portfolio-5722a.appspot.com",
  messagingSenderId: "1089595672594",
  appId: "1:1089595672594:web:1e13d1318711cf0d5f70cb",
  measurementId: "G-JZQJ03J9QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);