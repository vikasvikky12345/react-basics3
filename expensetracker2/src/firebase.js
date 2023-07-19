// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7a_tsqYBa7ezFGXcVv9OVlimPfyl6Cyo",
  authDomain: "expensetracker2-2f55b.firebaseapp.com",
  projectId: "expensetracker2-2f55b",
  storageBucket: "expensetracker2-2f55b.appspot.com",
  messagingSenderId: "586803189222",
  appId: "1:586803189222:web:94062daeec290f1fdcb227"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;