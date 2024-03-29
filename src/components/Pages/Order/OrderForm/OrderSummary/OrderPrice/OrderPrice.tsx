import React from "react";
import styles from "./order_price.module.scss";
import { IOrderPrice, IProductInCart } from "@root/types/order";

const OrderPrice = ({ listOfProducts, shipping: price }: IOrderPrice): JSX.Element => {
    const calctotalPrice = (): number =>
        listOfProducts.reduce((total: number, item: IProductInCart) => {
            const { price, quantity = 1, discount = false } = item;
            if (!price) throw new Error("Database Error");

            if (discount) {
                const discount = price - (price * 10) / 100;
                total += discount * quantity;
            } else {
                total += price * quantity;
            }
            return total;
        }, 0);


    const deliveryPrice = calctotalPrice() > 100000 || !price ? "бесплатно" : `${price} р.`;

    const totalPrice =
        calctotalPrice() > 100000
            ? `${new Intl.NumberFormat().format(calctotalPrice())} р.`
            : `${new Intl.NumberFormat().format(calctotalPrice() + price)} р.`;
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
