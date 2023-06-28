import React from "react";

export default function Popup({name, isOpen, onClose, children, isModal = true}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container ${isModal ? "popup__container_modal" : ''}`}>
        {children}
        <button
          className="popup__close-button button-animation"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
