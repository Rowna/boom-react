import React, { useEffect, useState } from "react";
import "./Header.css";
import { useFirebase } from "../../context/FirebaseContext";
import { fbAuth } from "../../server/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let { user, db } = useFirebase();

  let [logoutButton, setLogoutButton] = useState(false);
  let [fullUserName, setfullUserName] = useState("");

  let navigate = useNavigate();

  // Falls der user neu eingeloggt ist ...
  if (user !== null) {
    // wahren Benutzernamen aus '/firestore/users/$app.user.id' holen
    getDoc(doc(db, `users/${user.uid}`))
      .then((docsnapshot) => {
        // setfullUserName = funktioinert nicht, weil setfullUserName eine
        // function ist, die von useState() zurück gegeben wurde. (Z.11)
        setfullUserName(docsnapshot.data().name);
      })
      .catch((error) => "Konnte den Username nicht laden:" + error.message);
  } else {
    user = null; // wird schon in Z.30 geklaert.
    console.log("User is signed out! ");
  }

  const logoutHandler = () => {
    /* 
      Es muss diese Zeilen in dieser Reihenfolge ausgeführt werden:
      Weil: Wenn der User sich aussloggt, muss zurück geschehen, dass
      der Route zum /hero/ geführt werden, und DANN die seite neue 
      aufgeladen werden.
    */
    navigate("/");
    setLogoutButton(true);
    fbAuth
      // ist ASYNCHRON, d.h. die noetigen anpassungen im
      // .then vornehmen.
      .signOut()
      .then(() => {
        // beim signout wird die Seite neugeladet
        window.location.reload(true);
        user = fbAuth.currentUser;
        // user = null;
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
          {/* {!fbAuth.currentUser && !logoutButton ? ( */}
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
              <div className="buttons" data-v-header-f421>
                {/* <!-- Desktop Version / If User nicht eingeloggt ist --> */}
                {/* {#if !fbAuth.currentUser && !logoutButton} */}
                {/* {!fbAuth.currentUser && !logoutButton ? ( */}
                {!fbAuth.currentUser && !logoutButton ? (
                  <>
                    <a className="button sign-up is-primary" href="/signup">
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
