export const popupValidate = {
  formClass: 'popup__form',
  textInputClass: 'popup__text-input',
  inputErrorClass: 'popup__text-input_invalid',
  errorActiveClass: 'popup__text-input-error_active',
  saveButtonClass: 'popup__save-button',
  saveButtonInactiveClass: 'popup__save-button_inactive',
};

export const apiOptions = {
  baseUrl: 'https://api.mesto.front.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json'
}}

export const getTokenHeader = () => {
  const token = localStorage.getItem("jwt");
  return token ? `Bearer ${token}` : ''
} 