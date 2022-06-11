import "./Login.scoped.scss";
import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";

export default function Login() {
  let { logIn, user } = useFirebase();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("myriam@test.de");
  const [passWordInput, setPassWordInput] = useState("myriam");

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
    let fbCredentials = null;
    let fbUser = null;

    try {
      fbCredentials = await logIn(emailInput, passWordInput);
      fbUser = fbCredentials.user;
      user = fbUser;
      // navigate() im JSX - <Link /> im HTML
      navigate("/catalog");
    } catch (error) {
      setError(error.message);
    }
  }

  /* 
  function FnUserEmailInput(e) {
    // console.log(e.target.value);
    // setEmailInput: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setEmailInput(e.target.value);
  }

  function FnUserPassInput(e) {
    // console.log(e.target.value);
    // setPassWordInput: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setPassWordInput(e.target.value);
  }
*/

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
