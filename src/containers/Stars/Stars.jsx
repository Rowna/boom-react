import React from "react";
import "./Stars.scss";

export default function Stars() {


  function getRating() {
    console.log("GetRating 5");
  }


  return (
    <>
      <p className="sternebewertung">
        <input type="radio" id="stern5" name="bewertung" value="5" />
        <label htmlFor="stern5" title="5 Sterne" onClick={() => getRating(5)}>
          5 Sterne
        </label>
        <input type="radio" id="stern4" name="bewertung" value="4" />
        <label htmlFor="stern4" title="4 Sterne" onClick={() => getRating(4)}>
          4 Sterne
        </label>
        <input type="radio" id="stern3" name="bewertung" value="3" />
        <label htmlFor="stern3" title="3 Sterne" onClick={() => getRating(3)}>
          3 Sterne
        </label>
        <input type="radio" id="stern2" name="bewertung" value="2" />
        <label htmlFor="stern2" title="2 Sterne" onClick={() => getRating(2)}>
          2 Sterne
        </label>
        <input type="radio" id="stern1" name="bewertung" value="1" />
        <label htmlFor="stern1" title="1 Stern" onClick={() => getRating(1)}>
          1 Stern
        </label>

        <span id="Bewertung" title="Keine Bewertung">
          <label onClick={() => getRating(0)}>
            {/* <input type="radio" name="bewertung" value="0" checked="checked" /> */}
            <input type="radio" name="bewertung" value="0" />
            Cancel Rates
          </label>
        </span>
      </p>
    </>
  );
}
