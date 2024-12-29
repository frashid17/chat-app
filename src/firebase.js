import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzksjxQyKhokqxFxUnVcu3Dv2C_WcXr1Y",
  authDomain: "chat-app-c804a.firebaseapp.com",
  projectId: "chat-app-c804a",
  storageBucket: "chat-app-c804a.firebasestorage.app",
  messagingSenderId: "662986243954",
  appId: "1:662986243954:web:1ffca04dded6bfcc9a67eb",
  measurementId: "G-WZXR5HVWF4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); 