import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACyuXBzseOL9PRFy9ZfF-0wZoHSFkbLYc",
  authDomain: "school-app-b7201.firebaseapp.com",
  projectId: "school-app-b7201",
  storageBucket: "school-app-b7201.appspot.com",
  messagingSenderId: "843445258452",
  appId: "1:843445258452:web:0f7ed61f1731ad93385341"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export  {
  db,
  auth
}