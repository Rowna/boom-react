import { React, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import "./Catalog.css";
import "./CatalogItem.scss";

import { useFirebase } from "../../context/FirebaseContext";

export default function CatalogItem(props) {
  const { db, user } = useFirebase();
  // In Svelte konnte man {interpolation} auch so schreiben:
  // "{interpolation}" -- in React geht das nicht, deshalb
  // brauchen wir hier eine Hilfsvariable.
  let imgURL = "images/" + props.article.img;

  let [modalVisible, setModalVisible] = useState(false);

  function addToCartHandler() {
    const userRef = doc(db, "users", user.uid);

    let cartItem = {
      id: props.article.id,
      title: props.article.title,
      desc: props.article.desc,
      price: props.article.price,
      img: props.article.img,
    };
  }

  function addToFavoritesHandler() {
    console.log("added to Favorites!");
    setModalVisible(true);
  }

  return (
    <>
      <div className="catalog-items card" data-v-cataIt4312>
        <div className="card-image" data-v-cataIt4312>
          <figure className="image" data-v-cataIt4312>
            {/* <a className="cartSingle" href="/singleView/{article.id}"> */}
            <Link to={"/singleview/" + props.article.id}>
              <p className="cartSingle">
                <img
                  className="cartSingle img"
                  src={imgURL}
                  alt="article"
                data-v-cataIt4312
              />
            </p>
            {/* <Link to="/SingleView"></Link> */}
          </figure>

          <footer className="card-footer" data-v-cataIt4312>
            {user !== null ? (
              <>
                <a
                  className="card-footer-item"
                  onClick={() => addToCartHandler()}
                  href="/"
                >
                  <img
                    className="cart-img"
                    src="images/shopping-cart.png"
                    alt="shopping-cart"
                  />
                </a>
                <a
                  className="card-footer-item"
                  onClick={addToFavoritesHandler}
                  href="/"
                >
                  <img
                    className=" fav-img"
                    // src="../public/images/herz-ohne"
                    src="images/herz-ohne.png"
                    alt="fav-img"
                  />
                </a>
              </>
            ) : (
              // {modalVisible : <Platzhalter /> : <></>}
              <div className="card-foot container">You should log in!</div>
            )}
          </footer>
        </div>
        <div className="card-content" >
          <div className="media-content" >
            <p className="title is-3 mc" >
              {props.article.title}
            </p>
          </div>
          <div>
            <p className="subtitle is-5 mc">{props.article.desc}</p>
          </div>
          <br />
          <div className="content" >
            <p className="subtitle is-5 cprice">
              Price: {props.article.price} €
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
