import { React, useEffect, useState, useRef } from "react";
import "./Cart.scss";
import CartList from "./CartList";
import CartBox from "./CartBox";
import CartEmpty from "./CartEmpty";

// import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";

import { useFirebase } from "../../context/FirebaseContext";
import { Link } from "react-router-dom";

function Cart() {
  let { db, user } = useFirebase();
  let navigate = useNavigate();
  // Wegen Endlose schleife
  // let elseCount = useRef(0);

  const articlesExist = useRef(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  // const [subtotal, setSubtotal] = useState(0);

  // Wichtig, um zu wissen ob der User null ist!
  if (user !== null) {
    console.log(`Habe die Email ${user.email}`);
  } else {
    // elseCount.current++;
    console.log("Bin gerade nicht eingeloggt.");
  }

  function getSubTotal(articles) {
    // Einzelpreise addieren, bevor ich ihre Summe zu subTotal addiere.
    // let initVal = 0;
    let prices = articles.map((article) => article.price);
    let articleSum = prices.reduce((prev, next) => prev + next, 0);
    return Math.round((articleSum + Number.EPSILON) * 100) / 100;
  }

  // <CartBox subTotal={getSubTotal(articles)} />

  /*
  function getSubUpdate(amount) {
    // Das Problem mit den Rundungsfehlern aufheben!
    // ist die keinsmoeglich Double groesser als 1, also 1.00000
    setSubtotal(Math.round((subtotal + amount + Number.EPSILON) * 100) / 100);
  }

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

  useEffect(() => {
    // in React muss ich jedes Mal wenn es um
    // getDoc geht, oder was aus dem BE was geholt muss,
    // dann MUSS ich zuerst überprüfen, ob überhaupt
    // der aktuelle user im firebase angemeldet ist oder nicht.

    // Wenn ich getDoc() benutze, darf ich in .then() keine
    // status-Variabeln updaten. Sonst wir der Component neugerendert. getDoc() wird wieder aufgerufen
    // setArticles() wird wieder aufgeführt usw. usw. usw. usw. usw. usw. ...
    //
    // Um das Problem zu lösen, benutzt man useEffect() mit einer leeren dependencies-"[]", dann wird
    // es NUR ein einziges MAl ausgeführt, nämlich beim ersten Mounten des Components.
    if (user) {
      let userDoc = doc(db, "users", user.uid);
      // console.log("Cart userDoc is: " + userDoc);
      getDoc(userDoc)
        .then((docsnapshot) => {
          const cartItems = docsnapshot.data().cart;
          // console.log(docsnapshot.data().cart);
          // berechnet das aktuelle Sub-Total
          if (cartItems && cartItems.length > 0) {
            articlesExist.current = true;
            setArticles(cartItems);
          }
        })
        .catch((error) => console.error("The Error is: " + error.message));
    }
  }, []);

  return (
    <>
      {articlesExist.current ? (
        <>
          <CartList />
          {/* <CartBox subtotal={getSubTotal(articles)} /> */}
        </>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

export default Cart;
