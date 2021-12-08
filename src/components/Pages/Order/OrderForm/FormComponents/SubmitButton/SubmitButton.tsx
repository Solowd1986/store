import React from "react";
import { ISubmitButton } from "@root/types/order";

const SubmitButton = ({ value = "Отправить", disabled = false, classList = "", handler = (): void => {} }: ISubmitButton): JSX.Element => (
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


