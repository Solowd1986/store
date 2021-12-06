import React from "react";
import styles from "./order_item.module.scss";
import { IOrderItem } from "@root/ts/types/order";

import FormInputCounter from "@components/Pages/Order/OrderForm/FormComponents/FormInputCounter/FormInputCounter";
import CancelButton from "@components/Pages/Order/OrderForm/FormComponents/CancelButton/CancelButton";

import * as cartActions from "@redux/entities/cart/actions";
import { connect } from "react-redux";

const OrderItem = ({ item, item: { img_alt: alt, img }, changeAmountOfProduct, removeItemFromCart }: IOrderItem): JSX.Element => {
    const deleteFromOrder = (): void => removeItemFromCart(item);

    const changeAmount = (quantity: number): void => {
        const { id, title } = item;
        changeAmountOfProduct(id, title, quantity);
    };

    const discount = item.discount ? item.price - (item.price * 10) / 100 : item.price;
    const price = new Intl.NumberFormat().format(discount * item.quantity) + " р.";

    return (
        <div className={styles.info}>
            <img width={82} height={82} className={styles.img_sm} src={img.md} alt={alt}/>
            <div className={styles.info_inner_wrapper}>
                <p className={styles.product_title}>
                    <span>{item.title}</span>
                    <span>({item.color || item.specifications?.color})</span>
                </p>

                <FormInputCounter
                    classList={styles.counter_wrapper}
                    maxValue={item.rest}
                    initialValue={item.quantity}
                    getProcessedAmount={changeAmount}
                />
            </div>
            <span className={styles.price__sm}>{price}</span>
            <CancelButton classList={styles.delete} handler={deleteFromOrder}/>
        </div>
    );
};

export default connect(null, cartActions)(OrderItem);
