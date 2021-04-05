import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./logo.module.scss";

const Logo = ():JSX.Element => (
    <NavLink to="/" className={styles.header__logo_link}>
        <svg className={styles.header__logo_img} width={55} height={55} fill="red" viewBox="0 0 85 80">
            <path d="M34.7 55.8v-5.3H40V34.6h-5.3v-5.4h10.6v21.2h5.4v5.3h-16zM69.2
            69V34.5h-5.3v29.2H21.5V21.3h29.2V16H16.2v53h53zm0-39.8v-8h8V16h-8V8h-5.3v8h-8v5.3h8v8h5.3z"
            />
        </svg>
    </NavLink>
);

export default Logo;
