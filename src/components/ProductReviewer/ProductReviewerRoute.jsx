import { React, useState, useEffect } from "react";
import axios from "axios";
// import SingleItemGallery from "./SingleItemGallery";
import { useParams } from "react-router-dom";
import "./ProductReviewerRoute.scss";
import { useNavigate } from "react-router-dom";

function ProductReviewerRoute() {
  let { artID } = useParams();

  const [item, setItem] = useState({});

  const getArticleById = (id) => {
    axios
      // get article where articleId = artID
      .get("http://localhost:4000/getArticleById?articleId=" + id)
      .then((res) => res.data)
      // response comming from the server
      .then((data) => {
        // console.log("Images is  " + data.article.images[0]);
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
      {item && (
        <div className="item-container">
          {/* {item.title} */}
          <div className="item-title">
            <h2>BOOM</h2>
            <p className="item-subtitle is-7">
              Select favorite colors and sizes for ur Kids
            </p>
          </div>
          {item.images &&
            // item.images.map((image) => <SingleItemGallery images={image} />)}
            item.images.map((image) => (
              <figure>
                <img src={image && image} alt="article" />
              </figure>
            ))}
        </div>
      )}
    </>
  );
}
export default ProductReviewerRoute;
