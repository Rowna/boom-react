import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.scss";
import "./CartBox.scss";

const CartBox = ({ theSubtotal, userId }) => {
  function clearCartHandler() {
    axios
      // delete "/cart" at userId "$"{userId}
      .delete(`http://localhost:4000/cart/${userId}`)
      .then((res) => res.data)
      .then((data) => {
        window.location.reload(true);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error:" + error.message);
      });
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
          <p className="card-footer-item title is-4">{theSubtotal} €</p>
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
        <div className="card-footer cb-estimate-total">
          <p className="card-footer-item title is-4 cb-total">
            Estimate Total:
          </p>
          <p className="card-footer-item title is-3">
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

        <Link to="/catalog">
          <button className="button cb-delete-btn" onClick={clearCartHandler}>
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

// mapStateToProps ist eine function, mit der hole ich die variablen aus
// Redux-Store (userRed) und verbinde sie mit dem Veriable im aktuellen Component
// mapStateToProps is to point userName to the current Components props
const mapStateToProps = (state) => {
  return {
    userName: state.userRed.userName,
    token: state.userRed.token,
    userId: state.userRed.userId,
  };
};
// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
export default connect(mapStateToProps)(CartBox);
