import { createContext, useEffect, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { fbAuth } from "../server/firebase_config";
// import { getFirestore } from "firebase/firestore";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { act } from "react-dom/test-utils";

// So erzeugt man einen Context in einem React Component:
const FirebaseContext = createContext();

// So bindet man einen Context, der bereits erzeugt
// wurde, in ein Component ein:
export function FirebaseContextProvider({ children }) {
  // currentUser
  const [user, setUser] = useState("");
  const db = getFirestore();
  // firebaseApps previously initialized using initializeApp()
  // connectFirestoreEmulator(db, 'localhost', 8080);

  // function für Signup-Component
  function signUp(pEmail, pPassword) {
    return createUserWithEmailAndPassword(fbAuth, pEmail, pPassword);
  }

  // function für LogIn-Component
  function logIn(pEmail, pPassword) {
    return signInWithEmailAndPassword(fbAuth, pEmail, pPassword);
  }
  function logOut() {
    return signOut(fbAuth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      fbAuth,
      (currentUser) => {
        // act() informiert react-testing, dass eine state-variable rerendert wird.
        // act(() => {
        setUser(currentUser);
        // });
        return () => {
          unsubscribe();
        };
      },
      []
    );
  });

  return (
    <FirebaseContext.Provider value={{ db, logIn, logOut, signUp, user }}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Wenn man den Context erzeugt und eingebunden hat,
// muss man ihn nur noch in seiner Context-Famile abrufen
// und nutzen. Das folgende Beispiel zeigt, wie es geht:
export function useFirebase() {
  return useContext(FirebaseContext);
}
