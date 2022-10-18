import { React, useEffect } from "react";

function SingleItemGallery({ images }) {
  // console.log(images);

  return (
    <div className="item-container">
      <p className="subtitle is-3">Hello Title</p>
      <figure>
        <img src={images && images} alt="article" />
      </figure>
    </div>
  );
}
export default SingleItemGallery;
