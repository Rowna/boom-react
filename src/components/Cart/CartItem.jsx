import { React, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CartItem.scss";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";

export default function CartItem({article, getSubUpdate}) {
  const { db, user } = useFirebase();
  let svArticle = "/singleview/" + article.id;
  let elseCount = useRef(0);
  const qtyRef = useRef();

  // Wichtig, um zu wissen ob der User null ist!
  // if (user !== null && elseCount.current === 0) {
  //   console.log(`Habe die Email ${user.email}`);
  //   elseCount.current++;
  // } else {
  //   console.log("Bin gerade nicht eingeloggt.");
  //   elseCount.current++;
  // }

  let cartImgURL = "images/" + article.img;
  // let cartImgURL = "images/" + articles.img;

  const userRef = doc(db, "users", user.uid);

  let cartItem = {
    id: article.id,
    title: article.title,
    desc: article.desc,
    price: article.price,
    img: article.img,
  };

  let [qty, setQty] = useState(1);

  function decreaseHandler() {
    console.log("Decrease");
    if (qty > 1) {
      // elseCount.current++;
      setQty(qty - 1);
      // console.log("Qty is " + qty)
      getSubUpdate(-article.price);
    }
  }

  function increaseHandler() {
    console.log("Increase");
    setQty(qty + 1);
    console.log("Qty is " + qty)
    // if (elseCount.current === 0) {
      // elseCount.current++;
      getSubUpdate(article.price);
    // }
  }

  function removeArtikelHandler() {
    console.log("Article Removed!");
    updateDoc(userRef, {
      cart: arrayRemove(cartItem),
    });
  }

  return (
    <>
      <div className="box card ci-card">
        <div className="card-footer ct-card-items">
          {/* <!-- <h2>Art-Nr: {article.id}</h2> --> */}
          <div className="card-footer-item article-img">
            {/* <p href="/singleView/{props.article.id}"> */}
            <Link to={svArticle}>
              <img className="cartItem-imge" src={cartImgURL} alt="article" />
            </Link>
          </div>

          <div className="card-footer-item article-info">
            <div>
              <h2 className="article-title title is-4">
                {article.title}
              </h2>
            </div>
            <div>
              <p className="article-desc subtitle is-6">{article.desc}</p>
            </div>
          </div>

          <div className="card-footer-item article-amount">
            <div className="card-header price-container">
              <p className="card-header-title title is-4 amount">
                Preis:
                <p className="subtitle card-header-title is-5 price-a">
                  {article.price} €
                </p>
              </p>
            </div>

            <div className="card-header article-qty-container">
              <p className="article-qty card-header-title subtitle is-5 ci-article-qty">
                Qty:
              </p>

              <div className="amount-cont">
                {/* Decrease Quantity */}
                <div
                  className="article-qty card-header-title subtitle is-5 ci-article-qty"
                  onClick={decreaseHandler}
                >
                  <p className="subtitle is-2 is-success is-outlined is-small minus-btn">
                    -
                  </p>
                </div>

                {/* Quantity ab 1 */}
                <div className="card-header-title">
                  <p className="article-qty subtitle is-5 qty-a">{qty}</p>
                </div>

                {/* Increase Quantity */}
                <div
                  className="article-qty card-header-title subtitle is-5"
                  onClick={increaseHandler}
                >
                  <p className="subtitle is-2 is-success is-outlined is-small plus-btn">
                    +
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/catalog" className="card-footer-item ci-link-article-delete">
          <p
            onClick={removeArtikelHandler}
            className="button article-delete is-dark"
          >
            Remove this Article
          </p>
        </Link>
      </div>
    </>
  );
}
