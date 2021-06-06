import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import styles from "./mobile-navbar.module.scss";
import cn from "classnames";
import { addScrollbarOffset, removeScrollbarOffset } from "@components/Helpers/Functions/scrollbarHelper";

class MobileNavbar extends PureComponent<any, { isMobileMenuVisible: boolean }> {
    state = {
        isMobileMenuVisible: false,
    };

    closeMobileMenu = () => {
        removeScrollbarOffset();
        this.setState({ isMobileMenuVisible: false });
    };

    private toggleMobileMenu = ():void => {
        !this.state.isMobileMenuVisible ? addScrollbarOffset() : removeScrollbarOffset();
        this.setState((state: { isMobileMenuVisible: boolean }) => ({
            isMobileMenuVisible: !state.isMobileMenuVisible,
        }));
    };

    private navItemClickHandler = ():void => this.closeMobileMenu();

    private resizePageHandler = ():void => {
        if (this.state.isMobileMenuVisible && window.innerWidth > 1020) this.closeMobileMenu();
    };

    componentDidMount():void {
        window.addEventListener("resize", this.resizePageHandler);
    }

    componentWillUnmount():void {
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
                    <span />
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
