import React from "react";
import styles from "./order_price.module.scss"

const OrderPrice = ({ listOfProducts, shipping: price }) => {
    const calctotalPrice = () => {
        return listOfProducts.reduce((total, item) => {
            if (item.discount) {
                let discount = item.price - (item.price * 10 / 100);
                total += (discount * item.quantity);
            } else {
                total += (item.price * item.quantity);
            }
            return total;
        }, 0);
    };


    const shippingPrice = price === "moscow" ? 400 : price === "pickup" ? 0 : 450;
    const deliveryPrice = calctotalPrice() > 100000 || !shippingPrice ? "бесплатно" : `${shippingPrice} р.`;
    const totalPrice =
        calctotalPrice() > 100000
            ? `${new Intl.NumberFormat().format(calctotalPrice())} р.`
            : `${new Intl.NumberFormat().format(calctotalPrice() + parseInt(shippingPrice))} р.`
    ;

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
    )
};


export default OrderPrice;


