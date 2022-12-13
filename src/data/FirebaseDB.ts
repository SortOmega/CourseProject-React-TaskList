// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  collectionGroup,
  serverTimestamp,
  enableIndexedDbPersistence,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuKDQn9VBJMi-MURx_-8kAy4_Th6HndjM",
  authDomain: "courseproject-react-tasklist.firebaseapp.com",
  projectId: "courseproject-react-tasklist",
  storageBucket: "courseproject-react-tasklist.appspot.com",
  messagingSenderId: "726232439326",
  appId: "1:726232439326:web:07854ba6e4b81d04c62c0f",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FireDB = getFirestore(app);

enableIndexedDbPersistence(FireDB);

export const FireDBCollection = collection(FireDB, "TaskList");

export const FireDBQueryTasks = collectionGroup(FireDB, "TaskList");
