import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card?.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  
  return (
    <figure className="photo-gallery__element">
      <img
        src={card.link}
        alt={card.name}
        className="photo-gallery__picture"
        onClick={onCardClick}
      />
      <figcaption className="photo-gallery__caption">
        <h2 className="photo-gallery__text">{card.name}</h2>
        <div className="photo-gallery__like-container">
          <button
            className={`photo-gallery__like-button button-animation ${
              isLiked && "photo-gallery__like-button_active"
            }`}
            type="button"
            aria-label="Понравилось"
            onClick={handleLikeClick}
          ></button>
          <span className="photo-gallery__like-count">{card.likes.length}</span>
        </div>
      </figcaption>
      {isOwn && (
        <button
          className="photo-gallery__delete photo-gallery__delete_hidden button-animation"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
    </figure>
  );
}
