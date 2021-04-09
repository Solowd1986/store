import React from "react";

const SubmitButton = ({ value, disabled = false, classList = "", handler }) => (
    <button onClick={handler} className={classList} disabled={disabled}>{value}</button>
);

export default SubmitButton;


