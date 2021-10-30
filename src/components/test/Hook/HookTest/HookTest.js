import React, { useState, createContext, useContext, useMemo, useEffect, useRef } from "react";
import styles from "./hook-test.module.scss"
import img from "../../../Helpers/SVG Loaders/circles.svg";

import colorsSet from "./color";

const ColorContext = createContext(null);


export const AppHook = () => {

    const [colors, changeColors ] = useState(colorsSet);

    return (
        <ColorContext.Provider value={{ colors, changeColors }}>
            <HookTest />
        </ColorContext.Provider>
    )
};



export const HookTest = () => {
    const [, reRender] = useState();
    const { colors, changeColors } = useContext(ColorContext);
    const [spinnerState, toggleSpinner] = useState(false);


    useEffect(() => {
        console.log('show');
        return () => {
            console.log('unm');
        }
    });
    //console.log(colors);



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
                <button className={styles.btn} onClick={reRender}>Click rerender</button>
            </p>
        </div>
    )
};





