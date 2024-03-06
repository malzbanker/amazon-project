import firebase from "firebase/compat/app";
// auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkr_3CZuB1LwoSAIcADBB-IdIdmB2mWTQ",
  authDomain: "clone-a1451.firebaseapp.com",
  projectId: "clone-a1451",
  storageBucket: "clone-a1451.appspot.com",
  messagingSenderId: "21626257537",
  appId: "1:21626257537:web:11291296cf0422be830d80"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=app.firestore();