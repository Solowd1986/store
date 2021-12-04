import React, { Component } from "react";
import styles from "./error-400.module.scss";
import cn from "classnames";
import img from "./img/error-400.png";

import { RouteComponentProps, withRouter } from "react-router-dom";
import { IResetErrorState } from "@components/Helpers/ErrorBoundary/types/ErrorBoundary";

//region Описание
/**
 * Стоит заглушка для resetErrorState - это потому, что ему callback должен приходить от ErrorBoundariies, но если
 * вызвать сстраницу без него, просто /400, то callback не придет и будет undefined, это на такой случай
 * В целом, resetErrorState нужен только тут, так как именно на эту страницу редиректит ErrorBoundariies.
 * Если не сбросить, то можно уйти в постоянный редирект
 */
    //endregion
const Error400 = ({ history, resetErrorState = () => {} }:RouteComponentProps & IResetErrorState) => {
    const redirect = () => {
        resetErrorState();
        history.push("/");
    };

    return (
        <div className={cn("overlay", "overlay__w-bg")}>
            <div className={styles.content}>
                <img src={img} alt="image" />
                <h3 className={styles.title}>Что-то пошло не так!</h3>
                <p onClick={redirect} className={styles.btn}>
                    НА ГЛАВНУЮ
                </p>
            </div>
        </div>
    );
};

export default withRouter(Error400);
