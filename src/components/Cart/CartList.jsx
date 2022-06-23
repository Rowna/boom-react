import React from "react";
import CartItem from "./CartItem";

import "./Cart.scss";
import "./CartItem.scss";

class CartList extends React.Component {

  render() {
    return this.props.theArticles.map((article) => (
      <CartItem
        removeitem={this.props.removeitem}
        key={article.id}
        article={article}
        getSubUpdate={this.props.getSubUpdate}
      />
    ));
  }
}

export default CartList;
