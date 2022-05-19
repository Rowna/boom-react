import React from "react";
import CartItem from "./CartItem";

import "./Cart.scss";
import "./CartItem.scss";

export default function CartList({ theArticles, getSubUpdate }) {
  return (
    <>
      {theArticles.map((article) => (
        <CartItem
          key={article.id}
          article={article}
          getSubUpdate={getSubUpdate}
        />
      ))}
    </>
  );
}
