import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyB3bA6U-tuxSTKbCLKhvE063InEKHSLilk",
    authDomain: "react-prep-35c31.firebaseapp.com",
    projectId: "react-prep-35c31",
    storageBucket: "react-prep-35c31.appspot.com",
    messagingSenderId: "184328408432",
    appId: "1:184328408432:web:f689b47a0eb387854b93b5",
    measurementId: "G-4ZQ51XCEND"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
