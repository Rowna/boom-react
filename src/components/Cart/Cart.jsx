import "./Cart.scss";
import CartList from "./CartList";
import CartBox from "./CartBox";
import CartEmpty from "./CartEmpty";

import { React, useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { getFirestore } from "firebase/firestore";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";

import { useFirebase } from "../../context/FirebaseContext";


export default function Cart() {
  let { db, user } = useFirebase();

  // const [modalVisible, setModalVisible] = useState(false);
  let [articles, setArticles] = useState([]);
  let [subtotal, setSubtotal] = useState(0);
  // let navigate = useNavigate();

  function getSubTotal(articles) {
    // Einzelpreise addieren, bevor ich ihre Summe zu subTotal addiere.
    // let initVal = 0;
    let prices = articles.map((article) => article.price);
    let articleSum = prices.reduce((prev, next) => prev + next, 0);
    return Math.round((articleSum + Number.EPSILON) * 100) / 100;
  }

  // Frage: wird useFirebase() VOR useEffect() ausgefuehrt oder erst NACH useEffect?
  // Wenn es nach useEffect() ausgefuehrt wird, ist user in useEffect() undefined!
  // let myUser = useRef(user);

  // Wichtig, um zu wissen ob der User null ist!
  if (user !== null && user !== "") {
    console.log(`Habe die Email ${user.email}`);
  } else {
    // elseCount.current++;
    console.log("Bin gerade nicht eingeloggt.");
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
    setSubtotal(() => Math.round((subtotal + amount + Number.EPSILON) * 100) / 100);
  }
/*
  // Die Cart leeren.
  function clearCartHandler() {
    console.log("FieldRemove()");
    let userDoc = doc(db, "users", user.uid);
    updateDoc(userDoc, {
      cart: deleteField(),
    });
  }
  
  function executeHandler() {
    setModalVisible(true);
    console.log("Gekauft!");
  }
  */

  /*
    // in React muss ich jedes Mal wenn es um
    // getDoc geht, oder was aus dem BE was geholt muss,
    // dann MUSS ich zuerst überprüfen, ob überhaupt
    // der aktuelle user im firebase angemeldet ist oder nicht.

    // Wenn ich getDoc() benutze, darf ich in .then() keine
    // status-Variabeln updaten. Sonst wird der Component neugerendert. 
    // getDoc() wird wieder aufgerufen setArticles() wird wieder 
    // aufgeführt usw. usw. usw. usw. usw. usw. ...
    
    // Um das Problem zu lösen, benutzt man useEffect() mit einer leeren dependencies-"[]", dann wird
    // es NUR ein einziges MAl ausgeführt, nämlich beim ersten Mounten des Components.
  */

  useEffect(() => {
    if (user) {
      let userDoc = doc(db, "users", user.uid);

      // getDoc ist eine ANDERE ASYNCHRONE AKTION!,
      // da sie aber unter z.80 steht, wird z.80 ins Wartezimmer gebeten.
      // userDoc ist also in genau diesem Moment 'undefined'.
      getDoc(userDoc)
        .then((docsnapshot) => {
          const shCartItems = docsnapshot.data().cart;

          // berechnet das aktuelle Sub-Total
          // if (cartItems && cartItems.length > 0) {
          // articlesExist.current = true;
          setArticles(shCartItems);
          setSubtotal(getSubTotal(shCartItems))
        })
        .catch((error) => console.error("The Error is: " + error.message));
      // } else {
      //   // navigate("/login");
    }
  }, [user]);

  return (
    <>
      {articles && articles.length > 0 ? (
        <div className="card-box-container">
          <CartList 
             theArticles={articles} 
             getSubUpdate={getSubUpdate}
            //  theSubtotal={subtotal}
          />
          <CartBox theSubtotal={subtotal} />
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}