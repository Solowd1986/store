import React from "react";
import styles from "./order_item.module.scss";
import { IOrderItem } from "@root/ts/types/order";

import FormInputCounter from "@components/Pages/Order/OrderForm/FormComponents/FormInputCounter/FormInputCounter";
import CancelButton from "@components/Pages/Order/OrderForm/FormComponents/CancelButton/CancelButton";

import * as cartActions from "@redux/entities/cart/actions";
import { connect } from "react-redux";

const OrderItem = ({ item, changeAmountOfProduct, removeItemFromCart }: IOrderItem): JSX.Element => {

    const changeAmount = (quantity: number): void => changeAmountOfProduct(item.id, item.title, quantity);
    const deleteFromOrder = (): void => removeItemFromCart(item);

    const { price, quantity = 1, discount = false, rest } = item;
    if (!price) throw new Error("Database Error");

    const discountedPrice = discount ? price - (price * 10) / 100 : price;
    const checkout = new Intl.NumberFormat().format(discountedPrice * quantity) + " р.";

    return (
        <div className={styles.info}>
            <img width={82} height={82} className={styles.img_sm} src={item.img.md} alt={item.img_alt}/>
            <div className={styles.info_inner_wrapper}>
                <p className={styles.product_title}>
                    <span>{item.title}</span>
                    <span>({item.color || item.specifications?.color})</span>
                </p>

                <FormInputCounter
                    classList={styles.counter_wrapper}
                    maxValue={rest}
                    initialValue={quantity}
                    getProcessedAmount={changeAmount}
                />
            </div>
            <span className={styles.price__sm}>{checkout}</span>
            <CancelButton classList={styles.delete} handler={deleteFromOrder}/>
        </div>
    );
};

export default connect(null, cartActions)(OrderItem);
