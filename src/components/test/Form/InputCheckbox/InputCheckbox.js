import React from "react";
import styles from "./input-checkbox.module.scss";


const InputCheckbox = ({ classList = "", text = "Запомнить меня", name = "checkbox" }) => {
    const id = `id-${Math.random().toString(34).slice(2)}`;
    return (
        <fieldset className={classList}>
            <svg xmlns="http://www.w3.org/2000/svg" display="none">
                <symbol id="checkmark" viewBox="0 0 24 24">
                    <path
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        d="M22.9 3.7L7.7 20.3l-6.6-7.1"
                    />
                </symbol>
            </svg>
            <input id={id} type="checkbox" className={styles.parent_checkbox} name={name}/>
            <label htmlFor={id} className={styles.label_checkbox}>
                <svg>
                    <use xlinkHref="#checkmark"/>
                </svg>
                <span>{text}</span>
            </label>
        </fieldset>
    )
};

export default InputCheckbox;

