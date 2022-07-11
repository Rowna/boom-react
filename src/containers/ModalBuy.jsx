import React from "react";
import { useState } from "react";

export default function ModalBuy() {
  //   let modalCSS = "modal is-active is-clipped";
  const [modalCSS, setModalCSS] = useState("modal is-active is-clipped");

  function closeModal() {
    setModalCSS("modal");
  }

  return (
    <>
      <div className={modalCSS}>
        <div className="modal-background" onClick={closeModal} />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Hooray!</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            />
          </header>
          <section className="modal-card-body">
            <p className="subtitle is-5">
              The <strong>Articles</strong> will be sent to you soon! Thank your
              for your shopping with <strong>Boom</strong>!
            </p>
            <div />
          </section>
        </div>
      </div>
    </>
  );
}
