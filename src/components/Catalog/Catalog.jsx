import { React, useEffect, useState, useRef } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import CatalogItem from "./CatalogItem";

import { useFirebase } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

export default function Catalog() {
  // db-getFirestore() aus Context-API importiert
  const { db, user } = useFirebase();

  let [docs, setDocs] = useState([]);
  const [userCart, setUserCart] = useState([]);

  const navigate = useNavigate();
  // Wegen Endlose schleife
  let elseCount = useRef(0);

  if (user !== null && user !== "") {
    console.log(`Habe die Email ${user.email}`);
  } else {
    console.log("Bin gerade nicht eingeloggt.");
  }

  // Gegen Endlose Schleife und weil setUserCart eine ASYNC ist, wird aufgeschoben
  useEffect(() => {
    if (user) {
      let userRef = doc(db, "users", user.uid);
      getDoc(userRef)
        .then((docsnapshot) => {
          // console.log(docsnapshot.data());
          // Update mit Inline-Funktion
          // verhindert Endlosschleife.
          setUserCart(() => [...docsnapshot.data().cart]);
        })
        .catch((error) => {
          console.log("So eine Scheisse! " + error.message);
        });
    }
  }, []);

  // Connector zur "articles"-Collecion erstellen mit Hilfe des firestore-connectors
  const fbArticles = collection(db, "articles");
  getDocs(fbArticles)
    .then((docsnapshot) => {
      let theArticles = [];
      docsnapshot.forEach((doc) => {
        // die Daten aud dem Firebase-"document" , die drin stehen.
        theArticles.push({ id: doc.id, ...doc.data() });
        // console.dir(doc.data())
      });
      if (elseCount.current === 0) {
        navigate("/catalog");
        elseCount.current++;
        setDocs(theArticles);
        // console.dir(theArticles)
      }
    })
    .catch((error) => console.error("The Error is: " + error.message));

  return (
    <>
      {user !== null ? (
        <div className="notification is-warning">
          <p>Bin eingeloggt als {user.email}</p>
        </div>
      ) : (
        <div className="notification is-danger">
          <p>Hat mit dem Einloggen nicht geklappt!</p>
        </div>
      )}

      <div className="catalog" data-v-catalog4312>
        <div className="catalog-title">
          <p>BOOM</p>
          <p className="subtitle is-7">Discover Kids Gallery with Pics</p>
        </div>

        <div className="catalog-container" data-v-catalog4312>
          {/*
          Listenschleife mit articles.map((article) => { ... } ) in React
          React benutzt Array.prototype.map, um in JSX eine Liste durchzugehen
          und jedes Element der alten Liste in ein neues JSX-Element zu verwandeln
          */}
          {docs.map((article) => (
            // article ist das aktuelle Element, das gebe ich an CatalogItem als prop weiter
            <CatalogItem
              article={article}
              userCart={userCart}
              key={article.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
