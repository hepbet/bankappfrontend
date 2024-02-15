// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3DiHYGo6irZ3lJ26ERsdhA7wQafnecGw",
  authDomain: "bankapp-b1c47.firebaseapp.com",
  projectId: "bankapp-b1c47",
  storageBucket: "bankapp-b1c47.appspot.com",
  messagingSenderId: "479268736472",
  appId: "1:479268736472:web:0787f80d5f304365a636ad"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;