import React from "react";
import styles from "./delivery.module.scss";

const ProductDelivery = (): JSX.Element => (
    <>
        <div className={styles.rules}>
            <h2 className={styles.shipping_title}>Доставка</h2>
            <h3 className={styles.shipping_city}>Доставка по Москве</h3>
            <p className={styles.shipping_conditions}>Самовывоз из магазина - сегодня, м. Парк Победы</p>
            <h3 className={styles.shipping_country}>Доставка по России</h3>
            <p className={styles.shipping_conditions}>
                Доставка транспортными компаниями: СДЭК, PickPoint, Boxberry, 390 р.
            </p>

            <h2 className={styles.payment_title}>Оплата</h2>
            <p className={styles.payment_options}>Наличными</p>
            <p className={styles.payment_options}>Банковской картой</p>
            <p className={styles.payment_options}>WebMoney, Яндекс.Деньги, QIWI</p>

            <h2 className={styles.shipping_title}>Доставка</h2>
            <h3 className={styles.shipping_city}>Доставка по Москве</h3>
            <p className={styles.shipping_conditions}>Самовывоз из магазина - сегодня, м. Парк Победы</p>
            <h3 className={styles.shipping_country}>Доставка по России</h3>
            <p className={styles.shipping_conditions}>
                Доставка транспортными компаниями: СДЭК, PickPoint, Boxberry, 390 р.
            </p>

            <h2 className={styles.payment_title}>Оплата</h2>
            <p className={styles.payment_options}>Наличными</p>
            <p className={styles.payment_options}>Банковской картой</p>
            <p className={styles.payment_options}>WebMoney, Яндекс.Деньги, QIWI</p>
        </div>
    </>
);

export default React.memo(ProductDelivery);
