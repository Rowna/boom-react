import { React, useState, useEffect } from "react";
import axios from "axios";
// import SingleItemGallery from "./SingleItemGallery";
import { useParams } from "react-router-dom";
import "./ProductReviewerRoute.scss";
import { useNavigate } from "react-router-dom";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

function ProductReviewerRoute() {
  let { artID } = useParams();

  const [item, setItem] = useState({});
  console.log(item.id);


  function chooseColorHandler() {
    console.log("Color added!");
  }


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
      {/* {item.title} */}

      {item && (
        <div className="items-container box">
          {/* Carousel ab hier */}
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={4}
            dragEnabled="true"
            touchEnabled="true"
            // visibleSlides={1}
          >
            <Slider>
              <div className="images-container">
                {item.images &&
                  item.images.map((image, id) => (
                    <Slide key={id} className="image">
                      <img src={image && image} alt="article" />
                    </Slide>
                  ))}
              </div>
            </Slider>

            <div className="carousel-btns">
              <ButtonBack className="button carousel-btn_back">
                Back
                {/* <img className="carousel-btn_img" src="/uploads/arrow-left.png" alt="" /> */}
              </ButtonBack>
              <ButtonNext className="button carousel-btn_next">
                Next
                {/* <img className="carousel-btn_img" src="/uploads/arrow-right.png" alt="" /> */}
              </ButtonNext>
            </div>
          </CarouselProvider>

          <div className="image-infos">
            <div className="card-footer image-color">
              <div className="card-footer-item image-color_title">
                <h2 className="title is-5">Color </h2>
              </div>

              <div className="colors card-footer-item buttons are-medium" onClick={chooseColorHandler}>
                {item.attributes &&
                  item.attributes[0].colors.map((colorName, id) => (
                    <button
                      key={id}
                      className="is-rounded button is-normal color-btn"
                    >
                      {colorName}
                    </button>
                  ))}
              </div>
            </div>

            <div className="card-footer image-size">
              <div className="card-footer-item image-size_title">
                <h3 className="title is-5">Size </h3>
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

            <div className="card-footer image-desc">
              <div className="card-footer-item image-desc_title">
                <h3 className="title is-5">
                  Article Description <br />
                </h3>
              </div>
              <h4 className="card-footer-item subtitle is-6 image-desc_id">
                Article-Nr: {item._id}
              </h4>
              <div className="card-footer-item image-desc_subtitle">
                <div>{item.desc}</div>
              </div>
            </div>

            <div className="image-btns">
              <div className="card-footer">
                <a href="/" className="button add-btn add-toCart_btn">
                  add to Cart
                </a>
              </div>
              <div className="card-footer">
                <a href="/" className="button add-btn">
                  add to Favorite
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ProductReviewerRoute;
