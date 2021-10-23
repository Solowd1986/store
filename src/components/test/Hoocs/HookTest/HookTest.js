import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import styles from "./hook-test.module.scss"
import img from "../../../Helpers/SVG Loaders/circles.svg";

export const HookTest = () => {
    const [, reRender] = useState();
    const [spinnerState, toggleSpinner] = useState(false);


    return (
        <div className={styles.wrapper}>
            <div className={styles.cnt}>
                Content
            </div>
            <div>
                {spinnerState
                &&
                <img src={img} width="100px" height="auto" alt="image"/>
                }
            </div>
            <p className={styles.btn_wrp}>
                <button className={styles.btn} onClick={() => toggleSpinner((state) => !state)}>Click me</button>
            </p>
        </div>
    )
};





