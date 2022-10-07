import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Modal.css";
import Card1 from "./Cards/Card1";
import Card2 from "./Cards/Card2";
import Card3 from "./Cards/Card3";
import Card4 from "./Cards/Card4";
import Card5 from "./Cards/Card5";
import Card6 from "./Cards/Card6";
const Modal = (props) => {
  const [cardNumber, setCardNumber] = useState(1);

  return (
    <div className="modal-container">
      <div className="modal">
        {cardNumber === 1 ? (
          <Card1 />
        ) : cardNumber === 2 ? (
          <Card2 />
        ) : cardNumber === 3 ? (
          <Card3 />
        ) : cardNumber === 4 ? (
          <Card4 />
        ) : cardNumber === 5 ? (
          <Card5 />
        ) : cardNumber === 6 ? (
          <Card6 />
        ) : (
          ""
        )}

        <div className="modal-btn-container">
          <button
            onClick={() => props.onToggleModal(false)}
            className="modal-btn"
          >
            Exit
          </button>
          <div>
            {cardNumber !== 1 ? (
              <button
                className="modal-btn "
                onClick={() => setCardNumber(cardNumber - 1)}
              >
                Back
              </button>
            ) : (
              ""
            )}
            {cardNumber !== 6 ? (
              <button
                className="modal-btn modal-right-side-btn"
                onClick={() => setCardNumber(cardNumber + 1)}
              >
                {" "}
                Next
              </button>
            ) : (
              <button
                className="modal-btn modal-right-side-btn"
                onClick={() => props.onToggleModal(false)}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
