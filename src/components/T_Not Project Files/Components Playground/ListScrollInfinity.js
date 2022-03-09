import React from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";
import axios from "axios";

const ScrollListInfinity =  () => {


    const addItems = async(evt) => {

        const result = await axios.get("https://6224b26a6c0e3966204475cd.mockapi.io/users?page=1&limit=10");
        console.log(result);

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

export default ScrollListInfinity;
