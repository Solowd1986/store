import React, { useState } from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";
import img from "./img/three-dots.svg";

const LoadingSpinner = ({ width }) => {

    const propsStyleWidth = width ? {width: `${width}px`} : {};
    return (
        <div className={styles["spinner-wrapper"]}>
            <img style={propsStyleWidth} className={styles.spinner} src={img} alt="spinner"/>
        </div>
    )
};

export default LoadingSpinner;


