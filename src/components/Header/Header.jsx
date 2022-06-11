import React, { useEffect, useState } from "react";
import "./Header.scss";
import { useFirebase } from "../../context/FirebaseContext";
import { fbAuth } from "../../server/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

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
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand navbar-container">
          <Link to="/">
            <p className="navbar-item logo">BOOM</p>
          </Link>

          {/* <!-- Mobile Version / If User nicht eingeloggt --> */}
          {/* {!fbAuth.currentUser && !logoutButton ? ( */}
          {!fbAuth.currentUser && !logoutButton ? (
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
          ) : (
            <div className="navbar-item nav-itm">
              <div className="navbar-end">
                <Link to="/cart">
                  <p className="navbar-btn button is-white">Cart</p>
                </Link>
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
                {!fbAuth.currentUser && !logoutButton ? (
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
                ) : (
                  <div className="header-menu">
                    <Link to="/cart">
                      <div>
                        <p className="button is-white">Shopping Cart</p>
                      </div>
                    </Link>
                    <Link to="/bookmark">
                      <p className="imge">
                        <img src="../images/herz.png" alt="Fav" />
                      </p>
                    </Link>
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
