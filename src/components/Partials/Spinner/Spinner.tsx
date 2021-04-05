import React, { Component } from "react";
import styles from "./spinner.module.scss";
import img from "./img/three-dots.svg";

class Spinner extends Component {
    render():React.ReactNode {
        return (
            <div className={styles.wrapper}>
                <img className={styles.spinner} src={img} alt="spinner" />
            </div>
        );
    }
}

export default Spinner;
