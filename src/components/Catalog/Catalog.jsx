import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatalogItem from "./CatalogItem";
import axios from "axios";
import { connect } from "react-redux";

function Catalog({ userId, token }) {
  let [docs, setDocs] = useState([]);
  console.log(docs)
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
        //navigate("/catalog");
        setDocs(data.articles);
      })
      .catch((err) => {
        console.log("The Error is: " + err.response.data.message);
      }); 
    // Shopping-Cart-Icon auf Catalog updaten
    /* 
    if (token) {
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
          {docs.map((article, id) => (
            // article ist das aktuelle Element, das gebe ich an CatalogItem als prop weiter
            <CatalogItem
              userId={userId}
              key={id}
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
    token: state.userRed.token,
    userId: state.userRed.userId,
  };
};
// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
// The connect() function connects a React component to a Redux store
export default connect(mapStateToProps)(Catalog);
