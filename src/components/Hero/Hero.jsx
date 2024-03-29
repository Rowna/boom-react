import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <div>
      <div className="base-container">
        {/* --- Image fürs Handy --- */}
        <div className="img-container">
          <img className="img" src="/uploads/1.jpeg" alt="Prince" />
        </div>

        {/* --- Image für Bildschirm --- */}
        <div className="base-images">
          <div className="images up">
            <img className="img-item" src="/uploads/6.jpeg" alt="firstImg" />
          </div>

          <div className="images middle">
            <img className="img-item" src="/uploads/2.jpeg" alt="secondImg" />
          </div>

          <div className="images down">
            <img className="img-item" src="/uploads/1.jpeg" alt="thirdImg" />
          </div>
        </div>

        {/* --- Infos --- */}
        <div className="info-container">
          <h1 className="title hero-title">BOOM</h1>
          <p className="subtitle hero-subtitle is-6">
            A Page takes you to kids Mode where you can find your kids favorite
            clothes
          </p>

          {/* --- Button: so muss der Link aussehen, wenn er auf einen
             Routen-Enpoint geht, z.B. '/catalog'  --- */}

          <Link to="/catalog">
            <button className="button letsshop is-primary" data-v-f4231f1a>
              Let's shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
