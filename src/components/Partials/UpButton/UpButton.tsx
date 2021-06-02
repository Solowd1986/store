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
        private percent: any,
        private readonly upBtn: React.RefObject<HTMLDivElement>,
    ) {
        super(props);
        this.percent = null;
        this.upBtn = React.createRef();
        this.state = {
            isPageScrolledToBottom: false,
        }
    }


    handlerResizePage = () => {
        //alert("resize");
        //console.log(window.innerWidth);

        //console.log(document.documentElement.clientWidth);

        if (this.upBtn.current) {
            //console.log(this.percent);

            //this.upBtn.current.style.left = `${window.innerWidth * this.percent.offset / 100}px`;
            //@ts-ignore
            //this.upBtn.current.style.bottom = 0;
            const clc = window.innerWidth * this.percent.width / 100;
            if (clc <= 55 && clc > 30) {
               // this.upBtn.current.style.width = `${window.innerWidth * this.percent.width / 100}px`;
              //  this.upBtn.current.style.height = `${window.innerWidth * this.percent.height / 100}px`;
            }
            //this.upBtn.current.style.height = `${window.innerWidth * this.percent.height / 100}px`;

            //console.log(res);

            //@ts-ignore
            //this.upBtn.current.style.left = `${res}px`;

        }




        // if (this.header.current && this.header.current.style.maxWidth) {
        //     this.header.current.style.maxWidth = `${window.innerWidth * this.percent / 100}px`;
        // }
    };


    componentDidMount(): void {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handlerResizePage);
    }



    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.handlerResizePage);
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

    //this.header.current.style.maxWidth = `${window.innerWidth * this.percent / 100}px`;
    //this.percent =  parseInt(this.header.current.style.maxWidth) / window.innerWidth * 100;




    componentDidUpdate(): void {
        if (this.state.isPageScrolledToBottom && !this.percent) {

            //@ts-ignore
            //this.percent = setInitialPercent(getComputedStyle(this.upBtn.current).getPropertyValue("left"));
            const leftStr = parseInt(getComputedStyle(this.upBtn.current).getPropertyValue("left"));
            //@ts-ignore
            const widthElem = parseInt(getComputedStyle(this.upBtn.current).getPropertyValue("width"));
            //@ts-ignore
            const heightElem = parseInt(getComputedStyle(this.upBtn.current).getPropertyValue("height"));
            //console.log(leftStr);
            //@ts-ignore
            //console.log(this.upBtn.current.offsetLeft);
            //@ts-ignore
            //console.log(this.upBtn.current.clientWidth);

            //console.dir(this.upBtn.current);
            //console.log(leftStr);
            //const perc = leftStr / window.innerWidth *  100;
            //console.log(perc);
            //@ts-ignore
            this.percent =  {
                offset: leftStr / window.innerWidth * 100,
                width: widthElem / window.innerWidth * 100,
                height: heightElem / window.innerHeight * 100,
            };
            //@ts-ignore
            //this.upBtn.current.style.left = `${leftStr}px`;
            //@ts-ignore
            //this.upBtn.current.style.maxWidth = `${55}px`;
            //@ts-ignore
            //this.upBtn.current.style.maxHeight = `${55}px`;


            //@ts-ignore
            //this.percent = setInitialPercent(getComputedStyle(this.upBtn.current).getPropertyValue("left"));
        }
    }

    render():React.ReactNode {
        const classList = cn(styles.up, {
            [styles.show]: this.state.isPageScrolledToBottom,
        });

        //@ts-ignore
        console.log('client', document.documentElement.clientWidth );
        console.log('all', window.innerWidth );

        return (

                <div ref={this.upBtn} onClick={this.scrollUp} className={classList} />

        );
    }
}

export default UpButton;
