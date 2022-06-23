import { React, useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
import Stars from "./Stars/Stars";
import "./Modal.scss";
import axios from "axios";
import { toast } from "react-toastify";
// import { Modal, Button } from "react-bootstrap";

export default function ModalGlobal({
  isVisible,
  userName,
  artID,
  userId,
  token,
  articleId,
  updateArticle,
  closeModal,
  showModal,
}) {
  // vgl. die Erklaerungen in App.jsx zu 'singleview/:artID'
  // let artID = useParams().artID;
  let [myRating, setMyRating] = useState(0);
  let [recension, setRecension] = useState("");
  let [myRecommendation, setMyRecommendation] = useState(null);
  const [modalCSS, setModalCSS] = useState("modal is-active is-clipped");
  const [show, setShow] = useState(showModal);

  // const handleClose = () => {
  //   setShow(false);
  //   closeModal();
  // };
  // const handleShow = () => setShow(true);

  function getRating(rating) {
    setMyRating(rating);
    console.log("Aktuelles Rating: " + rating);
  }

  //  let modalCSS = isVisible ? "modal is-active is-clipped" : "modal";

  async function sendRecommendationHandler() {
    let recommendation = {
      rating: myRating, // int:5 (Sterne 5)
      text: recension,
      userId: userId,
      createdAt: Date.now(), // :BigInt: Millisekunden seit 1.1.1970 00:00 Uhr GMT
      username: userName, // userFullName muss noch aus FS geholt werden dazu ab zeile: 41
    };
    if (token) {
      // left =  key = request zum Server
      // right = value = den werte vom Frontend
      axios
        .post("http://localhost:4000/sendRecommendation", {
          recommendation: recommendation,
          articleId: articleId,
        })
        .then((res) => res.data)
        // response comming from the server
        .then(() => {
          toast.success("recommendation has been writen!");
          updateArticle(articleId);
          // handleClose();
        })
        .catch((err) => {
          toast.error("err");
        });
    }
  }
  function getRecensionValue(e) {
    // console.log(e.target.value);
    // getRecensionValue: ist ASYNCHRON, AUFGESCHOBEN!
    // d.h. es wird sowieso erst nach Ende dieser Funktion ausgefuehrt.
    // deshalb steht es auch hier schon "ganz unten".
    setRecension(e.target.value);
  }
  /* 
    // <Modal size="xl" show ={show} onHide={handleClose}>
    //   <Modal.Body>
    //     <header className="modal-card-head">
    //       <p className="modal-card-title">Article Rating</p>

    //     </header>
    //     <section className="modal-card-body">
    //       <p className="subtitle is-5">
    //         You can write here your recension about this article:
    //       </p>
    //       <div>
    //         <input
    //           value={recension}
    //           onChange={getRecensionValue}
    //           className="modal-input input is-primary"
    //           placeholder="Your Recension"
    //           required
    //           type="text"
    //         />
    //       </div>
    //       <Stars getRating={getRating} />
    //     </section>
    //     <footer className="modal-card-foot">
    //       <div
    //         className="modal-send-btn button is-success"
    //         onClick={sendRecommendationHandler}
    //       >
    //         Send it
    //       </div>
    //     <Button variant="secondary" onClick={handleClose}>
    //         Close
    //       </Button>
    //     </footer>
    //   </Modal.Body>
    //   </Modal>
    */
  return (
    <div className={modalCSS}>
      <div className="modal-background modal-position" onClick={closeModal} />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Article Rating</p>
          <button className="delete" aria-label="close" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <p className="subtitle is-5">
            You can write here your recension about this article:
          </p>
          <div>
            <input
              value={recension}
              onChange={getRecensionValue}
              className="modal-input input is-primary"
              placeholder="Your Recension"
              required
              type="text"
            />
          </div>
          <Stars getRating={getRating} />
        </section>
        <footer className="modal-card-foot">
          <div
            className="modal-send-btn button is-success"
            onClick={sendRecommendationHandler}
          >
            Send it
          </div>
        </footer>
      </div>
    </div>
  );
}
