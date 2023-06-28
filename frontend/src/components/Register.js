import React, { useState } from "react";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "./Header";

const initialState = {
  email: "",
  password: "",
};

export default function Register({ onRegister }) {
  const { inputData, handleChange, setInputData } = useForm(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(inputData, () =>
      setInputData({
        email: "",
        password: "",
      })
    );
  };

  return (
    <>
      <Header navigationText="Войти" onNavigate={() => navigate("/signin")} />
      <div className="form-container">
        <Form
          name="register"
          title="Регистрация"
          saveText="Зарегистрироваться"
          theme="light"
          onSubmit={handleSubmit}
        >
          <div className="form__input-container">
            <input
              type="email"
              id="name-input"
              className="form__text-input form__text-input_light form__text-input_type_name"
              placeholder="Email"
              name="email"
              required
              value={inputData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form__input-container">
            <input
              type="password"
              id="about-input"
              className="form__text-input form__text-input_light form__text-input_type_about"
              placeholder="Пароль"
              name="password"
              required
              value={inputData.password}
              onChange={handleChange}
            />
          </div>
        </Form>
        <p className="form__caption">
          Уже зарегистрированы?{" "}
          <NavLink className="form__link button-animation" to="/signin">
            Войти
          </NavLink>
        </p>
      </div>
    </>
  );
}
