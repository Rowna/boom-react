import React from "react";
import { Link } from "react-router-dom";
import "./CartEmpty.scss";

export default function CartEmpty() {
  return (
    <>
      <div className="box box1">
        <div>
          <p className="title is-4">
            ... The Cart is waiting for your Articles!
          </p>
        </div>
      </div>
      <Link to="/catalog" className="box box2">
        <button className="is-primary ce-gallery-btn">Back to Gallery</button>
      </Link>
    </>
  );
}
