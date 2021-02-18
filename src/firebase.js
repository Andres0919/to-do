import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaD02FoU84cg9LeJCA8kSlDKgjOabTR3g",
  authDomain: "crud-35799.firebaseapp.com",
  projectId: "crud-35799",
  storageBucket: "crud-35799.appspot.com",
  messagingSenderId: "969828408223",
  appId: "1:969828408223:web:6bc94b5bf4de5e5c4bfbaa",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
