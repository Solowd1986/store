import React, { Component } from 'react';
import styles from './order-info.module.scss';
import * as PropTypes from 'prop-types';

import basketEpayment from './img/basket-epayment.png';
import basketShipping from './img/basket-shipping.png';

class OrderInfo extends Component {
    static propTypes = {
        shipping: PropTypes.string,
        payment: PropTypes.string,
    };
    render() {
        const { handleChange, fields, shipping, payment } = this.props;
        return (
            <section className={styles.info}>
                {/*Delivery*/}
                <div>
                    <h2 className={styles.order_title}>1. Доставка</h2>
                    <div className={styles.cards_wrapper}>
                        <input checked={shipping === 'moscow'} onChange={handleChange} id="moscow" type="radio" name="shipping" value={'moscow'} data-delivery={true} />
                        <label htmlFor="moscow" className={styles.card}>
                            <div className={styles.card__info}>
                                <span> Доставка по Москве</span>
                                <span className={styles.card__pay}>400 р.</span>
                            </div>
                            <div className={styles.card__extra}>сегодня</div>
                        </label>

                        <input id="pickup" checked={shipping === 'pickup'} onChange={handleChange} type="radio" name="shipping" value={'pickup'} data-delivery={true} />
                        <label htmlFor="pickup" className={styles.card}>
                            <div className={styles.card__info}>
                                <span>Самовывоз</span>
                                <span className={styles.card__pay}>бесплатно</span>
                            </div>
                            <div className={styles.card__extra}>Москва, Барклая 6, стр. 5, БЦ &rdquo;Барклай Плаза&rdquo; (м. Парк Победы)</div>
                        </label>

                        <input id="russia" checked={shipping === 'russia'} onChange={handleChange} type="radio" name="shipping" value={'russia'} data-delivery={true} />
                        <label htmlFor="russia" className={styles.card}>
                            <div className={styles.card__info}>
                                <span>Доставка по России</span>
                                <span className={styles.card__pay}>450 р.</span>
                            </div>
                            <div className={styles.card__extra}>
                                <img src={basketEpayment} alt="shipping" />
                            </div>
                        </label>
                    </div>
                </div>

                {/*Customer*/}
                <div className={styles.customer}>
                    <h2 className={styles.order_title}>2. Покупатель</h2>
                    <div className={styles.form_user_data}>
                        <label className={styles.form__label}>
                            <input className={styles.form__input} onChange={handleChange} name="name" type="text" autoComplete="on" value={'имя'} placeholder="Имя" />
                            {fields.name.error && <span className={styles.field_error}>{fields.name.msg}</span>}
                        </label>

                        <label className={styles.form__label}>
                            <input
                                className={styles.form__input}
                                onChange={handleChange}
                                name="phone"
                                type="text"
                                autoComplete="on"
                                value={'+7 (021) 444-44-44'}
                                placeholder="Телефон"
                            />
                            {fields.phone.error && <span className={styles.field_error}>{fields.phone.msg}</span>}
                        </label>

                        <label className={styles.form__label}>
                            <input className={styles.form__input} onChange={handleChange} name="email" type="email" value={'sam@ya.ru'} autoComplete="on" placeholder="Email" />
                            {fields.email.error && <span className={styles.field_error}>{fields.email.msg}</span>}
                        </label>

                        <label className={`${styles.form__label} ${styles.form__label__full_width}`}>
                            <input className={styles.form__input} onChange={handleChange} name="address" type="text" autoComplete="on" placeholder="Адрес" />
                            {fields.address.error && <span className={styles.field_error}>{fields.address.msg}</span>}
                        </label>

                        <label className={`${styles.form__label} ${styles.form__label__full_width}`}>
                            <textarea className={styles.form__input} onChange={handleChange} name="comment" id="" cols="30" rows="10" placeholder="Комментарий" />
                            {fields.comment.error && <span className={styles.field_error}>{fields.comment.msg}</span>}
                        </label>
                    </div>
                </div>

                {/*Checkout*/}
                <div>
                    <h2 className={styles.order_title}>3. Оплата</h2>
                    <div className={styles.cards_wrapper}>
                        <input id="cash" checked={payment === 'cash'} onChange={handleChange} type="radio" name="payment" value="cash" data-payment={true} />
                        <label htmlFor={'cash'} className={`${styles.card}`}>
                            <div data-payment={true}>
                                <p className={styles.card__info}>
                                    <span className={styles.card__title}>Оплата наличными</span>
                                </p>
                            </div>
                        </label>

                        <input id="emoney" checked={payment === 'emoney'} onChange={handleChange} type="radio" name="payment" value="emoney" data-payment={true} />
                        <label htmlFor={'emoney'} className={styles.card}>
                            <div>
                                <p className={styles.card__info}>
                                    <span className={styles.card__title}>Электронными деньгами</span>
                                </p>
                                <span>
                                    <img src={basketShipping} alt="epayment" />
                                </span>
                            </div>
                        </label>

                        <input id="card" checked={payment === 'card'} onChange={handleChange} type="radio" name="payment" value="card" data-payment={true} />
                        <label htmlFor={'card'} className={styles.card}>
                            <div>
                                <p className={styles.card__info}>
                                    <span className={styles.card__title}>Безналичный расчет (для юр. лиц)</span>
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </section>
        );
    }
}

export default OrderInfo;
