import React from "react";
import { NavLink } from "react-router-dom";
import * as cartSelectors from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";
import styles from "./userbar.module.scss";

const Userbar = ({ amountOfProductsInCart }: { amountOfProductsInCart: number }) => {
    const userOrderCounter = amountOfProductsInCart ? (
        <span className={styles.basket_counter_bg}>
            <span className={styles.basket_counter}>{amountOfProductsInCart}</span>
        </span>
    ) : null;

    return (
        <div className={styles.header__order_wrapper}>
            <a className={styles.header__order_phone} href="tel:8800888888">
                <svg className={styles.header__order_phone_icon} viewBox="0 0 30 30" width={30} height={30}>
                    <path
                        d="M23.7 14.9c0 .4.3.8.8.8s.8-.3.8-.8c0-5.5-4.5-10-10-10-.4
                        0-.8.3-.8.8s.3.8.8.8c4.6-.1 8.4 3.7 8.4 8.4zm-9.2-5.2c0 .4.3.8.8.8 2.4 0 4.3 1.9 4.3 4.3
                        0 .4.3.8.8.8s.8-.3.8-.8c0-3.2-2.6-5.8-5.8-5.8-.6 0-.9.3-.9.7zm.7-9.5c-.4
                        0-.8.3-.8.8s.3.8.8.8c7.2
                        0 13.1 5.9 13.1 13.1 0 .4.3.8.8.8s.8-.3.8-.8C29.8 6.8 23.3.2 15.2.2zm4.2
                        17.5c-.1-.1-.3-.2-.5-.2s-.4.1-.5.2l-1.6 1.6c-.6.6-1.6.6-2.2 0l-3.7-3.4c-.6-.6-.6-1.6
                        0-2.2l1.8-1.8c.3-.3.3-.8 0-1.1L5.3 3.5c-.1-.1-.3-.2-.5-.2s-.4.1-.5.2c-.1.1-2.4 2.4-2.9 3C0
                        7.9-.2 10.8.8 13.3c2.2 5.5 9.5 12.2 15.6 15.9.5.3 1.7.6 2.9.6 1.1 0 2.7-.2 4.1-1.4 1.3-1.1
                        2.8-2.7 2.9-2.8.3-.3.3-.8 0-1l-6.9-6.9zm3 9.5c-1 .9-2.2 1-3.1 1-1.1
                        0-2-.3-2.1-.4-6.9-4.1-13.2-10.4-15-15.1-.8-2.1-.5-4.4.2-5.2l2.4-2.4 6.2
                        6.2-1.3 1.3c-1.2 1.2-1.2 3.1 0
                        4.3l3.7 3.4c1.1 1.1 3.1 1.1 4.3 0l1.1-1.1 5.8 5.8c-.5.7-1.4 1.6-2.2 2.2z"
                    />
                </svg>
                <span>+7&nbsp;(800)&nbsp;88-8888</span>
            </a>

            <NavLink to="/order" className={styles.header__cart}>
                <svg width={35} height={35} viewBox="0 0 26 26">
                    <path
                        d="M22.684 7.136a.75.75 0 00-.75-.703h-3.97V5.26C17.965 2.91 15.738
                        1 13 1S8.035 2.911 8.035 5.26v1.173h-3.97a.75.75 0 00-.749.703L2.251
                        24.203A.752.752 0 003 25h20a.752.752 0 00.749-.797L22.684 7.136zM9.535
                        5.26C9.535 3.738 11.09 2.5 13 2.5s3.465 1.238 3.465 2.76v1.173h-6.93V5.26zm-1.5
                        2.673v1.629a.75.75 0 001.5 0v-1.63h6.93v1.63a.75.75 0 001.5 0v-1.63h3.264l.65
                        10.401H4.121l.65-10.4h3.264zM3.798 23.5l.26-4.167h17.884l.26 4.167H3.798z"
                    />
                </svg>
                {userOrderCounter}
            </NavLink>
            <div className={styles.git_link_wrapper}>
                <a className={styles.portfolio_controls} href="#">
                    перейти на GitHub проекта
                </a>
            </div>
        </div>
    );
};

function mapStateToProps(state: any) {
    return {
        amountOfProductsInCart: cartSelectors.cartAmountOfProductsInCartSelector(state),
    };
}

export default connect(mapStateToProps)(Userbar);
