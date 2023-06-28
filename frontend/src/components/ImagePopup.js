import React from "react";
import Popup from "./Popup";

export default function ImagePopup({ card, onClose }) {
  return (
    <Popup name="picture" isOpen={card} onClose={onClose} isModal={false}>
      <img src={card?.link} alt={card?.name} className="popup__image" />
      <p className="popup__caption">{card?.name}</p>
    </Popup>
  );
}
