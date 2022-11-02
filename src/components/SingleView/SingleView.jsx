import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./SingleView.scss";
import RatingContainer from "../Rating/RatingContainer";
import Platzhalter from "../../containers/Platzhalter";
import Stars from "../../containers/Stars/Stars";
import Modal from "../../containers/Modal";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function SingleView({ token, userName, userId }) {
  // vgl. die Erklaerungen in App.jsx zu 'singleview/:artID'
  let { artID } = useParams();
  let [article, setArticle] = useState({});
  // console.log(article)

  let [recAlreadyWritten, setRecAlreadyWritten] = useState(false);
  let [modalVisible, setModalVisible] = useState(false);
  let [platzhalterVisible, setPlatzhalterVisible] = useState(false);
  // let imgURL = article.img;
  
  // let imgURL = "/uploads/" + article.images && article.images[0];

  function fnRecAlreadyWritten(pRecommendations) {
    if (pRecommendations && pRecommendations.length > 0) {
      for (let el of pRecommendations) {
        if (el.userId === userId) return true;
        // console.dir(el.userId === user.uid);
        //  return recommendations.indexOf((el) => el.userId === user.uid) === -1;
      }
      // "callback": wenn ich es bis hierher in dieser funktion geschafft habe,
      // gibt es nur noch diese Möglichkeit:
      return false;
    }
  }
  const closeModal = () => {
    setModalVisible(false);
  };

  const getArticleById = (id) => {
    axios
      // get article where articleId = artID
      .get("http://localhost:4000/getArticleById?articleId=" + id)
      .then((res) => res.data)
      // response comming from the server
      .then((data) => {
        setArticle(data.article);
        setRecAlreadyWritten(fnRecAlreadyWritten(data.article.recommendations));
      })
      .catch((err) => {
        console.log("The Error is: " + err.response.data.message);
      });
  };
  // هون بدنا نحصل على الايدي من خلال بناء الصفحة وتحديها بالايدي من اليوز بارامس
  useEffect(() => {
    getArticleById(artID);

    // axios
    // // get article where articleId = artID
    // .get("http://localhost:4000/getRecommendations" )
    // .then((res) => res.data)
    // // response comming from the server
    // .then((data) => {
    //   setRecommendations(data.recommendations);
    // })
    // .catch((err) => {
    //   console.log("The Error is: " + err.response.data.message);
    // });
    //}
  }, [artID]);

  function ratingHandler() {
    if (token) {
      setModalVisible(true);
    } else {
      toast.error("you should login");
    }
  }

  function EditRatingHandler() {
    console.log("Edit geklickt! ... ");
    setPlatzhalterVisible(true);
  }
  return (
    <>
      {modalVisible && (
        <Modal
          updateArticle={(articleId) => getArticleById(articleId)}
          token={token}
          userName={userName}
          userId={userId}
          articleId={article._id}
          isVisible={modalVisible}
          closeModal={closeModal}
          showModal={modalVisible}
        />
      )}

      <div className="singleview-title">
        <p>BOOM</p>
        <p className="subtitle is-7">
          Rate your article and read more about it!
        </p>
      </div>

      <div className="singleview-base-container">
        <div className="card">
          <div className="card-footer sv-article-conatiner">
            <div className="card-footer-item sv-left-container">
              <div className="sv-img-container">
                <img className="sv-img" src={article.images && article.images[0]} alt="svImage" />
              </div>

              <div className="card-footer-item sv-sterne">
                <Stars stars={4} />
              </div>
            </div>

            <br className="line" />

            <div className="card-footer-item desc-container">
              <div>
                <h2 className="article-title title is-4">{article.title}</h2>
                <p className="article-price subtitle is-5">{article.price} €</p>
                <p className="article-desc subtitle is-6">{article.desc}</p>
              </div>
              <div className="sv-btns card">
                {recAlreadyWritten ? (
                  // Das Block muss in einem Component
                  <div className="rate-btn-container ">
                    <p
                      className="button is-info edit-btn"
                      onClick={EditRatingHandler}
                    >
                      Edit your Recension
                    </p>
                  </div>
                ) : (
                  <>
                    {/* {isLoading ? <></> : <></> ? <></> : <></>} */}
                    {platzhalterVisible && <Platzhalter />}
                    {/* // Das Block muss in einem Component */}
                    <div className="rate-btn-container ">
                      <p
                        className="button is-info rate-btn"
                        onClick={ratingHandler}
                      >
                        Write your Recension
                      </p>
                    </div>
                  </>
                )}

                <Link to="/catalog">
                  <p className="">
                    <button className="button gly-btn">Back to Gallery</button>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <br />

        {/* <RatingContainer recommendations={recommendations} /> */}

        {article.recommendations && article.recommendations.length > 0 ? (
          <RatingContainer recommendations={article.recommendations} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

// mapStateToProps ist eine function, mit der hole ich die variablen aus
// Redux-Store (userRed) und verbinde sie mit dem Veriable im aktuellen Component
// mapStateToProps is to point userName to the current Components props
const mapStateToProps = (state) => {
  return {
    // für den Server.js ab zeile 78
    token: state.userRed.token,
    userId: state.userRed.userId,
    userName: state.userRed.userName,
  };
};
// connect() ist eine Methode in Redux-react, sie verbindet  das aktuelle Component mit dem Redux-Store
export default connect(mapStateToProps)(SingleView);
