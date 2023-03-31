import React from "react";
import Info from "../info";
import axios from "axios";
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderCompleate, setIsOrderCompleate] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://63adb1e3ceaabafcf169bbd4.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderCompleate(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://63adb1e3ceaabafcf169bbd4.mockapi.io/orders" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Не вдалось зробити заказ!");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Кошик
          <img
            onClick={onClose}
            className="remove__btn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cart__item d-flex align-center mb-20"
                >
                  <div
                    style={{
                      backgroundImage: `url(${obj.imageUrl})`,
                    }}
                    className="cart__item-img"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="remove__btn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cart__total-block">
              <ul>
                <li>
                  <span>Всього</span>
                  <div></div>
                  <b>{totalPrice} грн.</b>
                </li>
                <li>
                  <span>Податок 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} грн.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="green__button"
              >
                Оформити заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderCompleate ? "Заказ оформлений" : "Кошик порожній"}
            description={
              isOrderCompleate
                ? `Ваш заказ # ${orderId} скоро буде відправлений `
                : "Додайте хоча б одну пару кросівок, щоб зробити заказ"
            }
            image={
              isOrderCompleate
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
