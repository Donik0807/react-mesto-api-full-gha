import React, { useState } from "react";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../Utils/api";
import { useEffect } from "react";
import { auth, getContent, register } from "../Utils/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (inputData, loginCallback) => {
    return register(inputData)
      .then((res) => {
        if (res.data) {
          setIsSuccess(true);
          navigate("/signin");
          loginCallback();
        }
      })
      .catch((err) => {
        setIsSuccess(false);
      })
      .finally(() => {
        setIsTooltipOpen(true);
      });
  };

  const handleLogin = (inputData, registerCallback) => {
    return auth(inputData)
      .then((data) => {
        if (data.token) {
          navigate("/");
          setLoggedIn(true);
          registerCallback();
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getContent(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setEmail(data.email);
            setCurrentUser(data);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  };

  // useEffect(() => {
  //   if (loggedIn) {
  //     api
  //       .getUser()
  //       .then((userData) => {
  //         setCurrentUser(userData.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipOpen(false);
  }

  function handlerCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    if (isLiked) {
      api
        .dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(deletedCard) {
    const { _id: deletedId } = deletedCard;
    api
      .deleteCard(deletedId)
      .then((res) => {
        if (res.ok) {
          setCards((currentCards) =>
            currentCards.filter((card) => {
              return card._id !== deletedId;
            })
          );
        } else {
          console.log("failed to delete");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUserUpdate(userData) {
    api
      .editUser(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAvatarUpdate(avatarLink) {
    api
      .updateProfilePicture(avatarLink)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .postCard(card)
      .then((newCard) => {
        setCards((currentCards) => [newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handlerCardLike}
              onCardDelete={handleCardDelete}
              navigationText="Выйти"
              email={email}
              onNavigate={onSignOut}
            />
          }
        />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUserUpdate}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onPlaceAdd={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleAvatarUpdate}
      />
      <PopupWithForm
        name="delete"
        title="Вы уверены"
        saveText="Да"
        onClose={closeAllPopups}
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>
      <InfoTooltip
        isOpen={isTooltipOpen}
        isSuccessful={isSuccess}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}
