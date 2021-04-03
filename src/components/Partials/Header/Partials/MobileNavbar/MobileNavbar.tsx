import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import styles from "./mobile-navbar.module.scss";
import cn from "classnames";

type MobileNavbarState = {
    isMobileMenuVisible: boolean
};

class MobileNavbar extends PureComponent<unknown, MobileNavbarState> {
    state = {
        isMobileMenuVisible: false,
    };

    private disableScroll = () => document.body.style.overflow = "hidden";
    private enableScroll = () => document.body.style.removeProperty("overflow");

    private toggleMobileMenu = ():void => {
        !this.state.isMobileMenuVisible ? this.disableScroll() : this.enableScroll();
        this.setState((state: MobileNavbarState) => ({
            isMobileMenuVisible: !state.isMobileMenuVisible,
        }));
    };

    private handlerClickLink = ():void => {
        this.setState({ isMobileMenuVisible: false });
        this.enableScroll();
    };

    private handlerResizePage = ():void => {
        if (this.state.isMobileMenuVisible && window.innerWidth > 1020) {
            this.enableScroll();
            this.setState({ isMobileMenuVisible: false });
        }
    };

    componentDidMount():void {
        window.addEventListener("resize", this.handlerResizePage);
    }

    componentWillUnmount():void {
        this.enableScroll();
        this.setState({ isMobileMenuVisible: false });
        window.removeEventListener("resize", this.handlerResizePage);
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
                            <NavLink onClick={this.handlerClickLink} to={"/category/phones"}>
                                Смартфоны
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.handlerClickLink} to={"/category/accessoires"}>
                                Аксессуары
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.handlerClickLink} to={"/category/gadgets"}>
                                Гаджеты
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.handlerClickLink} to={"/delivery"}>
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
