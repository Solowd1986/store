import React, { useState, createContext, useContext, forwardRef, useMemo, useEffect, useRef } from "react";
import styles from "./hook-test.module.scss"
import img from "../../../Helpers/SVG Loaders/circles.svg";
import axios from 'axios';

//import colorsSet from "./color";

//const ColorContext = createContext(null);


export const AppHook = () => {


    const inputField = useRef();

    const [userList, startFetch] = useState({
        user: {}
    });

    const [userId, changeId] = useState(0);


    const startFetching = () => {
        startFetch({
            user: {
                name: "Bob " + Date()
            }
        })
    };

    //console.log(userId);


    useAsyncEffect(async () => {
        try {
           // console.log(userId);

            //const data = await axios.get(`http://hn.algolia.com/api/v1/items/${userId}`);
        }
        catch (e) {
            //console.log(e);
        }
    },
        () => {
           // console.log('unc', userId);
        },

        [userId]);


    return (
        <>
        <div style={{textAlign: "center"}}>
            <button style={{padding: "10px"}} onClick={startFetching}>
                Start fetching
            </button>
            <div>
                <button style={{padding: "10px"}} onClick={() => changeId(userId + 1)}>
                    Change User
                </button>
            </div>
            <div >
                <span ref={inputField}>Here data: {userList.user.name}</span>
            </div>
        </div>
        <HookTest />
        </>

    )
};


import Input from "../ExportStage/HookExport";
import useAsyncEffect from "use-async-effect";



export const HookTest = () => {
    const [, reRender] = useState();
    //const { colors, changeColors } = useContext(ColorContext);
    const [ count, setCt ] = useState(0);

    const [spinnerState, toggleSpinner] = useState(false);


    const inputRef = useRef(null);

    useEffect(() => {
        //console.log('show');

        return () => {
            //console.log('unm');
        }
    }, []);
    //console.log(colors);



    return (
        <div className={styles.wrapper}>
            <div className={styles.cnt}>
                Content
                <Input ref={inputRef} data={'Glow'}/>
            </div>
            { count }

            <div>
                {spinnerState
                &&
                <img src={img} width="100px" height="auto" alt="image"/>
                }
            </div>
            <p className={styles.btn_wrp}>
                <button className={styles.btn} onClick={ () => toggleSpinner((state) => !state) }>Click me</button>
                <button className={styles.btn} onClick={reRender}>Click rerender</button>
                <button className={styles.btn} onClick={ () => setCt((prev) => prev + 1) }>Click change</button>
            </p>
        </div>
    )
};





