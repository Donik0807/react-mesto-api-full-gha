import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Footer from "./Footer";
import Header from "./Header";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  navigationText,
  onNavigate,
  email
}) {
  const user = useContext(CurrentUserContext);
  return (
    <>
      <Header navigationText={navigationText} onNavigate={onNavigate} email={email}/>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <div className="profile__avatar-overlay" onClick={onEditAvatar} />
            <img
              src={user.avatar}
              alt="Изображение профиля"
              className="profile__avatar"
            />
          </div>
          <div className="profile__profile-info">
            <div className="profile__row">
              <h1 className="profile__name">{user.name}</h1>
              <button
                className="profile__edit-button button-animation"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__status">{user.about}</p>
          </div>
          <button
            className="profile__add-button button-animation"
            type="button"
            aria-label="Добавить"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="photo-gallery">
          {cards?.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={() => onCardClick(card)}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            ></Card>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
