import React, { Component } from "react";
import styles from "./with-modal.module.scss";
import classNames from "classnames";
import * as util from "@components/Helpers/Functions/scrollbarHelper";


type withModalState = {
    isModalActive: boolean
};

interface CloseModalInterface {
    closeModal: () => void;
}

//<editor-fold desc="Описание">
/**
 *  parentCentered - использовать не fixed-контейнер на всю страницу, а по размеру родителя.
 *  interactionsDisabled - не закрывать оверлей по клику, если логика его скрытия другая
 */
//</editor-fold>
function withModal(WrappedComponent:React.ComponentType<CloseModalInterface>,
                   { fixed = false, bg = true, interactionsDisabled = false } = {}
                   ):React.ReactNode {
    return class WithModal extends Component<unknown, withModalState> {
        constructor(props: unknown) {
            super(props);
            this.state = {
                isModalActive: true,
            };
        }

        closeModal = (evt: React.SyntheticEvent<HTMLElement>):void => {
            if (!(evt.target instanceof HTMLElement)) return;
            if (!("modal" in evt.target.dataset) || interactionsDisabled) return;
            this.setState({
                isModalActive: false,
            });
        };

        closeModalFromChildren = ():void => {
            this.setState({
                isModalActive: false,
            });
        };

        componentDidUpdate():void {
            if (!this.state.isModalActive) {
                util.removeScrollbarOffset();
            }
        }

        componentDidMount():void {
            util.addScrollbarOffset();
        }

        componentWillUnmount():void {
            util.removeScrollbarOffset();
        }

        render():React.ReactNode {
            if (!this.state.isModalActive) return null;

            const classList = classNames({
                overlay: !fixed,
                [styles.wrapper]: fixed,
                [styles.bg]: bg,
            });

            return (
                <div className={classList} onClick={this.closeModal} data-modal={true}>
                    <WrappedComponent closeModal={this.closeModalFromChildren} />
                </div>
            );
        }
    };
}

export default withModal;
