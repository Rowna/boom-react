import { React, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";

import {
  doc,
  getFirestore,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

export default function Modal() {
  const { db, user } = useFirebase;
  const [userFullName, setUserFullName] = useState("");

  if (user !== null) {
      
  }

  return <div>Modal</div>;
}
