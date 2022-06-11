import { React, useState, useEffect } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { useParams, Link } from "react-router-dom";
import Stars from "./Stars/Stars";
import "./Modal.scss";

import {
  doc,
  collection,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

export default function Modal({ isVisible }) {
  let { db, user } = useFirebase();
  let [userFullName, setUserFullName] = useState("");
  // vgl. die Erklaerungen in App.jsx zu 'singleview/:artID'
  let artID = useParams().artID;
  let [myRating, setMyRating] = useState(0);
  let [recension, setRecension] = useState("");
  let [myRecommendation, setMyRecommendation] = useState(null);
  const [modalCSS, setModalCSS] = useState("modal is-active is-clipped");

  function getRating(rating) {
    setMyRating(rating);
    console.log("Aktuelles Rating: " + rating);
  }

  // let modalCSS = isVisible ? "modal is-active is-clipped" : "modal";

  let recomRef = doc(db, `users/${user.uid}`);

  // useEffect(() => {
    if (user !== null) {
      getDoc(recomRef)
        .then((docsnapshot) => {
          setUserFullName(docsnapshot.data().name);
          // console.log("FullUsername " + userFullName)
        })
        .catch((error) => "Konnte den Username nicht laden:" + error.message);
    } else {
      user = null;
      console.log("User is signed out! ");
    }
  // }, []);

  function closeModal() {
    setModalCSS("modal");
    window.location.reload(true);
  }

  let articleRef = doc(db, "articles", artID);

  async function sendRecommendationHandler() {
    let recommendation = {
      rating: myRating, // int:5 (Sterne 5)
      text: recension,
      userId: user.uid,
      createdAt: Date.now(), // :BigInt: Millisekunden seit 1.1.1970 00:00 Uhr GMT
      username: userFullName, // userFullName muss noch aus FS geholt werden dazu ab zeile: 41
    };

    try {
      let _ = await updateDoc(articleRef, {
        // wenn der reco-Objekt im FS leer ist, dann füge das recommendation-objekt hinzu.
        // ABER: wenn der user eine reco geschrieben hat, DARF er NICHT
        // nochmal eine recension schreiben.
        recommendations: arrayUnion(recommendation),
      });
    } catch (error) {
      console.error("Ging daneben! " + error.message);
    }
    closeModal();
    window.location.reload(true);
  }
  function getRecensionValue(e) {
    // console.log(e.target.value);
    // getRecensionValue: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setRecension(e.target.value);
  }

  return (
    <>
      <div className={modalCSS}>
        <div className="modal-background modal-position" onClick={closeModal} />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Article Rating</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            />
          </header>
          <section className="modal-card-body">
            <p className="subtitle is-5">
              You can write here your recension about this article:
            </p>
            <div>
              <input
                value={recension}
                onChange={getRecensionValue}
                className="modal-input input is-primary"
                placeholder="Your Recension"
                required
                type="text"
              />
            </div>
            <Stars getRating={getRating} />
          </section>
          <footer className="modal-card-foot">
            <div
              className="modal-send-btn button is-success"
              onClick={sendRecommendationHandler}
            >
              Send it
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
