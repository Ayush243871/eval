import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAQlc4nqiliDR6_8iiVFH8NKE7Mt_ss8C0",
  authDomain: "eval-ce5dc.firebaseapp.com",
  databaseURL: "https://eval-ce5dc-default-rtdb.asia-southeast1.firebasedatabase.app/books.json",
  projectId: "eval-ce5dc",
  storageBucket: "eval-ce5dc.appspot.com",
  messagingSenderId: "486126649922",
  appId: "1:486126649922:web:953f5936b5638654cca3db",
  measurementId: "G-8MCRZZ157W"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
