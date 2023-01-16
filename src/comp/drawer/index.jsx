import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../../context";
import Info from "../info";
import styles from './korzina.module.scss'
const Shapka = ({ CloseKorzina, Items, remove , opened }) => {
  const delay = (ms) => new Promise((a) => setTimeout(a, ms));
  const { setcarditmes, carditmes, setorders } = useContext(AppContext);
  const [HandleOrder, setHandleOrder] = useState(false);
  const [orderId, setorderId] = useState(0);
  const [isloading, setisloading] = useState(false);
  const totalprice = carditmes.reduce((sum, obj)=> obj.cost + sum, 0);
  const onOrderClick = async () => {
    try {
      setisloading(true);
      const { data } = await axios.post(
        "https://63a9928e7d7edb3ae611545a.mockapi.io/orders",
        { items: carditmes }
      );
      setorders(data);
      setorderId(data.id);
      setHandleOrder(true);
      setcarditmes([]);
      setisloading(false);
      for (let i = 0; i < carditmes.length; i++) {
        const item = carditmes[i];
        await axios.delete(
          "https://63a9928e7d7edb3ae611545a.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("It is impossible to complete that");
    }
  };
  return (
    <div className={`${styles.overlay} ${opened && styles.nothidden}`}>
      <div className= {styles.drawler}>
        <h2 className="mb-30 d-flex justify-between align-center">
          Basket
          <img
            onClick={CloseKorzina}
            className={styles.removeBTN}
            src="/image/krestikdo.svg"
          />
        </h2>
        {Items.length > 0 ? (
          <div className={styles.PreItems}>
            <div className = {`${styles.Items} flex`}>
              {Items.map((a) => (
                <div className={`${styles.cartItem} d-flex align-center mb-20`}>
                  <div
                    className={styles.cartItemImg}
                    style={{ backgroundImage: `url(${a.img})` }}
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{a.title}</p>
                    <b>{a.cost}</b>
                  </div>
                  <img
                    onClick={() => remove(a.id)}
                    className={styles.removeBTN}
                    src="/image/krestikdo.svg"
                  />
                </div>
              ))}
            </div>

            <div className="CartTotal">
              <ul>
                <li>
                  <span>Total</span>
                  <div></div>
                  <b>{totalprice} $</b>
                </li>
                <li>
                  <span>Tax 5%</span>
                  <div></div>
                  <b>{totalprice * 0.05} $</b>
                </li>
              </ul>
              <button
                disabled={isloading}
                onClick={onOrderClick}
                className= "btngreen"
              >
                Order zakaz
                <img src="/image/strelkabtn.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            img={HandleOrder ? "/image/Orderyes.jpg" : "/image/Box.png"}
            title={HandleOrder ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              HandleOrder
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
};

export default Shapka;
