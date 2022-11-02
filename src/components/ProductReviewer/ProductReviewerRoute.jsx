import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductReviewerRoute.scss";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  ImageWithZoom,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

function ProductReviewerRoute({ userId }) {
  let { artID } = useParams();

  const [item, setItem] = useState({});
  const [userCart, setUserCart] = useState([]);

  const [cartColorId, setCartColorId] = useState(0);
  const [cartSizeId, setCartSizeId] = useState(0);

  function chooseColorHandler(event) {
    let colorId = event.target.dataset.id;
    console.log(colorId);
    setCartColorId(colorId);
  }

  function chooseSizeHandler(event) {
    let sizeId = event.target.dataset.id;
    console.log(sizeId);
    setCartSizeId(sizeId);
  }

  function isInCart() {
    for (let el of userCart) {
      if (el.id === item._id) return true;
    }
    return false;
  }

  function addToCartHandler() {
    // color ausgewählt, // Size ausgewählt, dann
    // add to cart-Button kann geklickt werden

    let cartItem = {
      id: item._id,
      title: item.title,
      desc: item.desc,
      price: item.price,
      img: item.images[0],
      // colorId: cartColorId,
      color: item.attributes[0].colors[cartColorId],
      // sizeId: cartSizeId,
      size: item.attributes[0].sizes[cartSizeId],
    };

    if (isInCart()) {
      // console.log("isInCart is " + isInCart());
      axios
        .get(
          // abfragen "removeFromCart" where cartId =
          "http://localhost:4000/removeFromCart?cartId=" +
            cartItem.id +
            "&userId=" +
            userId
        )
        .then((res) => res.data)
        .then((data) => {
          toast.success(data.message);
        })
        .catch((error) => {
          toast.error("error:" + error.message);
          console.log("error " + error.message);
        });
    } else {
      // console.log("Added to Cart!");
      // console.log("isInCart is " + isInCart());
      axios
        .post("http://localhost:4000/addToCart", {
          // key: in body request zum server
          // value: catItem im Client Frontend
          cartItem: cartItem,
          userId: userId,
        })
        // wenn ich eine Payload vom Server zurück bekomme, geht es
        // hier weiter.
        .then((res) => res.data)
        .then((data) => {
          // Cart-Icon updaten
          toast.success(data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }

  function addToFavoriteHandler() {
    console.log("Added to Favorite!");
  }

  useEffect(() => {
    console.count("Component rendered!");
    // console.log("Use Effect!");
    getArticleById(artID);
  }, [artID]);

  const getArticleById = (id) => {
    axios
      // get article where articleId = artID
      .get("http://localhost:4000/getArticleById?articleId=" + id)
      .then((res) => res.data)
      // response comming from the server
      .then((data) => {
        setItem(data.article);
      })
      .catch((err) => {
        console.log("The error is: " + err.response.data.message);
      });
  };

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
          <div className="carousel-btns_box">
            <CarouselProvider
              naturalSlideWidth={90}
              naturalSlideHeight={125}
              totalSlides={4}
              dragEnabled="true"
              touchEnabled="true"
              visibleSlides={1}
            >
              <Slider>
                <div className="images-container">
                  {item.images &&
                    item.images.map((image, id) => (
                      <Slide key={id} className="image">
                        <ImageWithZoom img src={image && image} alt="article" />
                      </Slide>
                    ))}
                </div>
              </Slider>

              <div className="carousel-btns">
                <ButtonBack className="carousel-btn_back">
                  <img src="/uploads/left-arrow.png" alt="bild" />
                </ButtonBack>
                <ButtonNext className="carousel-btn_next">
                  <img src="/uploads/right-arrow.png" alt="bild" />
                </ButtonNext>
              </div>
              <DotGroup className="carousel-group" />
            </CarouselProvider>
          </div>

          <div className="image-infos">
            <div className="card-footer image-color">
              <div className="card-footer-item image-color_title">
                <h2 className="title is-5">Color </h2>
              </div>

              <div className="colors card-footer-item buttons are-medium">
                {item.attributes &&
                  item.attributes[0].colors.map((colorName, id) => (
                    <button
                      id="colorId"
                      key={id}
                      data-id={id}
                      className="is-rounded button is-normal color-btn"
                      onClick={chooseColorHandler}
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
                  item.attributes[0].sizes.map((sizeName, id) => (
                    <button
                      id="sizeId"
                      key={id}
                      data-id={id}
                      className="button is-normal size-btn"
                      onClick={chooseSizeHandler}
                    >
                      {sizeName} Years
                    </button>
                  ))}
              </div>
            </div>

            <div className="card-footer image-price">
              <div className="card-footer-item price-container">
                <h3 className="title is-4">{item.price} €</h3>
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
                <button
                  className="button add-btn add-toCart_btn"
                  onClick={addToCartHandler}
                >
                  add to cart
                </button>
              </div>

              <div className="card-footer">
                <button
                  className="button add-btn"
                  onClick={addToFavoriteHandler}
                >
                  add to favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.userRed.userId,
  };
};
export default connect(mapStateToProps)(ProductReviewerRoute);
