import React from "react";
import styles from "@components/Pages/Order/order.module.scss";
import cn from "classnames";

import EmptyOrderPage from "./EmptyOrderPage/EmptyOrderPage";
import OrderForm from "./OrderForm/OrderForm";

import * as cartSelectors from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";

const Order = (props: { amountOfProductsInCart: number }):JSX.Element => {

    if (!props.amountOfProductsInCart) return <EmptyOrderPage/>;
    return (
        <div className={cn("container", styles.container_checkout_bg)}>
            <div className={cn("wrapper", styles.order)}>
                <div className={styles.line}>
                    <span className={styles.line_stage}>Ваша корзина</span>
                    <span className={styles.line_stage}>Оплата и доставка</span>
                    <span className={cn(styles.line_stage, styles.line_stage__unactive)}>Успешное оформление</span>
                </div>
                <OrderForm/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: unknown):unknown => ({ amountOfProductsInCart: cartSelectors.cartAmountOfGoodsSelector(state) });
export default connect(mapStateToProps)(Order);
