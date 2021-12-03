import React from "react";
import styles from "./submit-button.module.scss";

const SubmitButton = ({ value = "Отправить", disabled = false, classList = "", handler = () => {} }) => (
    <input
        id="form-submit"
        type="submit"
        onClick={handler}
        className={classList}
        disabled={disabled}
        value={value}
    />
);

export default SubmitButton;


