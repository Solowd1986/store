import React, { PureComponent, useCallback, useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./mobile-navbar.module.scss";
import cn from "classnames";
import { addScrollbarOffset, removeScrollbarOffset } from "@components/Helpers/Functions/scrollbarHelper";


const MobileNavbar = () => {
    const [isMobileMenuVisible, mobileMenuToggle] = useState(false);

    const currentState = useRef(isMobileMenuVisible);

    console.log(isMobileMenuVisible);

    const toggleMobileMenu = (): void => {
        !isMobileMenuVisible ? addScrollbarOffset() : removeScrollbarOffset();
        mobileMenuToggle(state => {
            console.log('toggle');
            console.log(state);
            currentState.current = !state;

            console.log(isMobileMenuVisible);
            return !state;
        });
    };


    const navItemClickHandler = (): void => closeMobileMenu();

    const closeMobileMenu = () => {
        console.log('close');

        removeScrollbarOffset();
        mobileMenuToggle(state => {
            console.log('toggle');
            console.log(state);

            console.log(isMobileMenuVisible);
            return false;
        });
    };


    const resizePageHandler = (): void => {
        console.log('status', currentState.current);
        console.log('width', window.innerWidth);
        if (currentState.current && window.innerWidth > 1020) closeMobileMenu();
    };


    useEffect(() => {
        window.addEventListener("resize", resizePageHandler);
        return () => {
            closeMobileMenu();
            window.removeEventListener("resize", resizePageHandler);
        }
    }, []);


    const classListToggleIcon = cn(styles.mobile_menu__icon, {
        [styles.mobile_menu__icon__active]: isMobileMenuVisible,
    });

    const classListMenuWrapper = cn(
        "animate__animated', 'animate__fadeIn', 'animate__fast",
        styles.header__mobile_menu_wrapper,
    );

    console.log('render');

    return (
        <>
            <div onClick={toggleMobileMenu} className={classListToggleIcon}>
                <span/>
            </div>
            <div className={classListMenuWrapper}>
                <ul className={styles.header__mobile_menu_list}>
                    <li>
                        <NavLink onClick={navItemClickHandler} to={"/category/phones"}>
                            Смартфоны
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={navItemClickHandler} to={"/category/accessoires"}>
                            Аксессуары
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={navItemClickHandler} to={"/category/gadgets"}>
                            Гаджеты
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={navItemClickHandler} to={"/delivery"}>
                            Доставка
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};



class MobileNavbar1 extends PureComponent<any, { isMobileMenuVisible: boolean }> {
    state = {
        isMobileMenuVisible: false,
    };

    closeMobileMenu = () => {
        removeScrollbarOffset();
        this.setState({ isMobileMenuVisible: false });
    };

    private toggleMobileMenu = (): void => {
        !this.state.isMobileMenuVisible ? addScrollbarOffset() : removeScrollbarOffset();
        this.setState((state: { isMobileMenuVisible: boolean }) => ({
            isMobileMenuVisible: !state.isMobileMenuVisible,
        }));
    };

    private navItemClickHandler = (): void => this.closeMobileMenu();

    private resizePageHandler = (): void => {
        if (this.state.isMobileMenuVisible && window.innerWidth > 1020) this.closeMobileMenu();
    };

    componentDidMount(): void {
        window.addEventListener("resize", this.resizePageHandler);
    }

    componentWillUnmount(): void {
        this.closeMobileMenu();
        window.removeEventListener("resize", this.resizePageHandler);
    }

    render() {
        const classListToggleIcon = cn(styles.mobile_menu__icon, {
            [styles.mobile_menu__icon__active]: this.state.isMobileMenuVisible,
        });

        const classListMenuWrapper = cn(
            "animate__animated', 'animate__fadeIn', 'animate__fast",
            styles.header__mobile_menu_wrapper,
        );

        return (
            <>
                <div onClick={this.toggleMobileMenu} className={classListToggleIcon}>
                    <span/>
                </div>
                <div className={classListMenuWrapper}>
                    <ul className={styles.header__mobile_menu_list}>
                        <li>
                            <NavLink onClick={this.navItemClickHandler} to={"/category/phones"}>
                                Смартфоны
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.navItemClickHandler} to={"/category/accessoires"}>
                                Аксессуары
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.navItemClickHandler} to={"/category/gadgets"}>
                                Гаджеты
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.navItemClickHandler} to={"/delivery"}>
                                Доставка
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

export default MobileNavbar;
