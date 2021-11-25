import React from "react";
//import styles from "./input-field.module.scss";
//import cn from "classnames";

const InputFile = (props) => {
    //const id = `${props.type || "text"}-id-${Math.random().toString(34).slice(2)}`;
    return (
        <input type="file" name={"file"} {...props}/>
    );
};

export default InputFile;




