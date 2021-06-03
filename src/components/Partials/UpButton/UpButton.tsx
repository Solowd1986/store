import React, { PureComponent } from "react";
import styles from "./up-button.module.scss";
import cn from "classnames";
import { setInitialPercent, setDinamicPercent } from "@components/Helpers/Functions/scrollbarHelper";

type UpButtonState = {
    isPageScrolledToBottom: boolean
};


class UpButton extends PureComponent<any, UpButtonState> {
    constructor(
        props: any,
        private readonly upBtn: React.RefObject<HTMLDivElement>,
    ) {
        super(props);
        this.upBtn = React.createRef();
        this.state = {
            isPageScrolledToBottom: false,
        }
    }

    componentDidMount(): void {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = (): void => {
        const offset = window.scrollY;
        const viewport = document.documentElement.clientHeight;
        offset > viewport
            ? this.setState({ isPageScrolledToBottom: true })
            : this.setState({ isPageScrolledToBottom: false });
    };

    scrollUp = ():void => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    render():React.ReactNode {
        const classList = cn(styles.up, {
            [styles.show]: this.state.isPageScrolledToBottom,
        });
        return <div ref={this.upBtn} onClick={this.scrollUp} className={classList} />;
    }
}

export default UpButton;
