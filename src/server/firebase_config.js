// src/firebase_config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebase_config = {
  // meine firebase config object here
  apiKey: "AIzaSyC79rGpPx7kU4aPS_0FD9JKamfIDViJMds",
  authDomain: "svelte-bulma.firebaseapp.com",
  databaseURL:
    "https://svelte-bulma-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "svelte-bulma",
  storageBucket: "svelte-bulma.appspot.com",
  messagingSenderId: "511320383870",
  appId: "1:511320383870:web:a57a73f5342625ebe7532f",
  measurementId: "G-G0MD4X123G",
};

const app = initializeApp(firebase_config);
export const fbAuth = getAuth(app);

export default app;
