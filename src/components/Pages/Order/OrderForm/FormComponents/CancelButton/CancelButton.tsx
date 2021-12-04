import React from "react";
import styles from "./cancel-button.module.scss";
import cn from "classnames";

const CancelButton = ({ handler, classList = "" }: { handler: () => void,classList: string }) => (
    <span onClick={handler} className={cn(styles.btn, classList)}><span>&times;</span></span>
);

export default CancelButton;
