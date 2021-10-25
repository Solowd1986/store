import React, { useEffect, useState } from "react";
import styles from "./modal-wrapper.module.scss";
import cn from "classnames";
import * as util from "@components/Helpers/Functions/scrollbarHelper";

const ModalWrapper = (Component: any) => {
    return (props:unknown) => {
        const [isModalShow, showModalStatus] = useState(true);

        const closeModal = (evt: React.SyntheticEvent<HTMLElement>) => {
            if (!(evt.target instanceof HTMLElement)) return;
            if (!("modal" in evt.target.dataset)) return;
            showModalStatus(false);
        };

        const closeModalFromChildren = () => showModalStatus(false);

        useEffect(() => {
            isModalShow ? util.addScrollbarOffset() : util.removeScrollbarOffset();
            return () => util.removeScrollbarOffset();
        },[isModalShow]);

        if (!isModalShow) return null;
        return (
            <div className={cn("overlay", "overlay__b-bg")} onClick={closeModal} data-modal={true}>
                <Component {...props} close={closeModalFromChildren} />
            </div>
        );
    }
};

export default ModalWrapper;


