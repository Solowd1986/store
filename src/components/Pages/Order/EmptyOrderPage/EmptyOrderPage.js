import React from "react";
import styles from "./empty-order-page.module.scss"
import cn from "classnames";

const EmptyOrderPage = (props) => {
    return (
        <div className={cn("wrapper")}>
            <div className={cn(styles.empty_order)}>
                <h1>Корзина покупок</h1>
                <p>У вас нет товаров для заказа</p>
            </div>
        </div>
    )
};

export default EmptyOrderPage;


