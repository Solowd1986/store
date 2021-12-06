import React from "react";
import cn from "classnames";
import styles from "./confirm.module.scss";
import img from "./img/thanks_sir.png";

/**
 * Этот компонент как правило оборачивается в ModalWrapper. Но он может получать props и из других источников
 *
 * close - метод, который приходит от ModalWrapper, служит для закрытия ModalWrapper из этого компонента.
 * reset - метод, приходит от формы, служит для сброса ее state при клике.
 *
 * Поэтому в цикле вызываются все пришедшие методы.
 */
const Confirm = (props: { [key: string]: (evt?: React.SyntheticEvent) => void }):JSX.Element => {
    const onClose = (evt: React.SyntheticEvent):void => {
        Object.keys(props).forEach(propertyName => {
            if (typeof props[propertyName] === "function") props[propertyName](evt);
        });
    };

    return (
        <div className={cn("animate__animated animate__bounceInRight", styles.checkout_modal)}>
            <span onClick={onClose} className={styles.close}/>
            <img src={img} alt="image-checkout"/>
            <h3>Спасибо за заказ</h3>
            <p>Наш менеджер свяжется с вами в ближайшее время</p>
        </div>
    )
};

export default Confirm;
