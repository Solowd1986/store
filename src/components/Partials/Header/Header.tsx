import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./header.module.scss";
import cn from "classnames";

import MobileNavbar from "./Partials/MobileNavbar/MobileNavbar";
import Logo from "./Partials/Logo/Logo";
import NavbarList from "./Partials/NavbarList/NavbarList";
import Userbar from "./Partials/Userbar/Userbar";
import { calcScrollBarWidth } from "@components/Helpers/Functions/scrollbarHelper";

const Header = (): JSX.Element => {
    const [isPageScrolled, togglePageScrolledStatus] = useState(false);
    const header = useRef<HTMLHeadElement>(null);
    const headerPlaceholderElem = useRef<HTMLDivElement>(null);

    const handlerResizePage = (): void => {
        if (header.current) {
            header.current.style.maxWidth = `${window.innerWidth - calcScrollBarWidth()}px`;
        }
    };

    useLayoutEffect(() => {
        if (isPageScrolled) return;
        const handleScroll = (): void => togglePageScrolledStatus(true);

        if (header.current) {
            header.current.style.maxWidth = `${getHeaderCurrentwidth()}px`;
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handlerResizePage);

        return (): void => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handlerResizePage);
        }
    }, [isPageScrolled]);


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

export default React.memo(Header);
