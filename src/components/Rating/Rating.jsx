import React from "react";
import "./Rating.scss";

export default function Rating({ recom }) {
  return (
    <div className="card-footer">
      <div className="card-footer-item kunden-container">
        <div className="card-footer-item person-container title is-5">
          {recom.username}
          <br />
          <p className="stars subtitle is-4">{recom.rating}</p>
        </div>

        <div className="card-footer-item text-container subtitle is-5">
          {recom.text}
        </div>
      </div>
    </div>
  );
}
