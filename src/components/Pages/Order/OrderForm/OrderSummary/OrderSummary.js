import React, { Component } from "react";

import OrderPrice from "@components/Pages/Order/OrderForm/OrderSummary/OrderPrice/OrderPrice";
import OrderItem from "@components/Pages/Order/OrderForm/OrderSummary/OrderItem/OrderItem";
import * as cartSelectors from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";
import styles from "./order-summary.module.scss";

class OrderSummary extends Component {
  render() {
    const { listOfProducts, shipping, isFormValid } = this.props;
    return (
      <section className={styles.summary}>
        <h2 className={styles.caption}>Ваш заказ</h2>
        {listOfProducts.map((item) => (
          <OrderItem key={item.title} item={item} />
        ))}
        <OrderPrice listOfProducts={listOfProducts} shipping={shipping} />
        <button type="submit" disabled={!isFormValid} className={styles.order_btn}>
          Оформить заказ
        </button>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    listOfProducts: cartSelectors.cartItemsSelector(state),
  };
}

export default connect(mapStateToProps)(OrderSummary);
