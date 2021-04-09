import React from "react";
import styles from "./cancel-button.module.scss";
import cn from "classnames";

const CancelButton = ({ value, handler, classList = "" }) => (
    <button onClick={handler} className={cn(styles.btn, classList)}>{value}</button>
);

export default CancelButton;
