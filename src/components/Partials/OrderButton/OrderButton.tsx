import React, { useEffect, useRef } from "react";
import styles from "./order-button.module.scss";
import cn from "classnames";
import cartIcon from "./img/cart";

import { IProductTypes } from "@root/ts/types/_core";
import { IOrderButtonProps, IProductStatusHandler, IProductInCart } from "@root/ts/types/order-button";

import { AnyAction, bindActionCreators, Dispatch } from "redux";
import * as cartActions from "@redux/entities/cart/actions";
import * as cartSelector from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";


const OrderButton = (props: IOrderButtonProps): JSX.Element => {
    const { productsInCart = [], product, product: { title, id, rest } } = props;
    const delayAddingItem = useRef(0);

    const changeProductStatus: IProductStatusHandler = (evt, product, callback) => {
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
        return ():void => {
            window.clearTimeout(delayAddingItem.current);
        };
    }, []);

    const isProductInCart: IProductInCart = (productsInCart, title, id) =>
        productsInCart.find((item: IProductTypes) => item.title === title && item.id === id);

    const isProductInCartStatus = isProductInCart(productsInCart, title, id);

    const spinnerIcon = <span className={styles.loader}/>; //Спиннер появится при состоянии :disabled у кнопки
    const innerText = !rest ? "Нет в наличии" : !isProductInCartStatus ? "Добавить в заказ" : "Убрать из заказа";

    const processProductOrdering = !isProductInCartStatus
        ? (evt: React.MouseEvent<HTMLButtonElement>): void => changeProductStatus(evt, product, props.addItemToCart)
        : (evt: React.MouseEvent<HTMLButtonElement>): void => changeProductStatus(evt, product, props.removeItemFromCart);


    const classList = cn("btn", styles.order__btn, {
        [styles.btn_grey_bg]: isProductInCartStatus || rest === 0,
        [styles.btn_disabled]: !rest,
        [props.classList as string]: props.classList,
    });

    return (
        <button className={classList} onClick={processProductOrdering} disabled={!rest}>
            {cartIcon}
            {spinnerIcon}
            {innerText}
        </button>
    );
};

const mapStateToProps = (state: unknown): unknown => ({ productsInCart: cartSelector.cartItemsSelector(state) });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): unknown => bindActionCreators(cartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderButton);
