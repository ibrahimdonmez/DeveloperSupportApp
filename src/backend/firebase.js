import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvTTQD-f5v8DuCP6A8OE79O1YNjsfHyhk",
  authDomain: "developersupport-c988b.firebaseapp.com",
  projectId: "developersupport-c988b",
  storageBucket: "developersupport-c988b.appspot.com",
  messagingSenderId: "821415087116",
  appId: "1:821415087116:web:843f0252b3b522007af229",
  measurementId: "G-ZH5LRFFWMS"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}