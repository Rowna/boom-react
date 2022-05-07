import React from "react";
import "./Header.css";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

// const Header = (props) => {}
export default function Header() {
  const fbAuth = getAuth();
  //   let user = fbAuth.currentUser;

  // let logoutButton = false;
  let [logoutButton, setLogoutButton] = useState(false);
  let [fullUserName] = useState("");
  let [user, setUser] = useState("");

  const logoutHandler = () => {
    setLogoutButton = true;
    fbAuth
      // ist ASYNCHRON, d.h. die noetigen anpassungen im
      // .then vornehmen.
      .signOut()
      .then(() => {
        // location.reload();
        // window.location.href = window.location.href;
        setUser = fbAuth.currentUser;
        // console.log("Ausgeloggt!");
      })
      .catch((error) => "Konnte nicht ausloggen: " + error.message);
  };

  return (
    <>
      {/* <!-- svelte-ignore a11y-no-redundant-roles --> */}
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand navbar-container">
          <a className="navbar-item logo" href="/">
            BOOM
          </a>

          {/* <!-- Mobile Version / If User nicht eingeloggt --> */}
          {!fbAuth.currentUser && !logoutButton ? (
            <a
              href="/login"
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          ) : (
            <div className="navbar-item nav-itm">
              <div className="navbar-end">
                <a className="navbar-btn button is-white" href="/cart">
                  Cart
                </a>
                <div className="select is-white">
                  <select className="sel">
                    <option>{fullUserName}</option>
                    <option onClick={logoutHandler}>Logout</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* <!-- Desktop Version / If User nicht eingeloggt ist --> */}
                {/* {#if !fbAuth.currentUser && !logoutButton} */}
                {!fbAuth.currentUser && !logoutButton ? (
                  <>
                    <a
                      className="button singup is-primary"
                      href="/signup"
                    >
                      <strong>Sign up</strong>
                    </a>
                    <a href="/login" className="button login is-light">
                      Log In
                    </a>
                  </>
                ) : (
                  <div className="header-menu">
                    <div>
                      <a className="button is-white" href="/cart">
                        Shopping Cart
                      </a>
                    </div>
                    <a className="imge" href="/bookmark">
                      <img src="../images/herz.png" alt="Fav" />
                    </a>
                    <div className="select is-white">
                      <select className="sel">
                        <option>{fullUserName}</option>
                        <option onClick={logoutHandler}>Logout</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
