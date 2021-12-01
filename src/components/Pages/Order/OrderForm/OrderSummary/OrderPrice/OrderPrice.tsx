import React from "react";
import styles from "./order_price.module.scss";

const OrderPrice = ({ listOfProducts, shipping: price }:any) => {
    const calctotalPrice = () =>
        listOfProducts.reduce((total:any, item:any) => {
            if (item.discount) {
                const discount = item.price - (item.price * 10) / 100;
                total += discount * item.quantity;
            } else {
                total += item.price * item.quantity;
            }
            return total;
        }, 0);

    const deliveryPrice = calctotalPrice() > 100000 || !price ? "бесплатно" : `${price} р.`;
    const totalPrice =
        calctotalPrice() > 100000
            ? `${new Intl.NumberFormat().format(calctotalPrice())} р.`
            : `${new Intl.NumberFormat().format(calctotalPrice() + parseInt(price))} р.`;
    return (
        <>
            <div className={styles.fieldset}>
                <span className={styles.item}>Стоимость доставки:</span>
                <span className={styles.item}>{deliveryPrice}</span>
            </div>

            <div className={styles.checkout}>
                <span className={styles.item}>Итого:</span>
                <span className={styles.lg}>{totalPrice}</span>
            </div>
        </>
    );
};

export default OrderPrice;
