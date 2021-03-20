import React, { Component } from "react";
import styles from "./header.module.scss";
import cn from "classnames";

import MobileNavbar from "./Partials/MobileNavbar/MobileNavbar";
import Logo from "./Partials/Logo/Logo";
import NavbarList from "./Partials/NavbarList/NavbarList";
import Userbar from "./Partials/Userbar/Userbar";

class Header extends Component {
    constructor(props) {
        super(props);
        this.header = React.createRef();
        this.offset = React.createRef();
        this.state = {
            isPageScrolled: false
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        window.scrollY > window.innerHeight + this.header.current.clientHeight
            ? this.setState({ isPageScrolled: true })
            : this.setState({ isPageScrolled: false })
    };

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
        const classList = cn({
            [styles.header_fixed]: this.state.isPageScrolled
        });

        if (this.offset.current) {
            this.state.isPageScrolled
                ? this.offset.current.style.minHeight = `${this.header.current.clientHeight}px`
                : this.offset.current.style.removeProperty("min-height");
        }
        return (
            <>
                <div ref={this.offset}/>
                <header className={classList} ref={this.header}>
                    <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__right}`} href="#">перейти на GitHub проекта</a>
                    <nav className={cn("wrapper", styles.common)}>
                        <MobileNavbar/>
                        <Logo/>
                        <NavbarList/>
                        <Userbar/>
                    </nav>
                </header>
            </>
        )
    }
}

export default Header;

