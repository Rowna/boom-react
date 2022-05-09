import "./Signup.scss";

import React from "react";

import "firebase/auth";
import 'firebase/firestore';

export default function Signup() {
  // Hier ist das <Script>-Teil in Svelte


  function handleSubmit() {
      console.log("HandleSubmit");
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
          <label htmlFor="name" data-v-signup4312>Full Name</label>
          <input
            required
            type="text"
            // bind:value={userInput.fullNameInput}
            className="input is-rounded"
            placeholder="Your Full Name"
            data-v-signup4312
          />
          {/* <p className="error">{errors.fullName}</p> */}
          <label htmlFor="email" data-v-signup4312>E-Mail</label>
          <input
            required
            type="email"
            // bind:value={userInput.emailInput}
            className="input is-rounded"
            placeholder="Your E-Mail-Adress"
            data-v-signup4312
          />
          {/* <p className="error">{errors.mail}</p> */}

          <label htmlFor="password" data-v-signup4312>Password</label>
          <input
            required
            type="password"
            // bind:value={userInput.passWordInput}
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
          className="button is-rounded is-primary check" data-v-signup4312
        >
          Check Entries
        </button>
        {/* {:else} */}
        <button
          // on:click|preventDefault={handleSubmit}
          onClick={handleSubmit}
          className="button is-rounded is-primary sign-up" data-v-signup4312
        >
          Sign Up
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
