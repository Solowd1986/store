import React from "react";
import styles from "./order-summary.module.scss";
import cn from "classnames";
import { IOrderSummary } from "@components/Pages/Order/types/Order";

import OrderPrice from "@components/Pages/Order/OrderForm/OrderSummary/OrderPrice/OrderPrice";
import OrderItem from "@components/Pages/Order/OrderForm/OrderSummary/OrderItem/OrderItem";
import SubmitButton from "@components/Pages/Order/OrderForm/FormComponents/SubmitButton/SubmitButton";

import * as cartSelectors from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";

const OrderSummary = ({ listOfProducts, shipping, isFormValid, resetOrderForm }: IOrderSummary) => {
    console.log(listOfProducts);
    
    const classList = cn(styles.order_btn, {
        [styles.not_allowed]: !isFormValid,
    });

    return (
        <section className={styles.summary}>
            <h2 className={styles.caption}>Ваш заказ</h2>
            {listOfProducts.map((item) => (
                <OrderItem key={item.title} item={item}/>
            ))}
            <OrderPrice listOfProducts={listOfProducts} shipping={shipping}/>
            <SubmitButton value={"Оформить заказ"} classList={classList} disabled={!isFormValid}/>
            <button className={styles["reset-form"]} onClick={resetOrderForm}>Очистить форму</button>
        </section>
    );

};

const mapStateToProps = (state: unknown) => ({ listOfProducts: cartSelectors.cartItemsSelector(state) });
export default connect(mapStateToProps)(OrderSummary);
