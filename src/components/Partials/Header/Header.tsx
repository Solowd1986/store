import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styles from "./header.module.scss";
import cn from "classnames";

import MobileNavbar from "./Partials/MobileNavbar/MobileNavbar";
import Logo from "./Partials/Logo/Logo";
import NavbarList from "./Partials/NavbarList/NavbarList";
import Userbar from "./Partials/Userbar/Userbar";
import { calcScrollBarWidth } from "@components/Helpers/Functions/scrollbarHelper";
import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";

//@ts-ignore
class Header extends PureComponent<any, { isPageScrolled: boolean }> {
    constructor(
        props: any,
        private percent: any,
        private readonly scrollbarWidth: any,
        private readonly header: React.RefObject<HTMLElement>,
        private readonly offset: React.RefObject<HTMLDivElement>,
    ) {
        super(props);
        this.header = React.createRef();
        this.offset = React.createRef();
        this.percent = null;
        this.scrollbarWidth = null;

        this.state = {
            isPageScrolled: false,
        };
    }

    private getHeaderCurrentHeight = (): number => {
        const node: HTMLElement | null = this.header.current;
        return node ? node.clientHeight : 0;
    };

    private getHeaderCurrentwidth = (): number => {
        const node: HTMLElement | null = this.header.current;
        return node ? node.clientWidth : 0;
    };


    private handleScroll = (): void => {
        if (this.state.isPageScrolled) return;
        this.setState({ isPageScrolled: true });
    };


    handlerResizePage = () => {
        //console.log('resizsed');
        if (this.header.current) {
            // temp
            this.header.current.style.maxWidth = this.calcOffset();

            //console.log('per', this.percent);
            //console.log('wi', window.innerWidth);

            //this.header.current.style.maxWidth = `${window.innerWidth * this.percent / 100}px`;
        }
    };

    // Так как именно на мобильной версии ширина иногда прыгала вправо, прописан метод который дополнителньо считает
    // ширину в момент каждого открытия меню категорий сайта.
    calcMobileHeaderMaxWidth = () => {
        if (this.header.current) {
            //this.header.current.style.maxWidth = `${window.innerWidth - calcScrollBarWidth()}px`;
        }
    };

    // temp
    //calcOffset = () => `${window.innerWidth - this.scrollbarWidth}px`;
    calcOffset = () => `${window.innerWidth - calcScrollBarWidth()}px`;


    componentDidMount(): void {
        if (this.header.current) {
            this.header.current.style.maxWidth = `${this.getHeaderCurrentwidth()}px`;
            //this.percent =  parseInt(this.header.current.style.maxWidth) / window.innerWidth * 100;
        }

        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handlerResizePage);
    }

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.handlerResizePage);
    }


    getScrollOffset = () => window.innerWidth - calcScrollBarWidth();


    render() {
        const classList = cn({
            [styles.header_fixed]: this.state.isPageScrolled,
        });


        if (this.offset.current && this.header.current && this.state.isPageScrolled) {
            this.offset.current.style.minHeight = `${this.getHeaderCurrentHeight()}px`;
            //temp
            //this.header.current.style.maxWidth = this.calcOffset();
        }

        return (
            <>
                <div ref={this.offset}/>
                <header className={cn(classList)} ref={this.header}>
                    <nav className={cn("wrapper", styles.common)}>
                        <MobileNavbar calcMobileHeaderMaxWidth={this.calcMobileHeaderMaxWidth}/>
                        <Logo/>
                        <NavbarList/>
                        <Userbar/>
                    </nav>
                </header>
            </>
        );
    }
}

export default Header;
