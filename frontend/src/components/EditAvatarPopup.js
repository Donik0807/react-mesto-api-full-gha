import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const avatarLink = inputRef.current.value;
    onUpdateAvatar(avatarLink);
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      saveText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input-container form__input-container_inmodal">
        <input
          type="url"
          id="avatar-input"
          className="form__text-input form__text-input_dark form__text-input_type_about"
          placeholder="Ссылка на картинку"
          name="link"
          required
          ref={inputRef}
        />
      </div>
    </PopupWithForm>
  );
}
