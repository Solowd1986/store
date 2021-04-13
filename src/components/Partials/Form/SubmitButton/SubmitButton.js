import React from "react";
import styles from "./submit-button.module.scss";
import cn from "classnames";

const SubmitButton = ({ value = "Отправить", disabled = false, classList = "", handler }) => (
    <button
        onClick={handler}
        className={cn(styles.btn, classList)}
        disabled={disabled}>{value}
    </button>
);

export default SubmitButton;


