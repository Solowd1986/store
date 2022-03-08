import React from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";
import axios from "axios";


const ScrollList = () => {

    const addItems = (evt) => {
        console.log('add');
    };

    return (
        <div className={styles.wrp}>
            <div className={styles.innerPadding}>List:</div>
            <div className={styles.innerPadding}>--</div>
            <div className={styles.innerPadding}>
                <button className={styles.btn_add} onClick={addItems}>Add More</button>
            </div>
        </div>
    )
};

export default ScrollList;
