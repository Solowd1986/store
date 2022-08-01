import React, { createRef, useEffect, useReducer, useState } from "react";
import styles from "./scss/styles.module.scss";
import cn from "classnames";



const Form = ({ nameField }) => {
    const formRef = createRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formData = new FormData(formRef.current).get("email")
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            action="/"
            name="auth-form"
            method="POST"
        >
            <input
                type="text"
                name="email"
                defaultValue={nameField || ""}
            />
        </form>
    )
};



const increment = (value) => value + 1;

const memo = (memoFn) => {
    const data = new Map();

    return (value) => {
        if (!data.get(value)) {
            data.set(
                value,
                memoFn(value)
            )
        }
        return data.get(value);
    }
};


const PageForGuest = () => {
    const [name, changeName] = useState("admin");




    console.log('re');

    useEffect(() => {
        console.log("start");
        return () => {
            console.log("end");
        }
    }, [name]);


    return (
        <div className={styles.cntr}>
            4545
            <button onClick={() => changeName("bob") }>Press</button>
        </div>
    )
};

export default PageForGuest;


