// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3CFMXXoVRQwdsedn594e0jFkSo9EgVfA",
  authDomain: "insta-2-bd4b9.firebaseapp.com",
  projectId: "insta-2-bd4b9",
  storageBucket: "insta-2-bd4b9.appspot.com",
  messagingSenderId: "262610988111",
  appId: "1:262610988111:web:9e9a8c4c2b1927bf780e3a",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
