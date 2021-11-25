import React from "react";
import styles from "./submit-button.module.scss";
import cn from "classnames";

const SubmitButton = ({ value = "Отправить", disabled = false, classList = "", handler = () => {} }) => (
    <input
        type="submit"
        onClick={handler}
        className={classList}
        disabled={disabled}
        value={value}
    />
);

export default SubmitButton;


