import React from "react";
import "./Login.scoped.scss";
import { useState } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const fbAuth = getAuth();

export default function Login() {
  // Hier ist das <Script>-Teil in Svelte
  // let userInput = { emailInput: "", passWordInput: "" };
  const [emailInput, setEmailInput] = useState("");
  const [passWordInput, setPassWordInput] = useState("");

  let [fbUser, setFbUser] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(fbAuth, emailInput, passWordInput)
      .then((fbCredentials) => {
        setFbUser = fbCredentials.user;
      })
      .catch((err) => {
        console.log("Uh oh! Konnte nicht einloggen: " + err.message);
      });
    console.log("Logging in!");
  }

  function userEmailInput(e) {
    console.log(e.target.value);
    // setEmailInput: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setEmailInput(e.target.value);
  }

  function userPassInput(e) {
    console.log(e.target.value);
    // setPassWordInput: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setPassWordInput(e.target.value);
  }

  // Hier wird das Markup-Teil gerendert wie in Svelte
  return (
    <div className="base-container card" data-v-f4231f1d>
      <div className="form" data-v-f4231f1d>
        <h1 className="boom-title is-medium" data-v-f4231f1d>
          BOOM | Log In
        </h1>
        <div className="form-container" data-v-f4231f1d>
          <label htmlFor="email" data-v-f4231f1d>
            Your E-Mail
          </label>
          <input
            required
            type="email"
            className="input is-rounded"
            placeholder="Your E-Mail"
            value={emailInput}
            onChange={userEmailInput}
            // onChange={(e) => {setEmailInput(e.target.value)}}
            // bind:value={userInput.emailInput}
          />
          <label htmlFor="password" data-v-f4231f1d>
            Your Password
          </label>
          <input
            className="input is-rounded"
            type="password"
            placeholder="Your Password"
            value={passWordInput}
            onChange={userPassInput}

            // bind:value={userInput.passWordInput}
          />
          <a href="/" className="form-container__pass" data-v-f4231f1d>
            Password forgotten? Choose New!
          </a>
        </div>

        <button
          onClick={handleSubmit}
          className="button is-rounded is-primary btn"
          data-v-f4231f1d
        >
          Log In
        </button>
        <div className="para-contianer" data-v-f4231f1d>
          <p className="para-contianer__title" data-v-f4231f1d>
            Password forgotten?
          </p>
          <span>|</span>
          <a className="para-contianer__title2" href="/signup" data-v-f4231f1d>
            New Member?
          </a>
        </div>
      </div>
    </div>
  );
}