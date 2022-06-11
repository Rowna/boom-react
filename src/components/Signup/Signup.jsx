import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";
import { doc, setDoc } from "firebase/firestore";

import "./Signup.scss";

export default function Signup() {
  const navigate = useNavigate();
  let { signUp, user, db } = useFirebase();

  const [fullNameInput, setfullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passWordInput, setPassWordInput] = useState("");

  const [fullNameError, setfullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Error-Message in SignUp definieren.
  const [isValid, setIsValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");

  const fname = useRef();
  const email = useRef();
  const password = useRef();

  // function FnfullNameInput(pValue) {
  // console.log(e.target.value);
  // setEmailInput: ist ASYNCHRON, AUFGESCHOBEN!
  // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
  // deshalb steht es auch hier schon "ganz unten".
  //   setfullNameInput(pValue.target.value);
  // }

  // Name Validierung durch RegEx
  function nameValid(pFullname) {
    var nameRegEx = /[A-Za-zäüö\\s\\-]{3,}\s[A-Za-züöä\\-]{3,}/g;
    return nameRegEx.test(pFullname);
  }

  // function FnUserEmailInput(pValue) {
  // console.log(e.target.value);
  // setEmailInput: ist ASYNCHRON, AUFGESCHOBEN!
  // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
  // deshalb steht es auch hier schon "ganz unten".
  // setEmailInput(pValue.target.value);
  // }

  // Email Validierung durch RegEx
  function emailValid(pMail) {
    var mailRegEx = /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,}$/g;
    return mailRegEx.test(pMail);
  }

  // function FnUserPasswordInput(pValue) {
  // console.log(e.target.value);
  // setEmailInput: ist ASYNCHRON, AUFGESCHOBEN!
  // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
  // deshalb steht es auch hier schon "ganz unten".
  // setPassWordInput(pValue.target.value);
  // }

  // Password Validierung durch RegEx
  function passwordValid(pPassWord) {
    let isLongEnough = pPassWord.length >= 8;
    var passwordRegEx = /[A-Za-z-#\\?!=@$%^&\\*0-9]{8,}/g;
    return isLongEnough && passwordRegEx.test(pPassWord);
    // return isLongEnough;
  }

  // let nameIsValid = false;
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  function inputListener() {
    let fullnameEingabe = fname.current.value;
    let emailEingabe = email.current.value;
    let pwEingabe = password.current.value;

    if (!nameValid(fullNameInput)) {
      setfullNameError("Your full name please! Exp: Max Muster");
    } else {
      setNameIsValid(true);
      setfullNameError("");
    }
    if (!emailValid(emailInput)) {
      setEmailError("Your E-Mail! Exp: mu@m.de");
    } else {
      setEmailIsValid(true);
      setEmailError("");
    }

    if (!passwordValid(passWordInput)) {
      setPasswordError("A strong Password! Exp: Ma&123");
    } else {
      setPasswordIsValid(true);
      setPasswordError("");
    }

    if (nameIsValid && emailIsValid && passwordIsValid) {
      setIsValid(true);
    }
    setfullNameInput(fullnameEingabe);
    setEmailInput(emailEingabe);
    setPassWordInput(pwEingabe);
  }

  /* 
  function handelValidation(params) {
    console.log("handelValidation");

    // Validate Fullname
    if (!nameValid(fullNameInput)) {
    setfullNameError("Your full name please! Exp: Max Muster");
    } else {
    setNameIsValid(true);
    setfullNameError("");
    }

    // Validate Email
    if (!emailValid(emailInput)) {
      setEmailError("Your E-Mail! Exp: mu@m.de");
    } else {
      setEmailIsValid(true);
      setEmailError("");
    }

    // Validate Password
    if (!passwordValid(passWordInput)) {
      setPasswordError("A strong Password! Exp: Ma&123");
    } else {
      setPasswordIsValid(true);
      setPasswordError("");
    }

    if (nameIsValid && emailIsValid && passwordIsValid) {
      setIsValid(true);
    }
  }
*/

  async function submitHandler(event) {
    console.log("Signup Fn-Funktioinert!");
    event.preventDefault();
    setError("");
    let fbCredentials = null;

    try {
      // signUp gibt eine "Payload" zurück, die fange ich in fbCredentials auf.
      fbCredentials = await signUp(emailInput, passWordInput);
      // Update in FirebaseContext! => Update fuer alle "angeschlossenen" Components!
      // z.B. auch fuer Header und Catalog!
      user = fbCredentials.user;
      setDoc(doc(db, `/users/${user.uid}`, ""), {
        name: fullNameInput,
        cart: [],
      });
      // hier muss noch das Redirect zu /catalog-route
      // und nicht zu einem <Link> erfolgen. In react gibt es verschiedene
      // Möglichkeiten, ein Redirect vorzunehmen; Einzelheiten bei
      // https://www.robinwieruch.de/react-router-redirect/
      // ich verwende useNavigate() aus dem 'react-router-dom' paket
      navigate("/catalog");
    } catch (error) {
      setError(error.message);
    }
  }

  // Hier wird das Markup-Teil gerendert wie in Svelte
  return (
    <div className="signup-base-container" data-v-signup4312>
      <div onSubmit={submitHandler} className="form" data-v-signup4312>
        <h2 className="signup-boom-title is-medium">BOOM | Sign Up</h2>

        <div className="form-container" data-v-signup4312>
          <label htmlFor="name" data-v-signup4312>
            Full Name
          </label>
          <input
            required
            id="name"
            type="text"
            // onChange={FnfullNameInput}
            className="input is-rounded"
            placeholder="Your Full Name"
            ref={fname}
            onChange={inputListener}
            data-v-signup4312
          />
          <p className="error-message">{fullNameError}</p>

          <label htmlFor="email" data-v-signup4312>
            E-Mail
          </label>
          <input
            required
            id="email"
            ref={email}
            type="email"
            // onChange={FnUserEmailInput}
            className="input is-rounded"
            placeholder="Your E-Mail-Adress"
            onChange={inputListener}
            data-v-signup4312
          />
          <p className="error-message">{emailError}</p>

          <label htmlFor="password" data-v-signup4312>
            Password
          </label>
          <input
            required
            ref={password}
            id="password"
            type="password"
            // onChange={FnUserPasswordInput}
            className="input is-rounded"
            placeholder="A Strong Password"
            onChange={inputListener}
            data-v-signup4312
          />
          <p className="error-message">{passwordError}</p>
        </div>
      </div>
      <div className="su-btn-contianer">
        <button
          onClick={submitHandler}
          className="button is-rounded is-primary sign-up"
          data-v-signup4312
          disabled={!isValid}
        >
          Sign Up
        </button>
        {/* 

        {!isValid ? (
          <button
            // onClick={handelValidation}
            className="button is-rounded is-primary check"
            data-v-signup4312
          >
            Check Entries
          </button>
        ) : (
          <button
            onClick={submitHandler}
            className="button is-rounded is-primary sign-up"
            data-v-signup4312
          >
            Sign Up
          </button>
        )}
        */}
        <div className="para-contianer" data-v-signup4312>
          <Link to="/login">
            <p className="para__title" data-v-signup4312>
              Already have an Account?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
