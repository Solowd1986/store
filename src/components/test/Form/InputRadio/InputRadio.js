import React from "react";

const InputRadio = ({ children = null, ...props }) => {
    const id = `radio-id-${Math.random().toString(34).slice(2)}`;
    return (
        <>
            <input id={id} type="radio" {...props}/>
            {children && (
                <label htmlFor={id}>
                    {children}
                </label>
            )}
        </>
    );
};

export default InputRadio;





