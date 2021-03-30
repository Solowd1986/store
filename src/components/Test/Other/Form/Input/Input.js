import React from "react";
import classNames from "classnames";

const InputText = ({
    type, children, name, classList: cl = null,
}) => {
    const id = `${type || "text"}-id-${Math.random().toString(34).slice(2)}`;
    const classList = classNames(cl);
    return (
        <>
            <input id={id} type={type} name={name} className={classList} />
            <label htmlFor={id}>{children}</label>
      </>
    );
};

export default InputText;
