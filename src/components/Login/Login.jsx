import "./Login.scoped.scss";
import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { storeCurrentUserToReduxStoreToLogin } from "../../Redux/actions/userActions";

function Login({ storeCurrentUserToReduxStoreToLogin }) {
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("rowan@test.de");
  const [passWordInput, setPassWordInput] = useState("rowan12345");

  // Error-Message in SignUp definieren.
  const [error, setError] = useState("");

  const email = useRef();
  const password = useRef();

  function inputListener() {
    let emailEingabe = email.current.value;
    let pwEingabe = password.current.value;

    setEmailInput(emailEingabe);
    setPassWordInput(pwEingabe);
  }

  async function handleSubmit(event) {
    // console.log("Login ist erfolgreich! ");
    event.preventDefault();
    setError("");
    // das ist eine Request = Anfrgae/Abfrage an den Server.js
    // diese Request hat eine URI = "http://localhost:4000/user" und
    // einen Body nämlich {type, email und password}
    axios
      .post("http://localhost:4000/user", {
        type: "login",
        email: emailInput,
        password: passWordInput,
      })
      // then holt mir die data aus axios und dieser antwort "Payload" habe ich an das nächste then() weitergegeben
      // Der Server hat einen Response zurückgegeben nach findOne()
      .then((res) => res.data)
      .then((data) => {
        navigate("/catalog");
        console.log(data);
        storeCurrentUserToReduxStoreToLogin(data.user);
        // console.log(data.user);
      })
      .catch((error) => {
        // message vom Server, wenn die daten im Server nicht gefunden werden
        alert(error.response.data.message);
      });
  }

  // Hier wird das Markup-Teil gerendert wie in Svelte
  return (
    <div className="login-base-container card">
      <div className="form">
        <h1 className="login-boom-title is-medium">BOOM | Log In</h1>
        <div className="form-container">
          <label htmlFor="email" data-v-f4231f1d>
            Your E-Mail
          </label>
          <input
            required
            id="email"
            ref={email}
            type="email"
            className="input is-rounded"
            placeholder="Your E-Mail"
            value={emailInput}
            // onChange={FnUserEmailInput}
            onChange={inputListener}
          />
          <label htmlFor="password" data-v-f4231f1d>
            Your Password
          </label>
          <input
            id="password"
            ref={password}
            className="input is-rounded"
            type="password"
            placeholder="Your Password"
            value={passWordInput}
            // onChange={FnUserPassInput}
            onChange={inputListener}
          />
          <p className="form-container__pass" data-v-f4231f1d>
            Password forgotten? Choose New!
          </p>
        </div>

        <Link to="/catalog">
          <button
            onClick={handleSubmit}
            className="button is-rounded is-primary btn"
            data-v-f4231f1d
          >
            Log In
          </button>
        </Link>

        <div className="para-contianer" data-v-f4231f1d>
          <p className="para-contianer__title" data-v-f4231f1d>
            Password forgotten?
          </p>
          <span>|</span>
          <Link to="/signup">
            <p className="para-contianer__title2" data-v-f4231f1d>
              New Member?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
export default connect(
  null,
  { storeCurrentUserToReduxStoreToLogin }
)(Login);
