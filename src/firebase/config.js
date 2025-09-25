import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV-6Wt21Eal7CBh8RKp0F1g22amaH4P18",
  authDomain: "rambl-1c14c.firebaseapp.com",
  projectId: "rambl-1c14c",
  storageBucket: "rambl-1c14c.firebasestorage.app",
  messagingSenderId: "252111936296",
  appId: "1:252111936296:web:d0d48bd9905645be1f8e1d",
  measurementId: "G-6HEDV7GJEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Add these exports
export const auth = getAuth(app);
export default app;