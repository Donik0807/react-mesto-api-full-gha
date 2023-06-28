import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const initialState = { name: "", link: "" };

export default function AddPlacePopup({ isOpen, onClose, onPlaceAdd }) {
  const { inputData, handleChange, setInputData } = useForm(initialState);

  const { name, link } = inputData;

  function handleSubmit(e) {
    e.preventDefault();
    onPlaceAdd(inputData);
  }

  useEffect(() => {
    setInputData(initialState);
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      saveText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input-container form__input-container_inmodal">
        <input
          type="text"
          id="place-input"
          className="form__text-input form__text-input_dark form__text-input_type_name"
          placeholder="Название"
          name="name"
          required
          minLength={2}
          maxLength={30}
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="form__input-container form__input-container_inmodal">
        <input
          type="url"
          id="url-input"
          className="form__text-input form__text-input_dark  form__text-input_type_about"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={link}
          onChange={handleChange}
        />
      </div>
    </PopupWithForm>
  );
}
