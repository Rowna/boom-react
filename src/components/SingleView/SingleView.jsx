import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";

import "./SingleView.scss";
import RatingContainer from "../Rating/RatingContainer";
import Platzhalter from "../../containers/Platzhalter";
import Stars from "../../containers/Stars/Stars";
import Modal from "../../containers/Modal";

export default function SingleView() {
  let { db, user } = useFirebase();
  // vgl. die Erklaerungen in App.jsx zu 'singleview/:artID'
  let artID = useParams().artID;
  let [article, setArticle] = useState({});
  let [recommendations, setRecommendations] = useState(null);
  let [recAlreadyWritten, setRecAlreadyWritten] = useState(false);
  let [modalVisible, setModalVisible] = useState(false);
  let [platzhalterVisible, setPlatzhalterVisible] = useState(false);
  let articleRef = doc(db, "articles", artID);
  let imgURL = "/images/" + article.img;

  function fnRecAlreadyWritten(pRecommendations) {
    if (pRecommendations && pRecommendations.length > 0) {
      for (let el of pRecommendations) {
        if (el.userId === user.uid) return true;
        // console.dir(el.userId === user.uid);
        //  return recommendations.indexOf((el) => el.userId === user.uid) === -1;
      }
      // "callback": wenn ich es bis hierher in dieser funktion geschafft habe,
      // gibt es nur noch diese Möglichkeit:
      return false;
    }
  }

  useEffect(() => {
    getDoc(articleRef)
      .then((docsnapshot) => {
        let theArticle = null;
        if (docsnapshot.exists()) {
          theArticle = { ...docsnapshot.data() };
          // console.dir(fnRecAlreadyWritten(theArticle.recommendations));
          setRecommendations(theArticle.recommendations);
          // hier muss ich noch pruefen, ob es eine
          // recommendation mit der aktuellen userID
          // vorhanden ist. Wenn sie vorhanden ist,
          // muss
          setArticle(theArticle);
          // Ich wollte vermeiden, dass State-Variablen von
          // einander abhängig werden, wenn sie nämlich abhängig sind
          // kann man sich nicht mehr darauf verlassen, dass sie den
          // richtigen Wert haben, wenn sie gebraucht werden.
          // ODER: Man kann einfach ein extra ".then()" unter dieses ".then()"
          // anfügen, um die Reihenfolge der State-Setter zu kontrollieren.
          setRecAlreadyWritten(fnRecAlreadyWritten(theArticle.recommendations));
        } else {
          throw new Error("Nix passendes gefunden!");
        }
      })
      .catch((error) => {
        console.log("So eine Scheisse! " + error.message);
      });
  }, [user]);

  function ratingHandler() {
    // Ab jetzt ist Modal zu sehen
    setModalVisible(true);
    console.log("ratingHandler");
  }

  function EditRatingHandler() {
    console.log("Edit geklickt! ... ");
    setPlatzhalterVisible(true);
  }
  return (
    <>
      <div>{modalVisible ? <Modal isVisible={modalVisible} /> : <></>}</div>
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
                <img
                  className="sv-img"
                  src={imgURL}
                  alt="Bild"
                />
              </div>

              <div className="card-footer-item sv-sterne">
                <Stars />
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
                  <div className="rate-btn-container card-content">
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
                    <div className="rate-btn-container card-content">
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
                  <p className="card-content">
                    <button className="button gly-btn">Back to Gallery</button>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <br />

        {/* <RatingContainer recommendations={recommendations} /> */}

        {recommendations && recommendations.length > 0 ? (
          <RatingContainer recommendations={recommendations} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
