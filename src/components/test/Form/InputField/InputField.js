import React from "react";
import styles from "./input-field.module.scss";
import cn from "classnames";

const InputField = ({ classList = "", error: field = {}, ...props }) => {
    const id = `${props.type || "text"}-id-${Math.random().toString(34).slice(2)}`;
    return (
        <label htmlFor={id} className={cn(styles.label, classList)}>
            <input id={id} {...props}/>
            { field.error && <span className={styles.error}>{field.msg}</span>}
        </label>
    );
};

export default InputField;


