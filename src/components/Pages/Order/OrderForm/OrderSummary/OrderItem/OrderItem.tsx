import React, { Component } from "react";
import styles from "./order_item.module.scss";
import { IOrderItem } from "@components/Pages/Order/types/Order";

import FormInputCounter from "@components/Pages/Order/OrderForm/FormComponents/FormInputCounter/FormInputCounter";
import CancelButton from "@components/Pages/Order/OrderForm/FormComponents/CancelButton/CancelButton";

import * as cartActions from "@redux/entities/cart/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const OrderItem = ({ item, item: { img_alt: alt, img }, changeAmountOfProduct, removeItemFromCart }: IOrderItem) => {
    const deleteFromOrder = () => removeItemFromCart(item);

    const changeAmount = (quantity: number) => {
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

const mapDispatchToProps = (dispatch: any) => (bindActionCreators(cartActions, dispatch));
export default connect(null, mapDispatchToProps)(OrderItem);
