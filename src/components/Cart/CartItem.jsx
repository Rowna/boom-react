import axios from "axios";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./CartItem.scss";

function CartItem({ article, getSubUpdate, userId, removeitem }) {
  // let { db, user } = useFirebase();
  let svArticle = "/singleview/" + article.id;

  let cartImgURL = "images/" + article.img;

  let cartItem = {
    _id: article.id,
    title: article.title,
    desc: article.desc,
    price: article.price,
    img: article.img,
  };

  let [qty, setQty] = useState(1);

  function decreaseHandler() {
    if (qty > 1) {
      // elseCount.current++;
      setQty(qty - 1);
      // console.log("Qty is " + qty)
      getSubUpdate(-article.price);
    }
  }

  function increaseHandler() {
    setQty(qty + 1);
    console.log("Qty is " + qty);
    // if (elseCount.current === 0) {
    // elseCount.current++;
    getSubUpdate(article.price);
    // }
  }
  // hier soll ich beim Server cartItem._id überprüfen, 
  // weil der Artikel wird im Mongo nicht gelöscht
  
  function removeArticleHandler() {
    console.log("Article Removed!");
    axios
      .get(
        // abfragen "removeFromCart" where cartId =
        // zwei Requests/Abfragen zum Server 
        "http://localhost:4000/removeFromCart?cartId=" + cartItem._id +
          "&userId=" + userId
      )
      .then((res) => res.data)
      .then((data) => {
        toast.success(data.message)
       removeitem(cartItem._id)
      })
      .catch((error) => {
        console.log("Error:" + error.message);
      });
  }

  return (
    <>
      <div className="box card">
        <div className="card-footer ct-card-items">
          <div className="card-footer-item article-img">
            <Link to={svArticle}>
              {/* cartItem-imge´wegen Globale-Variablen siehe Svelte Zeile 73 */}
              <img className="cartItem-imge" src={cartImgURL} alt="article" />
            </Link>
          </div>

          <div className="card-footer-item article-info">
            <h2 className="article-title title is-4">{article.title}</h2>
            <div>
              <p className="article-desc subtitle is-6">{article.desc}</p>
            </div>
          </div>

          <div className="card-footer-item article-amount">
            <div className="card-header-title title is-4 amount card-header">
              Preis:
              <p className="subtitle card-header-title is-5 price-a">
                {article.price} €
              </p>
            </div>

            <div className="card-header article-qty-container">
              <p className="article-qty card-header-title subtitle is-5 ci-article-qty">
                Qty:
              </p>

              <div className="amount-cont">
                {/* Decrease Quantity */}
                <div
                  className="article-qty-minus card-header-title subtitle is-5 ci-article-qty"
                  onClick={decreaseHandler}
                >
                  <img
                    className="subtitle is-2 is-success is-outlined is-small minus-btn"
                    src="/images/minus.png"
                    alt="pic"
                  />
                </div>

                {/* Quantity ab 1 */}
                <div className="card-header-title">
                  <p className="article-qty subtitle is-5 qty-a">{qty}</p>
                </div>

                {/* Increase Quantity */}
                <div
                  className="article-qty-plus card-header-title subtitle is-5"
                  onClick={increaseHandler}
                >
                  <img
                    className="subtitle is-2 is-success is-outlined is-small plus-btn"
                    src="/images/plus.png"
                    alt="pic"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <Link
            to="/catalog"
            className="button card-footer-item ci-gallery-btn is-primary"
          >
            To Gallery
          </Link>
          <p
            // to="/catalog"
            className="button card-footer-item delete-btn"
            onClick={removeArticleHandler}
          >
            Remove this Article
          </p>
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
export default connect(mapStateToProps)(CartItem);
