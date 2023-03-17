import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name);
      setUserDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleChangeDescription(e) {
    setUserDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: userName,
      about: userDescription,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="cardPopup"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <>
        <section className="popup__section">
          <input
            onChange={handleChangeName}
            value={userName}
            type="text"
            name="name"
            className="popup__text popup__name"
            placeholder="Название"
            required
            minLength={2}
            maxLength={30}
          />
          <span className="popup__input-error"></span>
        </section>
        <section className="popup__section">
          <input
            onChange={handleChangeDescription}
            value={userDescription}
            type="url"
            name="about"
            className="popup__text popup__job"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error"></span>
        </section>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
