import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";
import { doc, updateDoc, deleteField, arrayUnion } from "firebase/firestore";
import "./Cart.scss";
import "./CartBox.scss";

const CartBox = ({ theSubtotal }) => {

  let { user, db } = useFirebase();
  let userRef = doc(db, "users", user.uid);



  function clearCartHandler() {
    console.log("FieldRemove()");
    // event.preventDefault();
    updateDoc(userRef, {
      cart: [],
    });

    // window.location.reload(true);
    // updateDoc(userRef, {
    //   cart: arrayUnion(),
    // });
  }

  function executeHandler() {
    // Modal aufrufen! Dort steht das Bestellformular
    console.log("Schicke die Bestellung ab!");
  }

  return (
    <>
      <div className="totals card">
        <div className="card-footer">
          <p className="card-footer-item title is-3 total">Subtotal:</p>
          <p className="card-footer-item title is-5">{theSubtotal} €</p>
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
          <p className="card-footer-item title is-4 total">Estimate Total:</p>
          <p className="card-footer-item title is-4">
            <code>{theSubtotal} €</code>
          </p>
        </div>
      </div>
      <div className="box btns-container">
        {/* Link setzen und executeHandler ist ein Modal beim Klicken */}

        <p>
          <button
            className="button is-primary cb-pay-btn"
            onClick={executeHandler}
          >
            Execute Order
          </button>
        </p>

        <Link to="/">
          <button
            className="button cb-delete-btn"
            onClick={clearCartHandler}
          >
            Remove all Articles
          </button>
        </Link>

        <Link to="/catalog">
          <button className="button is-primary cb-gallery-btn">
            Back to Gallery
          </button>
        </Link>
      </div>
    </>
  );
};

export default CartBox;
