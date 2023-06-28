import React from "react";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const initialState = {
  password: "",
  email: "",
};

export default function Login({ onLogin }) {
  const { inputData, setInputData, handleChange } = useForm(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(inputData, () =>
      setInputData({
        password: "",
        email: "",
      })
    );
  };

  return (
    <>
      <Header
        navigationText="Регистрация"
        onNavigate={() => navigate("/signup")}
      />
      <div className="form-container">
        <Form
          name="logn"
          title="Вход"
          saveText="Войти"
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
      </div>
    </>
  );
}
