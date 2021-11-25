import React, { PureComponent, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./header.module.scss";
import cn from "classnames";

import MobileNavbar from "./Partials/MobileNavbar/MobileNavbar";
import Logo from "./Partials/Logo/Logo";
import NavbarList from "./Partials/NavbarList/NavbarList";
import Userbar from "./Partials/Userbar/Userbar";
import { calcScrollBarWidth } from "@components/Helpers/Functions/scrollbarHelper";








const Header = () => {
    const [isPageScrolled, togglePageScrolledStatus] = useState(false);
    const header: any = useRef();
    const headerPlaceholderElem: any = useRef();


    const handleScroll = (): void => {
        if (isPageScrolled) return;
        togglePageScrolledStatus(true);
    };

    const handlerResizePage = (): void => {
        if (header.current) {
            header.current.style.maxWidth = `${window.innerWidth - calcScrollBarWidth()}px`;
        }
    };


    useLayoutEffect(() => {
        if (header.current) {
            header.current.style.maxWidth = `${getHeaderCurrentwidth()}px`;
        }
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handlerResizePage);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handlerResizePage);
        }
    }, []);


    const getHeaderCurrentHeight = (): number | null => {
        const node: HTMLElement | null = header.current;
        return node ? node.clientHeight : null;
    };


    const getHeaderCurrentwidth = (): number | null => {
        const node: HTMLElement | null = header.current;
        return node ? node.clientWidth : null;
    };

    const classList = cn({
        [styles.header_fixed]: isPageScrolled,
    });

    if (headerPlaceholderElem.current && header.current && isPageScrolled) {
        headerPlaceholderElem.current.style.minHeight = `${getHeaderCurrentHeight()}px`;
    }

    return (
        <>
            <div ref={headerPlaceholderElem}/>
            <header className={cn(classList)} ref={header}>
                <nav className={cn("wrapper", styles.common)}>
                    <MobileNavbar/>
                    <Logo/>
                    <NavbarList/>
                    <Userbar/>
                </nav>
            </header>
        </>
    );

};




//
//
// class Header2 extends PureComponent<any, { isPageScrolled: boolean }> {
//     constructor(
//         props: unknown,
//         private readonly scrollbarWidth: any,
//         private readonly header: React.RefObject<HTMLElement>,
//         private readonly headerPlaceholderElem: React.RefObject<HTMLDivElement>,
//     ) {
//         super(props);
//         this.scrollbarWidth = null;
//         this.header = React.createRef();
//         this.headerPlaceholderElem = React.createRef();
//         this.state = {
//             isPageScrolled: false,
//         };
//     }
//
//     private getHeaderCurrentHeight = (): number | null => {
//         const node: HTMLElement | null = this.header.current;
//         return node ? node.clientHeight : null;
//     };
//
//     private getHeaderCurrentwidth = (): number | null => {
//         const node: HTMLElement | null = this.header.current;
//         return node ? node.clientWidth : null;
//     };
//
//     private handleScroll = (): void => {
//         if (this.state.isPageScrolled) return;
//         this.setState({ isPageScrolled: true });
//     };
//
//     handlerResizePage = (): void => {
//         if (this.header.current) {
//             this.header.current.style.maxWidth = `${window.innerWidth - calcScrollBarWidth()}px`;
//         }
//     };
//
//     componentDidMount(): void {
//         if (this.header.current) {
//             this.header.current.style.maxWidth = `${this.getHeaderCurrentwidth()}px`;
//         }
//         window.addEventListener("scroll", this.handleScroll);
//         window.addEventListener("resize", this.handlerResizePage);
//     }
//
//     componentWillUnmount(): void {
//         window.removeEventListener("scroll", this.handleScroll);
//         window.removeEventListener("resize", this.handlerResizePage);
//     }
//
//     render() {
//         const classList = cn({
//             [styles.header_fixed]: this.state.isPageScrolled,
//         });
//
//         if (this.headerPlaceholderElem.current && this.header.current && this.state.isPageScrolled) {
//             this.headerPlaceholderElem.current.style.minHeight = `${this.getHeaderCurrentHeight()}px`;
//         }
//
//         return (
//             <>
//                 <div ref={this.headerPlaceholderElem}/>
//                 <header className={cn(classList)} ref={this.header}>
//                     <nav className={cn("wrapper", styles.common)}>
//                         <MobileNavbar/>
//                         <Logo/>
//                         <NavbarList/>
//                         <Userbar/>
//                     </nav>
//                 </header>
//             </>
//         );
//     }
// }

export default Header;
