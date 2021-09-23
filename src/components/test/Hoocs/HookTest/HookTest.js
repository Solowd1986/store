import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./hook-test.module.scss"

export const HookTest = () => {
    const [isUserShowed, toggleUser] = useState(true);

    return (
        <div className={styles.wrapper}>
            <div className={styles.cnt}>
                Content
            </div>
            <p className={styles.btn_wrp}>
                <button className={styles.btn}>Click me</button>
            </p>
        </div>
    )
};





