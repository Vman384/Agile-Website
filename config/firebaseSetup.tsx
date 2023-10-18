import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDMIsLJij9RKWuBv-EXJ4grXiWshqctSqA",
    authDomain: "sunday-74800.firebaseapp.com",
    projectId: "sunday-74800",
    storageBucket: "sunday-74800.appspot.com",
    messagingSenderId: "1027834778167",
    appId: "1:1027834778167:web:b1bc1bc2ed9daa656925b2",
    measurementId: "G-ND80X4XHDT",
};

export const app = firebase.initializeApp(firebaseConfig);

// Export the auth object for use in other parts of your application
export const auth = getAuth(app);
export const db = getFirestore(app);
