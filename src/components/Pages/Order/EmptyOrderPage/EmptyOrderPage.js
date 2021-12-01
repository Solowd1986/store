import React from "react";
import cn from "classnames";
import styles from "./empty-order-page.module.scss";

const EmptyOrderPage = () => (
    <div className={cn("wrapper")}>
        <div className={cn(styles.empty_order)}>
            <h1>Корзина покупок</h1>
            <p>У вас нет товаров для заказа</p>
        </div>
    </div>
);

export default EmptyOrderPage;
