import React from "react";
import CartItem from "./CartItem";

import "./Cart.scss";
import "./CartItem.scss";


export default function CartList({ articles, getSubUpdate }) {
  return (
    <>
      {articles.map((article) => (
        <CartItem
          key={article.id}
          article={article}
          getSubUpdate={getSubUpdate}
        />
      ))}
    </>
  );
}
