import CatalogItem from "./CatalogItem";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

function Catalog({ userId }) {
  let [docs, setDocs] = useState([]);
  const [userCart, setUserCart] = useState([]);

  const navigate = useNavigate();
  // Wegen Endlose schleife

  // Gegen Endlose Schleife und weil setUserCart eine ASYNC ist, wird aufgeschoben
  useEffect(() => {
    // get Articles aus dem Server, dafür muss der Server angeschaltet werden
    axios
      .get("http://localhost:4000/getArticles")
      .then((res) => res.data)
      // die Daten aus dem Server holen
      .then((data) => {
        navigate("/catalog");
        setDocs(data.articles);
      })
      .catch((err) => {
        console.error("The Error is: " + err.response.data.message);
      });
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
    userId: state.userRed.userId,
  };
};
// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
export default connect(mapStateToProps)(Catalog);
