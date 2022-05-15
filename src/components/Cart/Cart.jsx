import { React, useEffect } from "react";
import "./Cart.scss";
// import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";
import { Link } from "react-router-dom";

function Cart() {
  let { db, user } = useFirebase();
  let navigate = useNavigate();

  // Wichtig, um zu wissen ob der User null ist!
  if (user !== null) {
    console.log(`Habe die Email ${user.email}`);
  } else {
    console.log("Bin gerade nicht eingeloggt.");
  }

  /* 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user, (currentUser) => {
      if (!currentUser) {
        navigate("/catalog");
      }
    });
  }, []);
*/
  return (
    <>
      <div className="cart" data-v-cart-f421>
        <div className="cart-title">
          <p>BOOM</p>
          <p className="subtitle cart-title__sub is-7">Pay with different methods</p>
        </div>

        <div className="cart-container">
          {/* <!-- 'promise' ist hier das letzte Promise --> */}
          {/* {#await promise} */}

          {/* {:then articles} */}
          <div className="articles-container">
            {/* {#if articles && articles.length > 0} */}

            {/* {#each articles as article (article.id)} */}
            {/* <CartItem {article} {getSubUpdate} /> */}
            {/* {/each} */}

            {/* <!-- Total Preis --> */}
            <div className="totals card">
              <div className="card-footer">
                <p className="card-footer-item title is-3 total">Subtotal:</p>
                {/* <p className="card-footer-item title is-5">{subtotal} €</p> */}
              </div>

              <div className="card-footer">
                <p className="card-footer-item title is-4 is-small total">
                  Shipping Costs:
                </p>
                <p className="card-footer-item title is-6">0.00 €</p>
              </div>
            </div>

            <div className="card">
              <br />
              <div className="card-footer">
                <p className="card-footer-item title is-4 total">
                  Estimate Total:
                </p>
                <p className="card-footer-item title is-4">
                  {/* <code>{subtotal} €</code> */}
                </p>
              </div>
            </div>

            <div className="box btns-container">
              <div className="btns">
                {/* <a className="button is-primary pay-btn" onClick={executeHandler} */}
                {/* >Execute Order</a */}
                {/* > */}
              </div>
            </div>
            <div className="box btns-container">
              <div className="btns">
                <a
                  className="button is-danger is-light delete-btn"
                  // onClick={clearCartHandler}
                  href="/catalog"
                >
                  Delelte all Articles
                </a>
                <a className="button gallery-btn is-primary" href="/catalog">
                  Back to Gallery
                </a>
              </div>

              {/* <!-- Hier kommt das Modal --> */}
              {/* {#if modalVisible} */}
              {/* <ModalBuy /> */}
              {/* {/if} */}
            </div>

            {/* {:else} */}
            <div className="box">
              <div>
                <p className="title is-4">
                  ... The Cart is waiting for your Articles!
                </p>
              </div>
              <div className="gallery-btn btns">
                <a className="button is-primary" href="/catalog">
                  Back to Gallery
                  <Link to="/cart" />
                </a>
              </div>
            </div>
            {/* {/if} */}
          </div>
          {/* {:catch error} */}
          {/* <p style="color: red">{error.message}</p> */}
          {/* {/await} */}
        </div>
      </div>
    </>
  );
}

export default Cart;
