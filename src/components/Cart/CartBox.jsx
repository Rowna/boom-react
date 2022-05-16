import React from "react";
import { Link } from "react-router-dom";
import "./Cart.scss";
import "./CartItem.scss";

const CartBox = (props) => {
  function clearCartHandler() {
    console.log("Cart soll geleert werden");
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
          <p className="card-footer-item title is-5">{props.subtotal} €</p>
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
            <code>{props.subtotal} €</code>
          </p>
        </div>
      </div>
      <div className="box btns-container">
        <div className="btns">
          {/* Link setzen und executeHandler ist ein Modal beim Klicken */}
          <button
            className="button is-primary pay-btn"
            onClick={executeHandler}
          >
            Execute Order
          </button>
        </div>
      </div>
      <div className="box btns-container">
        <div className="btns">
          <Link to="/catalog">
            <button
              className="button is-danger is-light delete-btn"
              onClick={clearCartHandler}
            >
              Delelte all Articles
            </button>
          </Link>

          <Link to="/catalog">
            <button className="button gallery-btn is-primary">
              Back to Gallery
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartBox;
