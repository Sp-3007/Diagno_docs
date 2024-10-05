// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHSG-BlMBXhL1cDpmIdviYIGH_oCjnJDE",
  authDomain: "my-project-sp2007.firebaseapp.com",
  projectId: "my-project-sp2007",
  storageBucket: "my-project-sp2007.appspot.com",
  messagingSenderId: "403707906095",
  appId: "1:403707906095:web:eb436b31b24ea414021eda",
  measurementId: "G-ND475L90ML",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {
  auth,
  firestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  setDoc,
};
