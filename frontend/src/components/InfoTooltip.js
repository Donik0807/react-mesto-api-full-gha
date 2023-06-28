import React from "react";
import Popup from "./Popup";
import success from "../images/success.svg";
import failed from "../images/failed.svg";

export default function InfoTooltip({ isOpen, onClose, isSuccessful }) {
  return (
    <Popup name="tooltip" isOpen={isOpen} onClose={onClose}>
      <div>
        <img
          alt={isSuccessful ? "Успешно!" : "Неудачно"}
          src={isSuccessful ? success : failed}
          className="popup__register-status"
        />
        <p className="popup__register-text">
          {isSuccessful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </Popup>
  );
}
