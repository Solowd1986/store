import React, { PureComponent } from "react";
import styles from "./order-button.module.scss";
import cn from "classnames";
import cartIcon from "./img/cart";

import { ProductTypes, CartTypes, ProductsInCart } from "@custom-types//types";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import * as cartActions from "@redux/entities/cart/actions";
import * as cartSelector from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";

type OrderButtonProps = {
    cart: unknown,
    product: ProductTypes,
    productsInCart: ProductTypes[],
    onAddToCart: () => void,
    onDeleteFromCart: () => void,
    classList: string
};


class OrderButton extends PureComponent<OrderButtonProps> {
    constructor(props: OrderButtonProps, private delayAddingItem: ReturnType<typeof setTimeout> ) {
        super(props);
    }

    onClick = (evt: React.MouseEvent<HTMLButtonElement>, product: ProductTypes, callback: (product: ProductTypes) => void) => {
        if (!(evt.target instanceof HTMLButtonElement)) return;
        evt.target.classList.add(styles.disabled);
        evt.target.disabled = true;
        this.delayAddingItem = setTimeout(() => {
            if (!(evt.target instanceof HTMLButtonElement)) return;
            evt.target.classList.remove(styles.disabled);
            evt.target.disabled = false;
            callback(product);
        }, 1000);
    };

    componentWillUnmount():void {
        clearTimeout(this.delayAddingItem);
    }

    isProductInCart = (productsInCart: ProductTypes[], title: string, id: number) =>
        productsInCart.find((item: ProductTypes) => item.title === title && item.id === id);


    render() {
        const {
            productsInCart,
            product,
            product: { title, id, rest },
        } = this.props;

        const isProductInCart = this.isProductInCart(productsInCart, title, id);

        const spinnerIcon = <span className={styles.loader} />; //Спиннер появится при состоянии :disabled у кнопки
        const innerText = !rest ? "Нет в наличии" : !isProductInCart ? "Добавить в заказ" : "Убрать из заказа";

        const clickHandler = !isProductInCart
            ? (evt:React.MouseEvent<HTMLButtonElement>) => this.onClick(evt, product, this.props.onAddToCart)
            : (evt:React.MouseEvent<HTMLButtonElement>) => this.onClick(evt, product, this.props.onDeleteFromCart);

        const classList = cn("btn", styles.order__btn, {
            [styles.btn_grey_bg]: isProductInCart || rest === 0,
            [styles.btn_disabled]: !rest,
            [this.props.classList]: this.props.classList,
        });

        return (
            <button className={classList} onClick={clickHandler} disabled={!rest}>
                {cartIcon}
                {spinnerIcon}
                {innerText}
            </button>
        );
    }
}


const mapStateToProps = (state:unknown) => {
    return {
        productsInCart: cartSelector.cartItemsSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(cartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderButton);