import React, { PureComponent, useEffect, useRef } from "react";
import styles from "./order-button.module.scss";
import cn from "classnames";
import cartIcon from "./img/cart";

import { IOrderButtonProps, buttonClickHandler, isProductInCart } from "@components/Partials/OrderButton/types/OrderButton";
import {ProductTypes} from "@root/ts/types/types";

import { AnyAction, bindActionCreators, Dispatch } from "redux";
import * as cartActions from "@redux/entities/cart/actions";
import * as cartSelector from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";


const OrderButton = (props: IOrderButtonProps) => {
    const { productsInCart = [], product, product: { title, id, rest } } = props;
    const delayAddingItem = useRef(0);


    const buttonClickHandler:buttonClickHandler = (evt, product, callback) => {
        if (!(evt.target instanceof HTMLButtonElement)) return;
        evt.target.classList.add(styles.disabled);
        evt.target.disabled = true;

        delayAddingItem.current = window.setTimeout(() => {
            if (!(evt.target instanceof HTMLButtonElement)) return;
            evt.target.classList.remove(styles.disabled);
            evt.target.disabled = false;
            if (callback) callback(product);
        }, 1000);
    };


    useEffect(() => {
        return () => {
            window.clearTimeout(delayAddingItem.current);
        };
    }, []);

    const isProductInCart:isProductInCart = (productsInCart, title, id) =>
        productsInCart.find((item: ProductTypes) => item.title === title && item.id === id);

    const isProductInCartStatus = isProductInCart(productsInCart, title, id);

    const spinnerIcon = <span className={styles.loader}/>; //Спиннер появится при состоянии :disabled у кнопки
    const innerText = !rest ? "Нет в наличии" : !isProductInCartStatus ? "Добавить в заказ" : "Убрать из заказа";

    const clickHandler = !isProductInCartStatus
        ? (evt: React.MouseEvent<HTMLButtonElement>) => buttonClickHandler(evt, product, props.addItemToCart)
        : (evt: React.MouseEvent<HTMLButtonElement>) => buttonClickHandler(evt, product, props.removeItemFromCart);


    const classList = cn("btn", styles.order__btn, {
        [styles.btn_grey_bg]: isProductInCartStatus || rest === 0,
        [styles.btn_disabled]: !rest,
        [props.classList as string]: props.classList,
    });

    return (
        <button className={classList} onClick={clickHandler} disabled={!rest}>
            {cartIcon}
            {spinnerIcon}
            {innerText}
        </button>
    );
};


const mapStateToProps = (state: unknown) => ({ productsInCart: cartSelector.cartItemsSelector(state) });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(cartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderButton);
