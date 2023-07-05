// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBePOlrRjt7rixWrm4c79EgFI6bAvMeJLE",
  authDomain: "reduxproject-473ea.firebaseapp.com",
  projectId: "reduxproject-473ea",
  storageBucket: "reduxproject-473ea.appspot.com",
  messagingSenderId: "655548570257",
  appId: "1:655548570257:web:3c80023e605227ad4c7d30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth};
