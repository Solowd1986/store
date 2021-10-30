import React, { PureComponent } from "react";
import cn from "classnames";
import styles from "./confirm.module.scss";
import img from "./img/thanks_sir.png";

const Confirm = (props) => {
    const onClose = () => {
        Object.keys(props).forEach(property => {
            if (typeof props[property] === "function") props[property]();
        });
    };

    return (
        <div className={cn("animate__animated animate__bounceInRight", styles.checkout_modal)}>
            <span onClick={onClose} className={styles.close} />
            <img src={img} alt="image-checkout" />
            <h3>Спасибо за заказ</h3>
            <p>Наш менеджер свяжется с вами в ближайшее время</p>
        </div>
    )

};



export default Confirm;
