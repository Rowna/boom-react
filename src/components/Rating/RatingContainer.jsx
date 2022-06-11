import React from "react";
import "./RatingContainer.scss";
import Rating from "./Rating";

export default function RatingContainer({ recommendations }) {


  return (
    <div className="card">
      <div className="card-footer-item rc-title-container">
        <p className="title is-4">Customer Ratings:</p>
      </div>
        <>
        <div className="card">
            {recommendations.map((recom) => (
            <Rating key={recom.id} recom={recom} />
            ))}
        </div>
        </>
    </div>
  );
}
