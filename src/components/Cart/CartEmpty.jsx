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
      <div className="box box2">
        <button className="is-primary gallery-btn">
          <Link to="/catalog">
            <p className="btg">Back to Gallery</p>
          </Link>
        </button>
      </div>
    </>
  );
}
