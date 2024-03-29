import { React, useState } from "react";
import { Link } from "react-router-dom";

import "./Catalog.css";
import "./CatalogItem.scss";
import Stars from "../../containers/Stars/Stars";

import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

// كل شي متعلق بالبروبس لازم عرفه بالتيست
function CatalogItem(props) {
  let [modalVisible, setModalVisible] = useState(false);
  // console.count("Component rendered! ")
  // In Svelte konnte man {interpolation} auch so schreiben:
  // "{interpolation}" -- in React geht das nicht, deshalb
  // brauche ich hier eine Hilfsvariable.
  // let imgURL = "/uploads/" + props.article.img;
  // console.log(singleViewURL)
  // let singleItemURL = "/ItemsView/" + props.article._id;

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

  let cartImgURL = "/uploads/" + cartImage;

  async function addToCartHandler() {
    let cartItem = {
      id: props.article._id,
      title: props.article.title,
      desc: props.article.desc,
      price: props.article.price,
      img: props.article.images[0],
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

  function addToFavoritesHandler() {
    console.log("added to Favorites!");
    setModalVisible(true);
  }

  return (
    <>
      <div className="catalog-items card">
        <div className="card-image">
          <Link className="fav-icon_container" to="/bookmark">
            <p className="fav-icon">
              <img src="/uploads/herz-ohne.png" alt="Fav" />
            </p>
          </Link>

          <figure className="image">
            <Link to={"/singleview/" + props.article._id}>
              <p className="cartSingle">
                <img
                  className="cartSingle img"
                  src={props.article.images[0]}
                  alt="article"
                />
              </p>
            </Link>
          </figure>
        </div>

        <div className="card-content ci-card-content">
          <div className="price-cart_container">
            <p className="subtitle is-6 cprice">
              <strong>€ {props.article.price}</strong>
            </p>

            {/* <p className="card-footer ci-card-footer"> */}
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

                {/*
                <div
                  className="card-footer-item ci-card-footer-item"
                  onClick={addToFavoritesHandler}
                >
                  <img
                    className="fav-img"
                    src="/uploads/herz-ohne.png"
                    alt="fav-img"
                  />
                </div>
                */}
              </>
            ) : (
              <Link to="/login" className="ci-login">
                <div className="card-foot container">You should log in!</div>
              </Link>
            )}
            {/* </p> */}
          </div>

          <div className="sterne-container">
            <Stars stars={4} />
          </div>

          <div className="ci-media-content">
            <p className="subtitle  mc">{props.article.title}</p>
          </div>

          {/* <div>
            <p className="subtitle is-5 mc">{props.article.desc}</p>
          </div> */}
          {/*   */}
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
