import { React, useState } from "react";
import "./ItemsView.scss";

import { connect } from "react-redux";
import axios from "axios";

function ItemsView() {
  const [item, setItem] = useState({});

  // const getArticleById = (id) => {
  //   axios
  //     .get("http://localhost:4000/getArticleById?articleId=" + id)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       console.log("id ist " + id)
  //       setItem(data.article);
  //     })
  //     .catch((err) => {
  //       console.log("The Error is: " + err.response.data.message);
  //     });
  // };

  return (
    <div className="item-container">
      <div className="item-title">
        <h2>BOOM</h2>
        <p className="item-subtitle is-7">
          Select favorite colors and sizes for ur Kids
        </p>
      </div>

      <div className="box">
        <p className="subtitle is-3">Hello Title</p>
      </div>

    </div>
  );
}
export default ItemsView;
