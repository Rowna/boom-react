import "./Header.scss";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../Redux/actions/userActions";

function Header({ userName, logoutAction, token }) {
  let [logoutButton, setLogoutButton] = useState(false);
  // let [fullUserName, setfullUserName] = useState("");

  let navigate = useNavigate();

  function logoutHandler() {
    navigate("/");
    setLogoutButton(true);
    logoutAction();
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand navbar-container">
          <Link to="/">
            <p className="navbar-item logo">BOOM</p>
          </Link>
          {/* <!-- Mobile Version / If User nicht eingeloggt --> */}
          {token ? (
            <div className="navbar-item nav-itm">
              <div className="navbar-end">
                <Link to="/cart">
                  <p className="navbar-btn button is-white">Cart</p>
                </Link>
                <div className="select is-white">
                  <select className="sel">
                    <option>{userName}</option>
                    <option onClick={logoutHandler}>Logout</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <p
                href="/#"
                role="button"
                className="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </p>
            </Link>
          )}
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {token ? (
                  <div className="header-menu">
                    <Link to="/cart">
                      <div>
                        <p className="button is-white">Shopping Cart</p>
                      </div>
                    </Link>
                    <Link to="/bookmark">
                      <p className="imge">
                        <img src="/uploads/herz.png" alt="Fav" />
                      </p>
                    </Link>
                    <div className="select is-white">
                      <select className="sel">
                        <option>{userName}</option>
                        <option onClick={logoutHandler}>Logout</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/signup">
                      <p className="button sign-up is-primary">
                        <strong>Sign up</strong>
                      </p>
                    </Link>

                    <Link to="/login">
                      <p className="button login is-light">Log In</p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// mapStateToProps ist eine function, mit der hole ich die variablen aus
// Redux-Store (userRed) und verbinde sie mit dem Veriable im aktuellen Component
// mapStateToProps is to point userName to the current Components props
const mapStateToProps = (state) => {
  return {
    userName: state.userRed.userName,
    token: state.userRed.token,
  };
};
// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
export default connect(
  mapStateToProps,
  { logoutAction }
)(Header);
