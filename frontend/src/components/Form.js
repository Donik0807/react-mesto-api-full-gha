import React from "react";

export default function Form({ name, title, onSubmit, saveText, children, theme="dark" }) {
  return (
    <form className="form" name={name} onSubmit={onSubmit}>
      <h3 className={`form__text form__text_${theme}`}>{title}</h3>
      {children}
      <button
        className={`form__save-button button-animation form__save-button_${theme}`}
        type="submit"
        aria-label={saveText}
      >
        {saveText}
      </button>
    </form>
  );
}
