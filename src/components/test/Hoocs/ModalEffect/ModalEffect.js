import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./modal-effect.module.scss"
import cn from "classnames";


export const ModalEffect = ({ type = 1, content = null }) => {
    const [modal, toggleModal] = useState(false);

    const modalWrapperClassList = cn(styles["md-modal"], styles[`md-effect-${type}`], {
        [styles["md-show"]]: modal
    });

    return (
        <>
            <div className={modalWrapperClassList}>
                <div className={styles["md-content"]}>
                    <h3>Modal Dialog</h3>
                    <div>
                        <p>This is a modal window. You can do the following things with it:</p>
                        <ul>
                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                        </ul>
                        <button onClick={() => toggleModal(false)}>Close me!</button>
                    </div>
                </div>
            </div>

            <div className={styles.btn_wrapper}>
                <button onClick={() => toggleModal(true)} className={styles.md_btn}>
                    Fade in &amp; Scale
                </button>
            </div>
            <div className={styles["md-overlay"]}/>
        </>
    )
};


