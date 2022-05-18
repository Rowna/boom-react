import { React, useEffect, useState } from "react";
import "./SingleView.scss";
import Stars from "../../containers/Stars/Stars";

import { useParams, Link } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";

export default function SingleView() {
  // vgl. die Erklaerungen in App.jsx zu 'singleview/:artID'
  const artID = useParams().artID;
  // console.log("Artikel-ID: " + artID);

  let [article, setArticle] = useState({});
  let { db, user } = useFirebase();

  let articleRef = doc(db, "articles", artID);
  // console.dir(articleRef)

  useEffect(() => {
    getDoc(articleRef)
      .then((docsnapshot) => {
        let theArticles = [];
        if (docsnapshot.exists()) {
          docsnapshot.forEach((element) => {
            theArticles.push({ id: element.id, ...element.data() });
          });
          setArticle(theArticles);

          // console.dir("Docsnapshot: " + docsnapshot)
          // recommendations = article.recommendations;
          // recAlreadyWritten = fnRecAlreadyWritten();
        } else {
          throw new Error("Nix passendes gefunden!");
        }
      })
      .catch((error) => {
        console.log("So eine Scheisse! " + error.message);
      });
  }, []);

  function ratingHandler() {
    console.log("ratingHandler");
  }

  return (
    <>
      <div className="singleview-title">
        <p>BOOM</p>
        <p className="subtitle is-7">
          Rate your article and read more about it!
        </p>
      </div>

      <div className="singleview-base-container">
        <div className="card">
          <div className="card-footer sv-article-conatiner">
            <div className="card-footer-item sv-img-container">
              <div>
                <img
                  className="sv-img"
                  src="/images/{article.img}"
                  alt="Bild"
                />
              </div>

              <div className="card-footer-item sv-sterne">
                <Stars />
              </div>
            </div>

            {/* {#if modalVisible}
                  <Modal />
                {/if}
             */}
            <br className="line" />

            <div className="card-footer-item desc-container">
              <div>
                <h2 className="article-title title is-4">{article.title}</h2>
                <p className="article-price subtitle is-5">{article.price} €</p>
                <p className="article-desc subtitle is-6">{article.desc}</p>
              </div>

              <div className="sv-btns card">
                {/* {#if recAlreadyWritten} */}
                <p className="rate-btn-container card-content">
                  <Link to="">
                  <p
                    className="button is-info edit-btn"
                    // onClick={EditRatingHandler}
                  >
                    Edit your Recension
                  </p>
                  </Link>
                </p>

                {/* {#if platzhalterVisible}
                      <Platzhalter />
                    {/if}
                */}
                {/* {:else}*/}
                <p className="rate-btn-container card-content">
                  <a
                    className="button is-info rate-btn"
                    href="/#"
                    onClick={ratingHandler}
                  >
                    Write your Recension
                  </a>
                </p>
                {/* {/if}  */}
                <Link to="/catalog">
                  <p className="card-content">
                    <button className="button gly-btn ">Back to Gallery</button>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <br />
        {/* {#if recommendations && recommendations.length > 0}
    <RatingContainer {recommendations} />
  {/if} */}
      </div>
    </>
  );
}
