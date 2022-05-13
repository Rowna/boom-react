import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";
import { doc, setDoc } from "firebase/firestore";

import "./Signup.scss";

export default function Signup() {
  // Hier ist das <Script>-Teil in Svelte
  // const signupInitState = {
  //   // die einzelnen Attribute (Properties)
  // }
  // [signupState, dispatch] = useReducer(signupReducer, signupInitState)

  const [fullNameInput, setfullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passWordInput, setPassWordInput] = useState("");


  // signUp aus useContext
  let { signUp, user, db } = useFirebase();

  // Error-Message in SignUp definieren.
  const [error, setError] = useState("");

  function FnUserEmailInput(e) {
    console.log(e.target.value);
    // setEmailInput: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setEmailInput(e.target.value);
  }

  function FnUserPasswordInput(e) {
    console.log(e.target.value);
    // setEmailInput: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setPassWordInput(e.target.value);
  }

  function FnfullNameInput(e) {
    console.log(e.target.value);
    // setEmailInput: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setfullNameInput(e.target.value);
  }

  async function handleSubmit(event) {
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
      });
      <Link to="/catalog" />;
    } catch (error) {
      setError(error.message);
    }
  }

  function handelValidation(params) {
    console.log("handelValidation");
  }

  // Hier wird das Markup-Teil gerendert wie in Svelte
  return (
    <div className="base-container" data-v-signup4312>
      {/* <div on:submit|preventDefault={handleSubmit} className="form"> */}
      <div onSubmit={handleSubmit} className="form" data-v-signup4312>
        <h1 className="title-cont is-medium">BOOM | Sign Up</h1>
        <div className="form-container" data-v-signup4312>
          <label htmlFor="name" data-v-signup4312>
            Full Name
          </label>
          <input
            required
            type="text"
            onChange={FnfullNameInput}
            // bind:value={userInput.fullNameInput}
            className="input is-rounded"
            placeholder="Your Full Name"
            data-v-signup4312
          />
          {/* <p className="error">{errors.fullName}</p> */}
          <label htmlFor="email" data-v-signup4312>
            E-Mail
          </label>
          <input
            required
            type="email"
            // bind:value={userInput.emailInput}
            onChange={FnUserEmailInput}
            className="input is-rounded"
            placeholder="Your E-Mail-Adress"
            data-v-signup4312
          />
          {/* <p className="error">{errors.mail}</p> */}

          <label htmlFor="password" data-v-signup4312>
            Password
          </label>
          <input
            required
            type="password"
            // bind:value={userInput.passWordInput}
            onChange={FnUserPasswordInput}
            className="input is-rounded"
            placeholder="A Strong Password"
            data-v-signup4312
          />
          {/* <p className="error">{errors.passWord}</p> */}
        </div>
      </div>
      <div className="btn-contianer" data-v-signup4312>
        {/* {#if !isValid} */}
        <button
          //   on:click|preventDefault={handelValidation}
          onClick={handelValidation}
          className="button is-rounded is-primary check"
          data-v-signup4312
        >
          Check Entries
        </button>
        {/* {:else} */}
        <button
          // on:click|preventDefault={handleSubmit}
          onClick={handleSubmit}
          className="button is-rounded is-primary sign-up"
          data-v-signup4312
        >
          Sign Up
          <Link to="/catalog" />
        </button>
        {/* {/if} */}

        <div className="para-contianer" data-v-signup4312>
          <a href="/login" className="para__title" data-v-signup4312>
            Already have an Account?
          </a>
        </div>
      </div>
    </div>
  );
}
