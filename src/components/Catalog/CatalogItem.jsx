import { React, useState } from "react";
import { Link } from "react-router-dom";

import "./Catalog.css";
import "./CatalogItem.scss";

import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

// كل شي متعلق بالبروبس لازم عرفه بالتيست
function CatalogItem(props) {
  let [modalVisible, setModalVisible] = useState(false);

  // In Svelte konnte man {interpolation} auch so schreiben:
  // "{interpolation}" -- in React geht das nicht, deshalb
  // brauche ich hier eine Hilfsvariable.
  let imgURL = "images/" + props.article.img;
  let singleViewURL = "/singleview/" + props.article._id;

  function isInCart() {
    for (let el of props.userCart) {
      if (el.id === props.article._id) return true;
    }
    return false;
  }

  // let cartImage = isInCart() ? "shopping-cart-filled" : "shopping-cart";
  // hier muss der Fehler behoben werden!

  let [cartImage, setCartImage] = useState(
    isInCart() ? "shopping-cart-filled.png" : "shopping-cart.png"
  );

  let cartImgURL = "images/" + cartImage;

  async function addToCartHandler() {
    let cartItem = {
      id: props.article._id,
      title: props.article.title,
      desc: props.article.desc,
      price: props.article.price,
      img: props.article.img,
    };
    // console.log(cartItem);

    if (cartImage.indexOf("filled") >= 0) {
      axios
        .get(
          // abfragen "removeFromCart" where cartId =
          "http://localhost:4000/removeFromCart?cartId=" +
            cartItem.id +
            "&userId=" +
            props.userId
        )
        .then((res) => res.data)
        .then((data) => {
          toast.success(data.message);
          setCartImage("shopping-cart.png");
        })
        .catch((error) => {
          toast.error("Error:" + error.message);
        });
    } else {
      axios
        .post("http://localhost:4000/addToCart", {
          // key: in body request zum server
          // value: catItem im Client Frontend
          cartItem: cartItem,
          userId: props.userId,
        })
        // wenn ich eine Payload vom Server zurück bekomme, geht es
        // hier weiter.
        .then((res) => res.data)
        .then((data) => {
          // Cart-Icon updaten
          setCartImage("shopping-cart-filled.png");
          toast.success(data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }

  // async function addToCartHandlerFB() {

  //   const userRef = doc(db, "users", user.uid);

  //   let cartItem = {
  //     id: props.article.id,
  //     title: props.article.title,
  //     desc: props.article.desc,
  //     price: props.article.price,
  //     img: props.article.img,
  //   };

  //   // Wenn dieser Artikel schon im Cart liegt ...
  //   if (cartImage.indexOf("filled") >= 0) {
  //     // eine article.id aus dem "cart"-Array entfernen
  //     // let articleRef = doc(db, "users", "cart");
  //     await updateDoc(userRef, {
  //       // cart: deleteField(),
  //       cart: arrayRemove(cartItem),
  //     });
  //     // Cart-Icon updaten
  //     setCartImage("shopping-cart.png");
  //     console.log("Removed from Shop!");
  //     // cart-image sieht "leer" aus
  //   } else {
  //     // Artikel liegt noch nicht im Cart
  //     await updateDoc(userRef, {
  //       cart: arrayUnion(cartItem),
  //     });

  //     // Cart-Icon updaten
  //     setCartImage("shopping-cart-filled.png");
  //     console.log("added to Shop!");
  //   }
  // }

  // Add to Favorite

  function addToFavoritesHandler() {
    console.log("added to Favorites!");
    setModalVisible(true);
  }

  return (
    <>
      <div className="catalog-items card" data-v-catait4312>
        <div className="card-image" data-v-catait4312>
          <figure className="image" data-v-catait4312>
            {/* <a className="cartSingle" href="/singleView/{article.id}"> */}
            <Link to={singleViewURL}>
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

          <footer className="card-footer ci-card-footer">
            {props.token ? (
              <>
                <div
                  className="card-footer-item ci-card-footer-item"
                  onClick={addToCartHandler}
                >
                  <img
                    className="cart-img"
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
              <Link to="/login" className="ci-login">
                <div className="card-foot container">You should log in!</div>
              </Link>
            )}
          </footer>
        </div>
        <div className="card-content ci-card-content">
          <div className="media-content ci-media-content">
            <p className="title is-3 mc">{props.article.title}</p>
          </div>
          <div>
            <p className="subtitle is-5 mc">{props.article.desc}</p>
          </div>

          <div className="content">
            <p className="subtitle is-5 cprice">
              Price:<strong>{props.article.price}</strong> €
            </p>
          </div>
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
    userId: state.userRed.userId,
    userName: state.userRed.userName,
    token: state.userRed.token,
  };
};
// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
export default connect(mapStateToProps)(CatalogItem);
