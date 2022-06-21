import CatalogItem from "./CatalogItem";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

function Catalog({ userId, isAuthenticated }) {
  let [docs, setDocs] = useState([]);
  const [userCart, setUserCart] = useState([]);

  const navigate = useNavigate();

  // Gegen Endlose Schleife und weil setUserCart eine ASYNC ist, wird aufgeschoben
  useEffect(() => {
    // get Articles aus dem Server
    axios
      // etwas aus dem Server auslesen/abfragen ".get()"
      .get("http://localhost:4000/getArticles")
      .then((res) => res.data)
      // die Daten aus dem Server holen
      .then((data) => {
        navigate("/catalog");
        setDocs(data.articles);
      })
      .catch((err) => {
        console.log("The Error is: " + err.response.data.message);
      });

    // Shopping-Cart-Icon auf Catalog updaten
    /* 
    if (isAuthenticated) {
      axios
        .get("http://localhost:4000/getArticlesFromMyCart?userId=" + userId)
        .then((res) => res.data)
        // die Daten aus dem Server holen
        .then((data) => {
          // console.log(data.shCartItems);
          setUserCart(data.shCartItems);
        })
        .catch((err) => {
          console.log("The Error is: " + err.response.data.message);
        });
    }
    */
  }, []);

  /*
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
  */

  return (
    <>
      <div className="catalog" data-v-catalog4312>
        <div className="catalog-title">
          <h2>BOOM</h2>
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
              userId={userId}
              key={article.id}
              article={article}
              userCart={userCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}
// mapStateToProps ist eine function, mit der hole ich die variablen aus
// Redux-Store (userRed) und verbinde sie mit dem Veriable im aktuellen Component
// mapStateToProps is to point userName to the current Components props
const mapStateToProps = (state) => {
  return {
    // für den Server.js ab zeile 78
    isAuthenticated: state.userRed.token,
    userId: state.userRed.userId,
  };
};
// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
export default connect(mapStateToProps)(Catalog);
