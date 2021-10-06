import React, { Component } from "react";
import cn from "classnames";

import OrderPrice from "@components/Pages/Order/OrderForm/OrderSummary/OrderPrice/OrderPrice";
import OrderItem from "@components/Pages/Order/OrderForm/OrderSummary/OrderItem/OrderItem";
import * as cartSelectors from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";
import styles from "./order-summary.module.scss";
import SubmitButton from "@components/Partials/Form/SubmitButton/SubmitButton";

class OrderSummary extends Component {
    render() {
        const { listOfProducts, shipping, isFormValid, resetOrderForm } = this.props;
        const classList = cn(styles.order_btn, {
            [styles.not_allowed]: !isFormValid,
        });
        return (
            <section className={styles.summary}>
                <h2 className={styles.caption}>Ваш заказ</h2>
                {listOfProducts.map((item) => (
                    <OrderItem key={item.title} item={item} />
                ))}
                <OrderPrice listOfProducts={listOfProducts} shipping={shipping} />
                <SubmitButton value={"Оформить заказ"} classList={classList} disabled={!isFormValid}/>
                <button className={styles["reset-form"]} onClick={resetOrderForm}>Очистить форму</button>
            </section>
        );
    }
}


const mapStateToProps = (state) => ({ listOfProducts: cartSelectors.cartItemsSelector(state) });
export default connect(mapStateToProps)(OrderSummary);
