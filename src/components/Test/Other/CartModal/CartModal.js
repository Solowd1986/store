import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./cart-modal.module.scss";

class CartModal extends Component {
    render() {
        return (
            <div className={styles.cart}>
                <h3>Ваш заказ</h3>
            <ul>
                {this.props.products.map((item, i) => (
                <li key={i}>
                          <img width={82} height={82} src={`${item.imgFullPath}`} alt="image-cart" />
                          <p>{item.title}</p>
                          <span>
                              {new Intl.NumberFormat().format(item.price)}
                              {" "}
                              р.
</span>
                        </li>
                    ))}
              </ul>
                <NavLink className={styles.link} to="/order">
                Перейти в корзину
                </NavLink>
                <span className={styles.continue}>Продолжить покупки</span>
          </div>
        );
    }
}

export default CartModal;
