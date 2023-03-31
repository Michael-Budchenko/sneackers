import React from "react";
import AppContext from "../context";

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cart__empty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width="120px"
        height="120px"
        src={image}
        alt="Empty"
      />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="green__button">
        <img src="/img/arrow.svg" alt="Arrow" />
        Повернутися назад
      </button>
    </div>
  );
};

export default Info;
