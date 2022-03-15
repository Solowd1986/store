import React from "react";
import styles from "./spinner.module.scss";
import img from "./img/three-dots.svg";

const Spinner = (): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <img  className={styles.spinner} src={img} alt="spinner"/>
        </div>
    )
};

export default Spinner;


//ПЕРЕПИШИ ТИПЫ ДЛЯ HOC ModalWrapper так как там нет width



// const Spinner = ({ width }: { width: number | undefined }): JSX.Element => {
//     const propsStyleWidth = width ? { width: `${width}px` } : {};
//     return (
//         <div className={styles.wrapper}>
//             <img style={propsStyleWidth} className={styles.spinner} src={img} alt="spinner"/>
//         </div>
//     )
// };
