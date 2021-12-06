import React from "react";
import styles from "./spinner.module.scss";
import img from "./img/three-dots.svg";

const Spinner = ():JSX.Element => (
    <div className={styles.wrapper}>
        <img className={styles.spinner} src={img} alt="spinner" />
    </div>
);

export default Spinner;
