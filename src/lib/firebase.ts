import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD-w0IlOTsIj4o2yawHHbdmPfw0_IRQzJ4",
  authDomain: "flight-booking-tickets.firebaseapp.com",
  projectId: "flight-booking-tickets",
  storageBucket: "flight-booking-tickets.firebasestorage.app",
  messagingSenderId: "98069041312",
  appId: "1:98069041312:web:fa2b99bce2f26bfe3bb9c5",
  measurementId: "G-3RJD7XYNRS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
