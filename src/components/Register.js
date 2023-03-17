import React, { useCallback, useState } from "react";
import InfoTooltip from "./InfoTooltip";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../utils/Auth";
import Header from "./Header";
import { createPortal } from "react-dom";
import ApprovePict from "../images/checkmark.png"

function Register({ name, button }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [infoTooltip, setInfoTooltip] = useState({
    visible: "popup popup_opened InfoTooltip",
    images: ApprovePict,
    status: "Вы успешно зарегистрировались!",
    isOpen: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleClose = useCallback(() => {
    setInfoTooltip((s) => ({...s, isOpen: false}));
    navigate("/sign-in", { replace: true });
  }, [])

  function opetTooltip() {
    setInfoTooltip((s) => ({...s, isOpen: true}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    auth
      .signUp(password, email)
      .then(() => {
        opetTooltip()
      })
      .catch(err => console.log(err));
  };

  function navRegister() {
    navigate("/sign-in", { replace: true });
  }

  return (
    <>
      <Header onClick={navRegister} nameClick="Войти" setUserEmail=""></Header>
      <div className="authorization">
        <p className="authorization__name">{name}</p>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <section className="authorization__section">
            <input
              name="email"
              type="email"
              className="authorization__input"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
            ></input>
            <input
              name="password"
              type="password"
              className="authorization__input"
              placeholder="Пароль"
              value={formValue.password}
              onChange={handleChange}
            ></input>
          </section>
          <button className="authorization__submit">{button}</button>
        </form>
        <Link to="/sign-in" className="authorization__link">
          Уже зарегистрировались? Войти
        </Link>

        {infoTooltip.isOpen && createPortal(
          <InfoTooltip
            status={infoTooltip.status}
            visible={infoTooltip.visible}
            images={infoTooltip.images}
            onClose={handleClose}
          ></InfoTooltip>,
          document.body
        )}
      </div>
    </>
  );
}

export default Register;
