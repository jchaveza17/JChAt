import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chat-d314e.firebaseapp.com",
  databaseURL: "https://chat-d314e-default-rtdb.firebaseio.com",
  projectId: "chat-d314e",
  storageBucket: "chat-d314e.appspot.com",
  messagingSenderId: "350252999354",
  appId: "1:350252999354:web:821ee22d254ec0f32fd883",
  measurementId: "G-01LS1TWN64"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
