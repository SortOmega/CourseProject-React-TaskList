// Import the functions you need from the SDKs you need
import { firebaseConfigType } from "../types";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  collectionGroup,
  enableIndexedDbPersistence,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(
  import.meta.env.VITE_APP_FIREBASE_API
) as firebaseConfigType;
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FireDB = getFirestore(app);

enableIndexedDbPersistence(FireDB);

export const FireDBCollection = collection(FireDB, "TaskList");

export const FireDBQueryTasks = collectionGroup(FireDB, "TaskList");
