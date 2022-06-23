import "./Cart.scss";
import CartList from "./CartList";
import CartBox from "./CartBox";
import CartEmpty from "./CartEmpty";

import { React, useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

import { connect } from "react-redux";
import axios from "axios";

function Cart({ token, userId }) {
  // const [modalVisible, setModalVisible] = useState(false);
  let [articles, setArticles] = useState([]);
  let [subtotal, setSubtotal] = useState(0);
  // let navigate = useNavigate();

  function getSubTotal(articles) {
    // Einzelpreise addieren, bevor ich ihre Summe zu subTotal addiere.
    let prices = articles.map((article) => article.price);
    let articleSum = prices.reduce((prev, next) => prev + next, 0);
    return Math.round((articleSum + Number.EPSILON) * 100) / 100;
  }

  function getSubUpdate(amount) {
    // Das Problem mit den Rundungsfehlern aufheben!
    // ist die keinsmoeglich Double groesser als 1, also 1.00000
    // in React hilft bei Endlosschleifen im Zusammenhang mit
    // State-Variablen eine anonyme Inline-Function, die den den neuen Wert
    // fuer die State-Variable zurückgibt.
    // problematisch:
    // setSubtotal(Math.round((subtotal + amount + Number.EPSILON) * 100) / 100);
    // besser:
    setSubtotal(
      () => Math.round((subtotal + amount + Number.EPSILON) * 100) / 100
    );
  }
  /*
  function executeHandler() {
    setModalVisible(true);
    console.log("Gekauft!");
  }
  */

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:4000/getArticlesFromMyCart?userId=" + userId)
        .then((res) => res.data)
        .then((data) => {
          setArticles(data.shCartItems);
          setSubtotal(getSubTotal(data.shCartItems));
        });
    }
  }, []);

  return (
    <>
      {articles && articles.length > 0 ? (
        <div className="card-box-container">
                                      {/* filter für removeArtikel vom Frontend */}
          <CartList removeitem={(id) => setArticles(articles.filter(item => item.id !== id))} theArticles={articles} getSubUpdate={getSubUpdate} />
          <CartBox theSubtotal={subtotal} />
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

// mapStateToProps ist eine function, mit der hole ich die variablen aus
// Redux-Store (userRed) und verbinde sie mit dem Veriable im aktuellen Component
// mapStateToProps is to point userName to the current Components props
const mapStateToProps = (state) => {
  return {
    token: state.userRed.token,
    userId: state.userRed.userId,
  };
};
// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
export default connect(mapStateToProps)(Cart);
