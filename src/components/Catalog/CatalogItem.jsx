import { React, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

import "./Catalog.css";
import "./CatalogItem.scss";

import { useFirebase } from "../../context/FirebaseContext";

export default function CatalogItem(props) {
  let { db, user } = useFirebase();
  let [modalVisible, setModalVisible] = useState(false);

  // In Svelte konnte man {interpolation} auch so schreiben:
  // "{interpolation}" -- in React geht das nicht, deshalb
  // brauchen wir hier eine Hilfsvariable.
  let imgURL = "images/" + props.article.img;

  function isInCart() {
    for (let el of props.userCart) {
      if (el.id === props.article.id) return true;
    }
    return false;
  }

  // let cartImage = isInCart() ? "shopping-cart-filled" : "shopping-cart";
  // hier muss der Fehler behoben werden!
  let [cartImage, setCartImage] = useState("shopping-cart.png");
  let cartImgURL = "images/" + cartImage;

  if (isInCart()) {
    setCartImage("shopping-cart-filled.png");
  }

  // Add to Favorite
  function addToFavoritesHandler() {
    console.log("added to Favorites!");
    setModalVisible(true);
  }

  async function addToCartHandler() {
    const userRef = doc(db, "users", user.uid);

    let cartItem = {
      id: props.article.id,
      title: props.article.title,
      desc: props.article.desc,
      price: props.article.price,
      img: props.article.img,
    };

    // Wenn dieser Artikel schon im Cart liegt ...
    if (cartImage.indexOf("filled") >= 0) {
      // eine article.id aus dem "cart"-Array entfernen
      // let articleRef = doc(db, "users", "cart");
      // arrayRemove((articleRef), where(article.id, "=", ""))
      await updateDoc(userRef, {
        // cart: deleteField(),
        cart: arrayRemove(cartItem),
      });
      // Cart-Icon updaten
      setCartImage("shopping-cart.png");
      console.log("Removed from Shop!");
      // cart-image sieht "leer" aus
    } else {
      // Artikel liegt noch nicht im Cart
      await updateDoc(userRef, {
        cart: arrayUnion(cartItem),
      });

      // Cart-Icon updaten
      setCartImage("shopping-cart-filled.png");
      console.log("added to Shop!");
    }
  }

  return (
    <>
      <div className="catalog-items card" data-v-catait4312>
        <div className="card-image" data-v-catait4312>
          <figure className="image" data-v-catait4312>
            {/* <a className="cartSingle" href="/singleView/{article.id}"> */}
            <Link to={"/singleview/" + props.article.id}>
              <p className="cartSingle">
                <img
                  className="cartSingle img"
                  src={imgURL}
                  alt="article"
                  data-v-catait4312
                />
              </p>
            </Link>
          </figure>

          <footer className="card-footer ci-card-footer" data-v-catait4312>
            {user !== null ? (
              <>
                <div
                  className="card-footer-item ci-card-footer-item"
                  onClick={addToCartHandler}
                >
                  <img
                    className="cart-img"
                    // src="images/shopping-cart.png"
                    src={cartImgURL}
                    alt="shopping-cart"
                  />
                </div>
                <div
                  className="card-footer-item ci-card-footer-item"
                  onClick={addToFavoritesHandler}
                >
                  <img
                    className="fav-img"
                    src="images/herz-ohne.png"
                    alt="fav-img"
                  />
                </div>
              </>
            ) : (
              // {modalVisible : <Platzhalter /> : <></>}
              <div className="card-foot container">You should log in!</div>
            )}
          </footer>
        </div>
        <div className="card-content ci-card-content">
          <div className="media-content">
            <p className="title is-3 mc">{props.article.title}</p>
          </div>
          <div>
            <p className="subtitle is-5 mc">{props.article.desc}</p>
          </div>

          <div className="content">
            <p className="subtitle is-5 cprice">
              Price: <strong>{props.article.price}</strong> €
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
