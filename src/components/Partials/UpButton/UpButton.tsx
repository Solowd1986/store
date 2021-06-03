import React, { PureComponent } from "react";
import styles from "./up-button.module.scss";
import cn from "classnames";

class UpButton extends PureComponent<any, { isPageScrolledToBottom: boolean }> {
    constructor(
        props: any,
        private timer: any,
        private readonly upBtn: React.RefObject<HTMLDivElement>,
    ) {
        super(props);
        this.upBtn = React.createRef();
        this.timer = null;
        this.state = {
            isPageScrolledToBottom: false,
        }
    }

    fixUpBtnWhenResize = () => {
        clearTimeout(this.timer);
        if (this.upBtn.current) this.upBtn.current.style.display = "none";
        this.timer = setTimeout(() => {
            if (this.upBtn.current) {
                this.upBtn.current.style.removeProperty("display");
                const rightOffset = getComputedStyle(this.upBtn.current).getPropertyValue("right");
                const leftOffset =  this.upBtn.current.offsetWidth + parseInt(rightOffset);
                const offset = document.documentElement.clientWidth - leftOffset;
                this.upBtn.current.style.left = `${offset}px`;
            }
        }, 1000);
    };

    componentDidMount(): void {
        if (this.upBtn.current) {
            this.upBtn.current.style.left = getComputedStyle(this.upBtn.current).getPropertyValue("left");
        }
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.fixUpBtnWhenResize);
    }

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.fixUpBtnWhenResize);
        clearTimeout(this.timer);
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
