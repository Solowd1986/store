import React, { PureComponent } from "react";
import styles from "./header.module.scss";
import cn from "classnames";

import MobileNavbar from "./Partials/MobileNavbar/MobileNavbar";
import Logo from "./Partials/Logo/Logo";
import NavbarList from "./Partials/NavbarList/NavbarList";
import Userbar from "./Partials/Userbar/Userbar";

class Header extends PureComponent<unknown , { isPageScrolled: boolean }> {
    constructor(
        props: unknown,
        private readonly header: React.RefObject<HTMLElement>,
        private readonly offset: React.RefObject<HTMLDivElement>,
    ) {
        super(props);
        this.header = React.createRef();
        this.offset = React.createRef();
        this.state = {
            isPageScrolled: false,
        };
    }

    private getHeaderCurrentHeight = ():number => {
        const node: HTMLElement | null = this.header.current;
        return node ? node.clientHeight : 0;
    };

    private getOffsetCurrentHeight = ():number => {
        const node: HTMLElement | null = this.offset.current;
        return node ? node.clientHeight : 0;
    };

    private viewportAndHeaderHeightSummary = ():number => {
        const node: HTMLElement | null = this.header.current;
        return node ? window.innerHeight + this.getHeaderCurrentHeight() : 0;
    };

    private isPageScrolledOverLimit = ():boolean => window.scrollY > this.viewportAndHeaderHeightSummary();


    private handleScroll = ():void => {
        if (this.isPageScrolledOverLimit() && this.state.isPageScrolled) return;
        if (!this.isPageScrolledOverLimit() && !this.state.isPageScrolled) return;
        this.isPageScrolledOverLimit() ? this.setState({ isPageScrolled: true }) : this.setState({ isPageScrolled: false });
    };

    componentDidMount():void {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount():void {
        window.removeEventListener("scroll", this.handleScroll);
    }

    //region Механизм фиксации header
    /**
     * Если выполняется условие по прокрутке, то header становиться fixed, смена позиционирования header на fixed
     * вызывает исчезновение его из потока, вся страница смещается вверх, ее высота уменьшается, условие появление
     * фиксированного header перестает выполняться, его высота опять считается для страницы, и условие по прокрутке опять
     * выполняется. Так возникает зацикливание.
     * Решение:
     * 1. Вставляется пустой div - this.offset
     * 2. Если this.offset существует (то есть уже был первичный рендер), то проверяем:
     *    страница проскролена дальше выбранной точки?
     * 3. Если да, то header выше получает класс header_fixed, а this.offset получает высоту header-а
     * 4. Если же статус isPageScrolled сменился на false, то есть пользователь прокрутил вверх - убираем высоту для offset
     * 5. Таким образом высота страницы одна, фиксирован header или нет, значит нет поводов для коллизий
     */
    //endregion фиксации
    render() {
        //console.dir(this.header);
        const classList = cn({
            [styles.header_fixed]: this.state.isPageScrolled,
        });

        if (this.offset.current) {
            this.state.isPageScrolled
                ? this.offset.current.style.minHeight = `${this.getHeaderCurrentHeight()}px`
                : this.offset.current.style.removeProperty("min-height");
        }

        return (
            <>
                <div ref={this.offset} />
                <header className={classList} ref={this.header}>
                    <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__right}`} href="#">
                        перейти на GitHub проекта
                    </a>
                    <nav className={cn("wrapper", styles.common)}>
                        <MobileNavbar />
                        <Logo />
                        <NavbarList />
                        <Userbar />
                    </nav>
                </header>
            </>
        );
    }
}

export default Header;
