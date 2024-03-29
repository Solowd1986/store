import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar-list.module.scss";

const NavbarList = (): JSX.Element => (
    <ul className={styles.header__nav_list}>
        {/* Смартфоны */}
        <li className={styles.header__nav_item}>
            <NavLink
                to="/category/phones"
                className={styles.header__nav_link}
                activeClassName={styles.link_active_class} exact>
                Смартфоны
                <span className={styles.header__nav_link__arrow} />
            </NavLink>

            <ul className={`${styles.header__inner_list} animate__animated animate__fadeIn animate__fast`}>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/phones" className={styles.header__inner_link}>
                        <svg viewBox="0 0 1000 1000" width={32} height={32}>
                            <circle cx={687.4} cy={909.9} r={4} />
                            <path d="M245 990h510c6 0 10.9-4.9 10.9-10.9V20.9c0-6-4.8-10.9-10.9-10.9H245c-6 0-10.9
                            4.9-10.9 10.9v958.2c0 6 4.9 10.9 10.9 10.9zm115.1-76.3h-9.7l1
                            1.8c1.2 2.2.4 4.9-1.8 6.1-.7.4-1.4.5-2.2.5-1.6
                            0-3.2-.9-4-2.4l-4.4-8.2c-.7-1.4-.7-3.1.1-4.5l5.6-9.3c1.3-2.1
                            4.1-2.8 6.2-1.5 2.1 1.3 2.8 4.1 1.5 6.2l-1.2 2.1h9c2.5 0
                            4.5 2 4.5 4.5-.1 2.7-2.1 4.7-4.6 4.7zm155.5
                            9.6l-10.7-2.6v-9h10.7v11.6zm0-13.4h-10.7v-9.7l10.7-1.9v11.6zm17.8
                            16.7l-15.6-4.1v-10.7h15.6v14.8zm0-16.7h-15.6v-11.6l15.6-2.2v13.8zm154
                            13c-2.2 0-4.1-.7-5.9-1.6l-5.6 4.4c-.8.7-1.8 1-2.8
                            1-1.3 0-2.7-.6-3.6-1.7-1.5-2-1.2-4.8.8-6.3l5-3.9c-.6-1.5-1-3.1-1-4.8 0-7.2
                            5.8-13 13-13s13 5.8 13 13c.1 7.1-5.7 12.9-12.9 12.9zM363.2 45.5c5.7 0 10.4
                            4.6 10.4 10.4 0 5.7-4.6 10.4-10.4 10.4-5.8 0-10.4-4.6-10.4-10.4 0-5.8 4.6-10.4
                            10.4-10.4zm-90.9 58.9h455.5v754.9H272.3V104.4z" />
                        </svg>

                        <span>OnePlus 7T Pro</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/phones" className={styles.header__inner_link}>
                        <svg viewBox="0 0 1000 1000" width={32} height={32}>
                            <path d="M298.93 13.65C281.04 19.81 266.42 35 261.81 52.5c-1.35 4.62-1.73 164.65-1.54 452.01l.58 445.09 4.42 8.08c6.73 12.69 15.2 21.16 26.93 26.93l10.96 5.39h394.3l10.96-5.39c11.73-5.77 20.2-14.23 26.93-26.93l4.42-8.08V51.35L734 40.96c-7.12-12.69-17.7-22.12-31.16-27.12C692.66 10 688.23 10 500.7 10c-179.08.19-192.35.38-201.77 3.65zm414.89 486.83v359.69h-427V140.79h427v359.69zm-196.2 390.85c11.35 7.88 14.43 13.85 14.43 28.28 0 11.16-.77 14.04-5.19 19.81-7.31 9.62-16.93 13.66-29.62 12.69-31.54-2.69-41.16-42.7-14.43-60.59 9.04-6.16 25.96-6.16 34.81-.19z" />
                        </svg>
                        <span>OnePlus 7T</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/phones" className={styles.header__inner_link}>
                        <svg viewBox="0 0 1000 1000" width={32} height={32}>
                            <path d="M439.8 35.1h120l14-25.1H423.5z" />
                            <path d="M728 10H594.5c0 1.6-.3 3.2-1.1 4.7L574 49.5c-1.7 3.1-4.9 5-8.5 5h-131c-3.3 0-6.3-1.7-8.1-4.4l-22.6-34.8c-1.1-1.6-1.4-3.5-1.4-5.3H272c-32.1 0-58.2 26.1-58.2 58.2v863.6c0 32.2 26.1 58.2 58.2 58.2h456c32.1 0 58.2-26.1 58.2-58.2V68.2C786.3 36 760.2 10 728 10zm-97.8 34.8h22.6c6.2 0 11.3 5.1 11.3 11.3s-5.1 11.3-11.3 11.3h-22.6c-6.2 0-11.3-5.1-11.3-11.3 0-6.3 5.1-11.3 11.3-11.3zM348.5 934.6c0 2.7-2.2 4.9-4.9 4.9h-25.1c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h20.2v-7.3h-21.9v1.2c0 .9-.4 1.7-1.2 2.1-.8.4-1.7.4-2.4 0l-10.5-6.1c-.8-.4-1.2-1.2-1.2-2.1 0-.9.5-1.7 1.2-2.1l10.5-6.1c.8-.4 1.7-.4 2.4 0 .8.4 1.2 1.2 1.2 2.1v1.2h26.7c2.7 0 4.9 2.2 4.9 4.9v17.1zm204.9 7.7H440.2c-10.3 0-18.6-8.3-18.6-18.6s8.3-18.6 18.6-18.6h113.2c10.3 0 18.6 8.3 18.6 18.6s-8.4 18.6-18.6 18.6zm135.5-10.1h-40.4c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4h40.4c1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4zm0-9.7h-40.4c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4h40.4c1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4zm0-9.7h-40.4c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4h40.4c1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4zm61-38.4H242.1V127.2h507.8v747.2z" />
                        </svg>
                        <span>OnePlus 7</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/phones" className={styles.header__inner_link}>
                        <svg viewBox="0 0 1000 1000" width={32} height={32}>
                            <path d="M721.5 10H278.6c-39 0-70.7 31.7-70.7 70.7v838.7c0 39 31.7 70.7 70.7 70.7h442.9c39 0 70.7-31.7 70.7-70.7V80.7c-.1-39-31.8-70.7-70.7-70.7zM569 38.3l-7.5 13.4H441.3l-8.7-13.4H569zm194.9 881c0 23.4-19 42.4-42.4 42.4H278.6c-23.4 0-42.4-19-42.4-42.4V80.7c0-23.4 19-42.4 42.4-42.4h139.2l15 23.1c1.2 1.8 3.1 2.9 5.3 2.9h127.2c2.3 0 4.4-1.2 5.5-3.2l12.7-22.7h138.1c23.4 0 42.4 19 42.4 42.4l-.1 838.5z" />
                            <path d="M746.6 131.7H253.4c-3.5 0-6.3 2.8-6.3 6.3v725.6c0 3.5 2.8 6.3 6.3 6.3h493.1c3.5 0 6.3-2.8 6.3-6.3V138c0-3.5-2.8-6.3-6.2-6.3zm-6.3 725.6H259.7V144.2h480.6v713.1zM628.6 79.9h22c6.1 0 11-4.9 11-11s-4.9-11-11-11h-22c-6.1 0-11 4.9-11 11s4.9 11 11 11zM555 889.3H445c-12.2 0-22.2 10-22.2 22.2s10 22.2 22.2 22.2h110c12.3 0 22.2-10 22.2-22.2 0-12.3-10-22.2-22.2-22.2zm0 36.1H445c-7.7 0-13.9-6.2-13.9-13.9s6.2-13.9 13.9-13.9h110c7.7 0 13.9 6.2 13.9 13.9s-6.3 13.9-13.9 13.9zm-186.8-22.8h-20.5v-6.3l-18 10.4 18 10.4v-6.2H364v8.1h-20.2c-2.3 0-4.2 1.9-4.2 4.2 0 2.3 1.9 4.2 4.2 4.2h24.3c2.3 0 4.2-1.9 4.2-4.2v-16.5c.1-2.2-1.8-4.1-4.1-4.1zm297.7-7h-39.3c-2.3 0-4.2 1.9-4.2 4.2 0 2.3 1.9 4.2 4.2 4.2h39.3c2.3 0 4.2-1.9 4.2-4.2 0-2.4-1.9-4.2-4.2-4.2zm0 9.4h-39.3c-2.3 0-4.2 1.9-4.2 4.2 0 2.3 1.9 4.2 4.2 4.2h39.3c2.3 0 4.2-1.9 4.2-4.2 0-2.4-1.9-4.2-4.2-4.2zm0 9.4h-39.3c-2.3 0-4.2 1.9-4.2 4.2 0 2.3 1.9 4.2 4.2 4.2h39.3c2.3 0 4.2-1.9 4.2-4.2 0-2.3-1.9-4.2-4.2-4.2z" />
                        </svg>
                        <span> OnePlus 6T Pro</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/phones" className={styles.header__inner_link}>
                        <svg viewBox="0 0 1000 1000" width={32} height={32}>
                            <path d="M748.1 10H251.9c-13.1 0-23.8 10.7-23.8 23.8v932.4c0 13.1 10.7 23.8 23.8 23.8h496.2c13.1 0 23.8-10.7 23.8-23.8V33.8c0-13.1-10.7-23.8-23.8-23.8zm-2.6 26.4v927.2h-491V36.4h491z" />
                            <path d="M278.4 856.3h443.2c3.6 0 6.6-3 6.6-6.6V115c0-3.6-3-6.6-6.6-6.6H278.4c-3.6 0-6.6 3-6.6 6.6v734.6c0 3.7 2.9 6.7 6.6 6.7zm6.6-734.7h430V843H285V121.6zm66.2 760.9h-12.6l3.2-5.4c.6-1.1.3-2.4-.8-3-1.1-.6-2.4-.3-3 .8l-5.4 9c-.4.7-.4 1.5-.1 2.2l4.3 7.9c.4.7 1.1 1.1 1.9 1.1.4 0 .7-.1 1-.3 1.1-.6 1.5-1.9.9-3l-2.7-5H351c1.2 0 2.2-1 2.2-2.2.2-1.1-.8-2.1-2-2.1zm140.9 2.9h10.4v-11.3l-10.4 1.9zm0 10.6l10.4 2.5v-11.3h-10.4zm12.6-10.6h15.2V872l-15.2 2.1zm0 12.3l15.2 3.9v-14.4h-15.2zm165-22.8c-5.8 0-10.5 4.7-10.5 10.5 0 1.9.7 3.6 1.6 5.2l-6.4 5c-.9.8-1.1 2.1-.4 3.1.4.5 1.1.8 1.7.8.5 0 .9-.2 1.4-.5l6.7-5.2c1.7 1.2 3.7 2.1 5.9 2.1 5.8 0 10.5-4.7 10.5-10.5s-4.7-10.5-10.5-10.5zm0 16.6c-3.3 0-6.1-2.7-6.1-6.1 0-3.3 2.7-6.1 6.1-6.1 3.3 0 6.1 2.7 6.1 6.1 0 3.4-2.7 6.1-6.1 6.1z" />
                            <circle cx={366.8} cy={67.8} r={10.1} />
                        </svg>
                        <span> OnePlus 6</span>
                    </NavLink>
                </li>
            </ul>
        </li>
        {/* Аксессуары */}
        <li className={styles.header__nav_item}>
            <NavLink
                to="/category/accessoires"
                className={styles.header__nav_link}
                activeClassName={styles.link_active_class} exact>
                Аксессуары
                <span className={styles.header__nav_link__arrow} />
            </NavLink>
            <ul className={`${styles.header__inner_list} animate__animated animate__fadeIn animate__fast`}>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/accessoires" className={styles.header__inner_link}>
                        <svg viewBox="0 0 1000 1000" width={32} height={32}>
                            <path d="M491.9 253.4h25.5c23.9 0 43.3-19.4 43.3-43.3v-25.5c0-23.8-19.4-43.3-43.3-43.3h-25.5c-23.9 0-43.3 19.4-43.3 43.3v25.5c0 23.9 19.4 43.3 43.3 43.3zm-31-68.8c0-17 13.9-31 30.9-31h25.5c17.1 0 30.9 13.9 30.9 31v25.5c0 17.1-13.9 31-30.9 31h-25.5c-17.1 0-30.9-13.9-30.9-31v-25.5zm-50.3 35.2h8.3c10.1 0 18.2-8.2 18.2-18.2v-8.3c0-10-8.2-18.2-18.2-18.2h-8.3c-10.1 0-18.2 8.2-18.2 18.2v8.3c0 10 8.2 18.2 18.2 18.2zm-5.9-26.6c0-3.2 2.7-5.9 5.9-5.9h8.3c3.3 0 5.9 2.7 5.9 5.9v8.3c0 3.3-2.7 5.9-5.9 5.9h-8.3c-3.3 0-5.9-2.7-5.9-5.9v-8.3z" />
                            <circle cx={414.8} cy={238.6} r={4.6} />
                            <path d="M662.3 990c51.3 0 109.7-60.9 109.7-114.3V124.3C772 70.9 713.6 10 662.3 10H346.9c-51.3 0-109.7 60.9-109.7 114.3v52.4c0 9.1-5.5 20.7-7.6 28.4-1 3.8-1.6 8.5-1.6 14.4v11.3c0 5.9.6 10.6 1.6 14.4 2.1 7.8 7.6 19.4 7.6 28.4v9.7c0 9.1-5.5 20.7-7.6 28.4-1 3.8-1.6 8.5-1.6 14.4v10.1c0 5.9.6 10.7 1.6 14.4 2.1 7.8 7.6 19.4 7.6 28.4v496.5c0 53.4 58.4 114.3 109.7 114.3l315.4.2zM252.6 324c.1-1.3 4-3.2 6.7-6.7 1.6-2.1 2.5-4.7 2.5-7.4v-62.6c0-2.8-.9-5.3-2.5-7.4-2.7-3.5-6.6-5.4-6.7-6.7 0-.7-.1-1.5-.1-2.3v-11.3c0-.8 0-1.6.1-2.3.1-1.3 4-3.2 6.7-6.7 1.6-2.1 2.5-4.7 2.5-7.5v-78.8c0-41.1 46.1-89.7 85.1-89.7h315.4c39 0 85.1 48.7 85.1 89.7v751.3c0 41.1-46.1 89.7-85.1 89.7H346.9c-39 0-85.1-48.7-85.1-89.7V352.7c0-2.8-.9-5.3-2.5-7.4-2.7-3.5-6.6-5.4-6.7-6.7 0-.7-.1-1.5-.1-2.3v-10c.1-.9.1-1.6.1-2.3z" />
                            <path d="M367 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm-11.9-15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={367} cy={902.3} r={3.6} />
                            <path d="M380.7 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={380.7} cy={902.3} r={3.6} />
                            <path d="M394.3 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={394.3} cy={902.3} r={3.6} />
                            <path d="M407.9 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={407.9} cy={902.3} r={3.6} />
                            <path d="M421.5 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6z" />
                            <circle cx={421.5} cy={902.3} r={3.6} />
                            <circle cx={435.2} cy={857.1} r={3.6} />
                            <path d="M435.2 868.6c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={435.2} cy={902.3} r={3.6} />
                            <path d="M448.8 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={448.8} cy={902.3} r={3.6} />
                            <path d="M462.4 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={462.4} cy={902.3} r={3.6} />
                            <path d="M476 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6z" />
                            <circle cx={476} cy={902.3} r={3.6} />
                            <path d="M489.7 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={489.7} cy={902.3} r={3.6} />
                            <path d="M503.3 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={503.3} cy={902.3} r={3.6} />
                            <path d="M516.9 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z" />
                            <circle cx={516.9} cy={902.3} r={3.6} />
                            <path d="M530.5 853.5c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm13.7-45.3c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm13.6-45.3c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm13.6-45.3c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm13.6-45.3c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.7-3.6 3.6-3.6zm13.7-30.2c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm13.6-30.2c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm13.6-30.2c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm13.6-30.2c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6zm13.6-15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm0 15.1c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6c.1-2 1.7-3.6 3.6-3.6zm-68.5 22.2h53.8c2.6 0 4.6-1.6 4.6-3.6s-2.1-3.6-4.6-3.6h-53.8c-2.6 0-4.6 1.6-4.6 3.6s2.1 3.6 4.6 3.6z" />
                        </svg>
                        <span>Чехлы & Защита</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/accessoires" className={styles.header__inner_link}>
                        <svg viewBox="0 0 297.028 297.028" width={32} height={32}>
                            <path
                                d="M243.849 44.619h-2.332V19.565c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v25.054h-10.332V19.565a7.5 7.5 0 00-7.5-7.5 7.5 7.5 0 00-7.5 7.5v25.054h-2.332c-7.444 0-13.5 6.056-13.5 13.5v35.617c0 7.444 6.056 13.5 13.5 13.5h14.998v182.292a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5V107.236h14.998c7.444 0 13.5-6.056 13.5-13.5V58.119c0-7.444-6.055-13.5-13.5-13.5zm-1.5 47.617h-41.996V59.619h41.996v32.617zm-91.931-56.265h-8.186V13.5c0-7.444-6.056-13.5-13.5-13.5H83.734c-7.444 0-13.5 6.056-13.5 13.5v22.471H62.05c-12.336 0-22.372 10.036-22.372 22.371v216.315c0 12.335 10.036 22.371 22.372 22.371h88.367c12.334 0 22.37-10.036 22.37-22.371V58.342c.001-12.336-10.035-22.371-22.369-22.371zM85.234 15h41.997v20.971H85.234V15zM62.051 50.971h88.367c4.063 0 7.37 3.307 7.37 7.371v92.93H54.679v-92.93c0-4.065 3.307-7.371 7.372-7.371zm88.367 231.057H62.051c-4.064 0-7.372-3.307-7.372-7.371V166.271h103.108v108.386c0 4.065-3.306 7.371-7.369 7.371z"
                                fill="#000002"
                            />
                        </svg>
                        <span>Зарядные кабели</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/accessoires" className={styles.header__inner_link}>
                        <svg viewBox="0 0 512 512" width={32} height={32}>
                            <path d="M196.267 409.6h-34.133c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h34.133c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533zm-85.334-85.333H93.867a8.536 8.536 0 00-8.533 8.533 8.536 8.536 0 008.533 8.533h8.533v153.6H85.333v-128c0-4.71-3.823-8.533-8.533-8.533s-8.533 3.823-8.533 8.533v128h-8.533c-23.526 0-42.667-19.14-42.667-42.667V384c0-23.526 19.14-42.667 42.667-42.667a8.536 8.536 0 008.533-8.533v-68.267c0-4.71-3.823-8.533-8.533-8.533s-8.533 3.823-8.533 8.533v60.339C22.289 329.028 0 353.954 0 384v68.267C0 485.205 26.795 512 59.733 512h51.2a8.536 8.536 0 008.533-8.533V332.8c.001-4.71-3.822-8.533-8.533-8.533zM358.4 418.133a8.536 8.536 0 00-8.533-8.533h-34.133c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h34.133c4.71.001 8.533-3.822 8.533-8.533zm-173.867 52.344l-29.568-17.067c-4.096-2.372-9.301-.956-11.657 3.123-2.355 4.087-.956 9.301 3.123 11.656L176 485.257a8.515 8.515 0 004.258 1.143 8.516 8.516 0 007.398-4.267 8.533 8.533 0 00-3.123-11.656zM150.707 384a8.49 8.49 0 004.258-1.143l29.568-17.067c4.079-2.355 5.478-7.569 3.123-11.657a8.522 8.522 0 00-11.657-3.123l-29.568 17.067c-4.079 2.355-5.478 7.569-3.123 11.657a8.521 8.521 0 007.399 4.266zm293.026-145.067H460.8c8.277 0 17.067-5.982 17.067-17.067C477.867 99.533 378.334 0 256 0S34.133 99.533 34.133 221.867c0 8.277 5.982 17.067 17.067 17.067h17.067c8.277 0 17.067-5.982 17.067-17.067C85.333 127.761 161.894 51.2 256 51.2s170.667 76.561 170.667 170.667c0 8.277 5.982 17.066 17.066 17.066zM256 34.133c-103.518 0-187.733 84.215-187.733 187.733H51.2c0-112.922 91.878-204.8 204.8-204.8s204.8 91.878 204.561 204.8h-16.828c0-103.517-84.215-187.733-187.733-187.733zM357.035 453.41l-29.568 17.067c-4.079 2.355-5.478 7.569-3.123 11.657a8.52 8.52 0 007.398 4.267c1.442 0 2.91-.367 4.258-1.143l29.568-17.067c4.079-2.355 5.478-7.569 3.123-11.656-2.363-4.081-7.569-5.497-11.656-3.125zM460.8 324.873v-60.339a8.536 8.536 0 00-8.533-8.533 8.536 8.536 0 00-8.533 8.533V332.8a8.536 8.536 0 008.533 8.533c23.526 0 42.667 19.14 42.667 42.667v68.267c0 23.526-19.14 42.667-42.667 42.667h-8.533v-128a8.536 8.536 0 00-8.533-8.533 8.536 8.536 0 00-8.533 8.533v128H409.6v-153.6h8.533a8.536 8.536 0 008.533-8.533 8.536 8.536 0 00-8.533-8.533h-17.067a8.536 8.536 0 00-8.533 8.533v170.667a8.536 8.536 0 008.533 8.533h51.2C485.205 512 512 485.205 512 452.267V384c0-30.046-22.289-54.972-51.2-59.127zm-95.232 43.204L336 351.01a8.517 8.517 0 00-11.656 3.123 8.535 8.535 0 003.123 11.657l29.568 17.067a8.48 8.48 0 004.258 1.143 8.527 8.527 0 007.398-4.267c2.355-4.087.956-9.301-3.123-11.656z" />
                        </svg>
                        <span>Аудио устройства</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/accessoires" className={styles.header__inner_link}>
                        <svg viewBox="0 0 60 60" width={32} height={32}>
                            <path d="M47.521 25H46v-9.706A5.3 5.3 0 0040.706 10h-.127l-.685-1.193a7.281 7.281 0 01-.981-3.613C38.913 2.33 36.306 0 33.101 0H22.899c-3.205 0-5.813 2.33-5.813 5.193 0 1.245-.34 2.494-.981 3.613L15.421 10h-.127A5.3 5.3 0 0010 15.294v29.412A5.3 5.3 0 0015.294 50h.127l.685 1.193a7.281 7.281 0 01.981 3.613c0 2.863 2.607 5.193 5.813 5.193h10.201c3.205 0 5.813-2.33 5.813-5.193 0-1.245.34-2.494.981-3.613L40.579 50h.127A5.3 5.3 0 0046 44.706V35h1.521A2.482 2.482 0 0050 32.521v-5.043A2.481 2.481 0 0047.521 25zM44 44.706A3.298 3.298 0 0140.706 48H15.294A3.298 3.298 0 0112 44.706V15.294A3.298 3.298 0 0115.294 12h25.412A3.298 3.298 0 0144 15.294v29.412z" />
                            <path d="M16 21a.997.997 0 00.707-.293l4-4a.999.999 0 10-1.414-1.414l-4 4A.999.999 0 0016 21zm0 5a.997.997 0 00.707-.293l2-2a.999.999 0 10-1.414-1.414l-2 2A.999.999 0 0016 26zm3.29-5.71c-.181.189-.29.439-.29.71 0 .27.109.52.29.7.189.19.439.3.71.3.27 0 .52-.11.71-.29.18-.19.29-.45.29-.71s-.11-.521-.29-.71c-.38-.37-1.05-.37-1.42 0zm2.003-.583a.997.997 0 001.414 0l3-3a.999.999 0 10-1.414-1.414l-3 3a.999.999 0 000 1.414zm3 .586l-9 9a.999.999 0 101.414 1.414l9-9a.999.999 0 10-1.414-1.414zM26.3 18.29a.977.977 0 00-.3.71c0 .27.109.52.29.71.189.18.45.29.71.29s.52-.11.71-.29c.18-.19.29-.45.29-.71s-.11-.521-.29-.71c-.38-.37-1.05-.37-1.41 0zm2.993-2.997l-1 1a.999.999 0 101.414 1.414l1-1a.999.999 0 10-1.414-1.414z" />
                        </svg>
                        <span>Умные часы</span>
                    </NavLink>
                </li>
            </ul>
        </li>

        {/* Гаджеты */}
        <li className={styles.header__nav_item}>
            <NavLink
                to="/category/gadgets"
                className={styles.header__nav_link}
                activeClassName={styles.link_active_class} exact>
                Гаджеты
                <span className={styles.header__nav_link__arrow} />
            </NavLink>
            <ul className={`${styles.header__inner_list} animate__animated animate__fadeIn animate__fast`}>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/gadgets" className={styles.header__inner_link}>
                        <svg viewBox="0 0 1000 1000" width={32} height={32}>
                            <path d="M445.08 111.12c-72.91 4.03-152.15 21.87-218.72
                                    49.5-47.39 19.76-110.71 56.79-150.61 88.26-22.06 17.46-58.71
                                    50.46-62.55 56.41-4.41 6.71-4.22 18.61.38 23.79 4.99 5.56 14.2
                                    9.02 20.53 7.87 3.07-.58 13.05-8.25 24.94-19.38C159.2 223.93 283.34
                                    167.72 420.9 154.1c29.16-2.88 90.18-2.3 122.41.96 133.15 14.01 259.4
                                    71.95 354.95 162.89 9.59 9.21 19.95 17.46 23.02 18.23 13.05
                                    3.65 25.52-5.76 25.52-19.38 0-6.91-1.34-9.21-12.85-21.1-16.31-16.88-51.42-46.43-76.36-64.27-91.14-65.05-201.66-106.5-312.75-117.43-22.44-2.31-80.39-3.84-99.76-2.88z" />
                            <path d="M429.73 276.89c-62.16 6.91-112.82 21.49-166.92 47.97-47.2 23.22-89.6 52.57-123.18 85.38-13.05 12.66-14.01 14.2-14.01 21.68 0 6.14 1.34 9.4 5.56 14.2 4.8 5.37 6.91 6.33 14.2 6.33 7.87 0 9.59-.96 25.52-15.54 37.61-33.96 65.81-53.34 108.59-74.63 165.77-82.31 367.03-53.53 503.25 71.76 9.59 8.83 19.38 16.69 22.06 17.84 15.73 5.95 31.66-11.13 24.94-27.25-4.03-9.98-48.35-47.58-82.69-70.03-26.29-17.46-67.92-38.37-97.66-49.31-27.44-10.17-70.41-21.11-99.77-25.52-23.58-3.65-97.06-5.38-119.89-2.88z" />
                            <path d="M441.62 439.97c-73.29 9.21-147.92 45.09-191.86 91.71-11.7 12.66-12.28 20.53-2.49 30.31 5.18 5.18 8.06 6.52 14.2 6.52 6.71 0 9.21-1.53 19.76-11.13 58.33-52.76 121.83-77.71 197.43-77.71 75.02 0 135.45 23.6 194.93 75.98 12.47 11.13 15.54 12.85 21.68 12.85 14.39 0 24.17-14.2 18.8-27.24-5.76-13.99-49.5-47.76-85.77-66.56-45.66-23.6-88.45-34.34-141.02-35.69-17.84-.38-38.56 0-45.66.96zm267.84 167.5l-86.91 86.72v9.21c0 7.67.96 10.36 5.56 14.96 5.18 5.18 6.72 5.56 20.15 5.56h14.58v75.4c0 83.46-.38 81.54 12.66 86.91 9.21 3.84 88.26 3.84 97.66 0 11.9-4.99 12.47-8.25 12.47-67.34v-52.76h40.3v51.8c0 58.9.77 63.31 12.28 68.11 9.59 4.03 88.45 4.22 97.85.19 13.05-5.37 12.66-3.45 12.66-86.91v-75.4h14.01c15.92 0 21.3-2.69 25.52-12.47 5.18-12.85 4.8-13.24-87.11-105.14l-85.96-85.76h-18.8l-86.92 86.92zm-246.54-4.42c-40.29 7.1-73.29 36.65-83.08 73.87-3.84 14.97-3.65 41.64.19 54.87 18.42 61.97 85.76 91.71 144.28 63.7 14.39-6.91 38.37-30.51 45.09-44.71 32.23-67.34-10.74-142.94-84.23-148.5-7.28-.38-17.26-.18-22.25.77z" />
                        </svg>
                        <span>Умный дом</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/gadgets" className={styles.header__inner_link}>
                        <svg viewBox="0 0 24 24" width={32} height={32}>
                            <path d="M2 7h5V5H1c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h8v-2H2V7zm21
                                    0h-1V6c0-.6-.4-1-1-1h-6v2h5v2h2v6h-2v2h-7v2h8c.6 0 1-.4 1-1v-1h1c.6 0
                                    1-.4 1-1V8c0-.6-.4-1-1-1z" />
                            <path d="M16 9h-2V6c0-.6-.4-1-1-1s-1 .4-1 1v3h-2V6c0-.6-.4-1-1-1s-1 .4-1
                                    1v3H6c0 2.4 1.7 4.4 4 4.9V18c0 .6.4 1 1 1s1-.4 1-1v-4.1c2.3-.5 4-2.5 4-4.9zm-5
                                    4c-1.9 0-3.4-1.3-3.9-3h7.7c-.4 1.7-1.9 3-3.8 3z" />
                        </svg>
                        <span>Аккумуляторы</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/gadgets" className={styles.header__inner_link}>
                        <svg viewBox="0 0 50 50" width={32} height={32}>
                            <path fill="none" d="M0 0h50v50H0z" />
                            <path
                                d="M25 1C11.767 1 1 11.766 1 25s10.767 24 24 24 24-10.766
                                        24-24S38.233 1 25 1zm0 43C14.524 44 6 35.477 6 25S14.524 6
                                        25 6s18.999 8.523 18.999 19S35.476 44 25 44z"
                                fill="none"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={10}
                                strokeWidth={2.111}
                            />
                            <path
                                d="M43.444 22c-8 0-11.841-5-18.444-5-6.613 0-9.944
                                        5-18.444 5M29 42v-8c0-2.684 2.26-5 5-5h9.056m-36.5
                                        0H16c2.885 0 5 2.23 5 5v8"
                                fill="none"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={10}
                                strokeWidth={2}
                            />
                            <circle
                                cx={25}
                                cy={25}
                                fill="none"
                                r={4}
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={10}
                                strokeWidth={2}
                            />
                        </svg>
                        <span>Все для авто</span>
                    </NavLink>
                </li>
                <li className={styles.header__inner_item}>
                    <NavLink to="/category/gadgets" className={styles.header__inner_link}>
                        <svg viewBox="0 -8 512 511" width={32} height={32}>
                            <path d="M56.453 261.332a8.535 8.535 0 00-6.695-10.039c-4.418-.879-8.762
                                    1.82-9.918 6.172a219.842 219.842 0 00.058 100.387 8.539 8.539 0 0010.243 6.375 8.532
                                    8.532 0 006.37-10.243 202.936 202.936 0 01-.058-92.652zm-36.574-28.348a8.534 8.534 0
                                    00-10.512 5.914 256.442 256.442 0 00-2.722 126.676 8.535 8.535 0 008.304 6.606c.656 0
                                    1.309-.075 1.946-.23 4.585-1.071 7.437-5.653 6.375-10.243a239.238 239.238 0
                                    012.558-118.21c1.266-4.54-1.39-9.243-5.933-10.509-.004 0-.008 0-.016-.004zm442.047
                                    18.11a8.535 8.535 0 00-6.375 10.238 202.845 202.845 0 01-.059 92.656 8.535 8.535 0 008.32
                                    10.461 8.53 8.53 0 008.293-6.597 219.771 219.771 0 00.063-100.383 8.535 8.535 0
                                    00-10.242-6.375zm40.687-12.196a8.532 8.532 0 00-10.695-5.585 8.53 8.53 0 00-5.73
                                    10.187 239.282 239.282 0 012.558 118.21 8.535 8.535 0 006.375 10.24c.637.155 1.29.23
                                    1.945.23a8.539 8.539 0 008.305-6.606 256.445 256.445 0 00-2.758-126.676zm-65.621-27.8c6.668-6.66
                                    6.676-17.47.016-24.137-.008-.004-.012-.008-.016-.012l-60.285-60.289c-6.68-6.644-17.473-6.644-24.152
                                    0l-12.926 12.887a192.045 192.045 0 00-167.25 0l-12.93-12.887c-6.676-6.644-17.469-6.644-24.148 0l-60.285
                                    60.29c-6.672 6.66-6.676 17.464-.016 24.136.004.004.008.008.016.012l12.882 12.925c-46.152 92.844-8.304
                                    205.52 84.536 251.676 92.843 46.153 205.52 8.305 251.675-84.535a187.745 187.745 0 0019.625-83.512 189.064
                                    189.064 0 00-19.625-83.625zm-72.36-72.407l60.329 60.332-9.473 9.438c-.254-.418-.547-.805-.8-1.223-.583-.902-1.196-1.781-1.786-2.675a182.993 182.993 0 00-13.398-17.93c-.75-.856-1.484-1.793-2.25-2.672a189.923 189.923 0 00-17.52-17.543c-.906-.793-1.843-1.555-2.765-2.332a218.47 218.47 0 00-6.93-5.578 116.635 116.635 0 00-3.344-2.512 261.323 261.323 0 00-7.289-5.05c-1.039-.692-2.062-1.4-3.12-2.075-.36-.226-.704-.476-1.06-.7zm-217.25 0l9.43 9.442c-.417.254-.8.543-1.218.8-.906.583-1.785 1.196-2.68 1.786a182.991 182.991 0 00-10.855 7.703 191.663 191.663 0 00-7.075 5.691c-.851.754-1.793 1.489-2.672 2.254a189.337 189.337 0 00-17.542 17.555c-.793.902-1.551 1.84-2.329 2.762a213.228 213.228 0 00-5.582 6.93 105.131 105.131 0 00-2.507 3.347 245.408 245.408 0 00-5.051 7.285c-.692 1.043-1.403 2.066-2.074 3.125-.23.36-.48.7-.7 1.059l-9.48-9.407zm108.622 339.625c-94.36-.12-170.758-76.71-170.637-171.066.035-28.227 7.063-56 20.453-80.844a170.38 170.38 0 016.34-10.699c48.281-75.254 146.367-100.633 225.086-58.242a171.6 171.6 0 0110.703 6.34c79.41 50.836 102.574 156.422 51.739 235.832-31.364 48.992-85.516 78.644-143.684 78.68zm0 0" />
                            <path d="M256.004 145.52c-89.543 0-162.133 72.59-162.133 162.132 0 89.543 72.59 162.13 162.133 162.13s162.129-72.587 162.129-162.13c-.098-89.504-72.63-162.035-162.13-162.132zm0 307.195c-80.117 0-145.067-64.945-145.067-145.063 0-80.117 64.95-145.066 145.067-145.066s145.062 64.95 145.062 145.066c-.086 80.078-64.984 144.973-145.062 145.063zm0 0" />
                            <path d="M256.004 350.316c-23.567 0-42.668 19.102-42.668 42.668 0 23.563 19.101 42.664 42.668 42.664 23.562 0 42.664-19.101 42.664-42.664-.027-23.554-19.113-42.64-42.664-42.668zm0 68.266c-14.14 0-25.602-11.46-25.602-25.598 0-14.14 11.461-25.601 25.602-25.601 14.137 0 25.598 11.46 25.598 25.601 0 14.137-11.461 25.598-25.598 25.598zm51.199-153.598H204.805c-9.426 0-17.067 7.641-17.067 17.067v34.133c0 9.425 7.64 17.066 17.067 17.066h102.398c9.426 0 17.067-7.64 17.067-17.066V282.05c0-9.426-7.641-17.067-17.067-17.067zm0 51.2H204.805V282.05h102.398zM237.906 76.223a8.534 8.534 0 00-.21 12.066 8.537 8.537 0 0012.273 0 8.532 8.532 0 0112.066 0 8.534 8.534 0 0012.067-.21 8.53 8.53 0 000-11.856c-9.997-9.996-26.2-9.996-36.196 0zm0 0" />
                            <path d="M292.203 66.656c4.711 0 8.531-3.824 8.531-8.535a8.553 8.553 0 00-2.5-6.031c-23.328-23.328-61.148-23.332-84.476-.004l-.004.004a8.534 8.534 0 0012.066 12.066c16.66-16.656 43.672-16.656 60.332 0a8.526 8.526 0 006.051 2.5zm0 0" />
                            <path d="M201.7 40.016c30.007-29.95 78.6-29.95 108.609 0a8.534 8.534 0 0012.066-.211 8.53 8.53 0 000-11.856c-36.68-36.597-96.063-36.597-132.742 0a8.534 8.534 0 00.21 12.067 8.53 8.53 0 0011.856 0zm0 0" />
                        </svg>
                        <span>Роботы-пылесосы</span>
                    </NavLink>
                </li>
            </ul>
        </li>

        {/* Delivery */}
        <li className={styles.header__nav_item}>
            <NavLink to="/delivery" className={styles.header__nav_link}>
                Доставка и оплата
            </NavLink>
        </li>
    </ul>
);

export default React.memo(NavbarList);
