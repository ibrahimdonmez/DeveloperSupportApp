import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJWJPcqYnI8nII8uwp8YKvQV6R8Q1n9U0",
    authDomain: "hayvanbesleme-f9c65.firebaseapp.com",
    databaseURL: "https://hayvanbesleme-f9c65.firebaseio.com",
    projectId: "hayvanbesleme-f9c65",
    storageBucket: "hayvanbesleme-f9c65.appspot.com",
    messagingSenderId: "883719925149",
    appId: "1:883719925149:web:5e3c7057543ebf8f7ed374"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}