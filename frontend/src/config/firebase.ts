import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA0WL-PO7WXyoKg7GAs1FYcHrXDce5SQRs",
  authDomain: "guiver-84885.firebaseapp.com",
  projectId: "guiver-84885",
  storageBucket: "guiver-84885.firebasestorage.app",
  messagingSenderId: "66479803908",
  appId: "1:66479803908:web:c069cb71c3775b2e1b2f51",
  measurementId: "G-ZMDRW1X6P2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
