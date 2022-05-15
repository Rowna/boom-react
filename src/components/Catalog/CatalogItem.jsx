import React from "react";
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

  // let [modalVisible, setModalVisible] = useState(false);

  function addToCartHandler() {}

  function addToFavoritesHandler() {
    // const userRef = doc(db, "users", );

  }

  return (
    <>
      <div className="catalog-items card" data-v-cataIt4312>
        <div className="card-image" data-v-cataIt4312>
          <figure className="image" data-v-cataIt4312>
            {/* <a className="cartSingle" href="/singleView/{article.id}"> */}
            {/* <Link to={() => "/singleView/" + props.article.id }> */}
            <p className="cartSingle">
              <img
                className="cartSingle img"
                src={imgURL}
                alt="article"
                data-v-cataIt4312
              />
            </p>
            {/* </Link> */}
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
        <div className="card-content" data-v-cataIt4312>
          <div className="media-content" data-v-cataIt4312>
            <p className="title is-3 mc" data-v-cataIt4312>
              {props.article.title}
            </p>
          </div>
          <br />
          <div className="content" data-v-cataIt4312>
            <p className="subtitle is-5 cprice">
              Price: {props.article.price} €
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
