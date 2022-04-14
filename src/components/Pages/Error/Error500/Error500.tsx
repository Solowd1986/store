import React from "react";
import styles from "./error-500.module.scss";
import cn from "classnames";
import { NavLink, withRouter } from "react-router-dom";

const Error500 = ():JSX.Element => {
    return (
        <div className={cn("overlay", "overlay__w-bg")}>
            <div className={styles.content}>
                <div id={styles.error}>
                    <div id={styles.box}/>
                    <h3>ОШИБКА 500</h3>
                    <p>
                        Дела на стороне сервера немного <span>нестабильны</span>...
                    </p>
                    <NavLink to={"/"} className={styles.link}>
                        <p className={styles.link}>ВЕРНУТЬСЯ НА ГЛАВНУЮ</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Error500);
