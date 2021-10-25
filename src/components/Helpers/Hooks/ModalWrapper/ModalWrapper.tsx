import React, { useEffect, useState } from "react";
import cn from "classnames";
import * as util from "@components/Helpers/Functions/scrollbarHelper";
import { PropsModal } from "@components/Helpers/Hooks/ModalWrapper/types/ModalWrapperTypes";

const ModalWrapper = (Component: any) => {
    return (props:PropsModal) => {
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

        const options = {
            classList: cn("overlay", {
                "overlay__b-bg": props.bg,
            }),
            interactions: props.interactions ? closeModal : () => {}
        };

        if (!isModalShow) return null;
        return (
            <div className={options.classList} onClick={options.interactions} data-modal={true}>
                <Component {...props} close={closeModalFromChildren} />
            </div>
        );
    }
};

export default ModalWrapper;


