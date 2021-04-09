import React from "react";

const InputField = ({ type = "text", children, name = "input", classList = "" }) => {
    const id = `${type || "text"}-id-${Math.random().toString(34).slice(2)}`;
    return (
        <label htmlFor={id}>
            <input id={id} type={type} name={name} className={classList}/>
        </label>
    );
};

export default InputField;


