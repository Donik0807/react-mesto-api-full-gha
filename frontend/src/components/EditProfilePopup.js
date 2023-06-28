import React, { useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { inputData, handleChange, setInputData } = useForm({
    name: "",
    about: "",
  });

  const {name, about} = inputData;

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(inputData);
  }

  useEffect(() => {
    setInputData({
      name: currentUser.name,
      about: currentUser.about
    });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      saveText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input-container form__input-container_inmodal">
        <input
          type="text"
          id="name-input"
          className="form__text-input form__text-input_dark form__text-input_type_name"
          placeholder="Имя"
          name="name"
          minLength={2}
          maxLength={40}
          required
          value={name || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form__input-container form__input-container_inmodal">
        <input
          type="text"
          id="about-input"
          className="form__text-input form__text-input_dark form__text-input_type_about"
          placeholder="О себе"
          name="about"
          minLength={2}
          maxLength={200}
          required
          value={about || ""}
          onChange={handleChange}
        />
      </div>
    </PopupWithForm>
  );
}