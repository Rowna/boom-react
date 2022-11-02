import React from "react";

export default function EditRating({ EditRatingHandler }) {
  return (
    <>
      <div className="card-content">
        <p className="button is-info edit-btn" onClick={EditRatingHandler}>
          Edit your Recension
        </p>
      </div>
    </>
  );
}
