import { React, useState, useEffect } from "react";
import axios from "axios";
// import SingleItemGallery from "./SingleItemGallery";
import { useParams } from "react-router-dom";
import "./ProductReviewerRoute.scss";
import { useNavigate } from "react-router-dom";

function ProductReviewerRoute() {
  let { artID } = useParams();

  const [item, setItem] = useState({});
  // console.log(item.attributes);

  const getArticleById = (id) => {
    axios
      // get article where articleId = artID
      .get("http://localhost:4000/getArticleById?articleId=" + id)
      .then((res) => res.data)
      // response comming from the server
      .then((data) => {
        // navigate("/singleitem");
        setItem(data.article);
      })
      .catch((err) => {
        console.log("The Error is: " + err.response.data.message);
      });
  };

  useEffect(() => {
    getArticleById(artID);
    // console.log(item);
  }, [artID]);

  return (
    <>
      <div className="item-container_title">
        <h2>BOOM</h2>
        <p className="item-subtitle is-7">
          Select favorite colors and sizes for ur Kids
        </p>
      </div>

      {item && (
        <div className="items-container box">
          {/* {item.title} */}
          <div className="images-container">
            {item.images &&
              item.images.map((image, id) => (
                <figure className="image is-128x128">
                  <img key={id} src={image && image} alt="article" />
                </figure>
              ))}
          </div>
          <div className="images-info">
            <div className="card-footer image-color">
              <div className="card-footer-item color-div">
                <h2 className="title is-4">Color </h2>
              </div>

              <div className="colors card-footer-item buttons are-medium">
                {item.attributes &&
                  item.attributes[0].colors.map((color, id) => (
                    <button key={id} className="button is-normal color-btn">
                      {color}
                    </button>
                  ))}
              </div>
            </div>

            <div className="card-footer image-size">
              <div className="card-footer-item size-div">
                <h2 className="title is-4">Size </h2>
              </div>

              <div className="colors card-footer-item buttons are-medium">
                {item.attributes &&
                  item.attributes[0].sizes.map((size, id) => (
                    <button key={id} className="button is-normal size-btn">
                      {size} Years
                    </button>
                  ))}
              </div>
            </div>
            <div className="card-footer images-btn">
              <div className="card-footer-item">
                <a href="/" className="button card-footer-item">
                  add to Card
                </a>
              </div>
              <div className="card-footer-item">
                <a href="/" className="button card-footer-item">
                  add to Favorite
                </a>
              </div>
            </div>
            {/*
            <div className="card-footer image-color">
              <div className="card-footer-item description-div">
                <h2 className="title is-4">Article Description</h2>
              </div>
                 {item.title} 
            </div>
            */}
          </div>
        </div>
      )}
    </>
  );
}
export default ProductReviewerRoute;
