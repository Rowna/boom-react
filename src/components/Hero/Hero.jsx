import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <div>
      {/* <h2 className="is-title is-4">Hier ist die Landing Page!</h2> */}
      <div className="base-container">
        {/* --- Image fürs Handy --- */}
        <div className="img-container">
          <img className="img" src="images/1.jpeg" alt="Prince" />
        </div>

        {/* --- Image für Bildschirm --- */}
        <div className="base-images">
          <div className="images up">
            <img className="img-item" src="images/6.jpeg" alt="" />
          </div>

          <div className="images middle">
            <img className="img-item" src="images/2.jpeg" alt="" />
          </div>

          <div className="images down">
            <img className="img-item" src="images/1.jpeg" alt="" />
          </div>
        </div>

        {/* --- Infos --- */}
        <div className="info-container">
          <h1 className="title">BOOM</h1>
          <p className="subtitle is-6">
            A Page takes you to kids Mode where you can find your kids favorite
            clothes
          </p>

          {/* --- Button --- */}
          <a className="button is-primary" href="/catalog">
            Let's shop
          </a>
        </div>
      </div>
    </div>
  );
}
