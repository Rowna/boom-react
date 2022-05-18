import { React, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./CartItem.scss";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";

export default function CartItem(props) {
  const { db, user } = useFirebase();
  let elseCount = useRef(0);

  // Wichtig, um zu wissen ob der User null ist!
  // if (user !== null && elseCount.current === 0) {
  //   console.log(`Habe die Email ${user.email}`);
  //   elseCount.current++;
  // } else {
  //   console.log("Bin gerade nicht eingeloggt.");
  //   elseCount.current++;
  // }

  let cartImgURL = "images/" + props.article.img;

  const [qty, setQty] = useState(1);

  const userRef = doc(db, "users", user.uid);
  let cartItem = {
    id: props.article.id,
    title: props.article.title,
    desc: props.article.desc,
    price: props.article.price,
    img: props.article.img,
  };

  function increaseHandler() {
    if (elseCount.current === 0) {
      elseCount.current++;
      setQty(+1);
    }
    props.getSubUpdate(props.article.price);
  }

  function decreaseHandler() {
    if (qty > 1) {
      setQty(+1);
      props.getSubUpdate(-props.article.price);
    }
  }

  function removeArtikelHandler() {
    console.log("Article Removed!");
    updateDoc(userRef, {
      cart: arrayRemove(cartItem),
    });
  }

  return (
    <>
      <div className="box card">
        <div className="card-footer ct-card-items">
          {/* <!-- <h2>Art-Nr: {article.id}</h2> --> */}
          <div className="card-footer-item article-img">

            {/* <p href="/singleView/{props.article.id}"> */}
            <p>
              <img className="cartItem-imge" src={cartImgURL} alt="article" />
            </p>
          </div>

          <div className="card-footer-item article-info">
            <div>
              <h2 className="article-title title is-4">
                {props.article.title}
              </h2>
            </div>
            <div>
              <p className="article-desc subtitle is-6">{props.article.desc}</p>
            </div>
          </div>

          <div className="card-footer-item article-amount">
            <div className="card-header price-container">
              <p className="card-header-title title is-4 amount">
                Preis:
                <p className="subtitle card-header-title is-5 price-a">
                  {props.article.price} €
                </p>
              </p>
            </div>

            <div className="card-header article-qty-container">
              <p className="article-qty card-header-title subtitle is-5">
                Qty:
              </p>

              <div className="amount-cont">
                <p
                  className="article-qty card-header-title subtitle is-5"
                  onClick={decreaseHandler}
                >
                  <p
                    
                    className="subtitle is-2 is-success is-outlined is-small minus-btn"
                  >
                    -
                  </p>
                </p>
                <div className="card-header-title">
                  <p className="article-qty subtitle is-5 qty-a">
                    {qty}
                  </p>
                </div>

                <p
                  className="article-qty card-header-title subtitle is-5"
                  onClick={increaseHandler}
                >
                  <p
                    className="subtitle is-2 is-success is-outlined is-small plus-btn"
                  >
                    +
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Link to="/catalog">
            <p
              onClick={removeArtikelHandler}
              className="button card-footer-item article-delete is-dark"
            >
              Remove this Article
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
