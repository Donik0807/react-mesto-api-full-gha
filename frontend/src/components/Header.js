import React, { useState } from "react";
import headerLogo from "../images/header__logo.svg";
import burger from "../images/burger.svg";
import close from "../images/close.svg";

export default function Header({ navigationText, onNavigate, email }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="header">
      {isDropdownOpen && (
        <div className="header__dropdown">
          <p className="header__email header__email_dropdown">{email}</p>
          <button
            className="header__button header__button_dropdown button-animation"
            type="button"
            onClick={onNavigate}
          >
            {navigationText}
          </button>
        </div>
      )}
      <div className="header__container">
        <img src={headerLogo} alt="Место" className="header__logo" />
        <nav
          className={`header__navigation ${
            email && "header__navigation_hidden"
          }`}
        >
          {email && <p className="header__email">{email}</p>}
          <button
            className="header__button button-animation"
            type="button"
            onClick={onNavigate}
          >
            {navigationText}
          </button>
        </nav>
        {email && (
          <img
            alt="Навигация"
            src={isDropdownOpen ? close : burger}
            className="header__burger-btn"
            onClick={() => {
              setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen);
            }}
          />
        )}
      </div>
    </header>
  );
}
