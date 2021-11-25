import React from "react";
import styles from "./cancel-button.module.scss";
import cn from "classnames";

const CancelButton = ({ children, handler, classList = "" }) => (
    <span onClick={handler} className={cn(styles.btn, classList)}>{children || <span>&times;</span>}</span>
);

export default CancelButton;
