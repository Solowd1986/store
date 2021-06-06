import React, { PureComponent } from "react";
import styles from "./up-button.module.scss";
import cn from "classnames";

class UpButton extends PureComponent<any, { isPageScrolledToBottom: boolean }> {
    constructor(
        props: unknown,
        private resizeInactivityTimer: any,
        private readonly upBtnElem: React.RefObject<HTMLDivElement>,
    ) {
        super(props);
        this.upBtnElem = React.createRef();
        this.resizeInactivityTimer = null;
        this.state = {
            isPageScrolledToBottom: false,
        }
    }

    fixUpBtnWhenResize = () => {
        clearTimeout(this.resizeInactivityTimer);
        if (this.upBtnElem.current) this.upBtnElem.current.style.display = "none";
        this.resizeInactivityTimer = setTimeout(() => {
            if (this.upBtnElem.current) {
                this.upBtnElem.current.style.removeProperty("display");
                const rightOffset = getComputedStyle(this.upBtnElem.current).getPropertyValue("right");
                const leftOffset =  this.upBtnElem.current.offsetWidth + parseInt(rightOffset);
                const offset = document.documentElement.clientWidth - leftOffset;
                this.upBtnElem.current.style.left = `${offset}px`;
            }
        }, 1000);
    };

    componentDidMount(): void {
        if (this.upBtnElem.current) {
            this.upBtnElem.current.style.left = getComputedStyle(this.upBtnElem.current).getPropertyValue("left");
        }
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.fixUpBtnWhenResize);
    }

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.fixUpBtnWhenResize);
        clearTimeout(this.resizeInactivityTimer);
    }

    handleScroll = (): void => {
        window.scrollY > document.documentElement.clientHeight
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
        return <div ref={this.upBtnElem} onClick={this.scrollUp} className={classList} />;
    }
}

export default UpButton;
