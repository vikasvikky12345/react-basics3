// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAPsEERRbf7-2ZQjXKUgxUR7FXJZLevU8",
  authDomain: "expensetracker-acdfa.firebaseapp.com",
  projectId: "expensetracker-acdfa",
  storageBucket: "expensetracker-acdfa.appspot.com",
  messagingSenderId: "1023628893050",
  appId: "1:1023628893050:web:d4568bbc59088dd72494c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
