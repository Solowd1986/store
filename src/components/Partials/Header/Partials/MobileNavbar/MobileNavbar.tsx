import React, { useEffect, useState } from "react";
import styles from "./mobile-navbar.module.scss";
import cn from "classnames";

import { addScrollbarOffset, removeScrollbarOffset } from "@components/Helpers/Functions/scrollbarHelper";
import { NavLink } from "react-router-dom";

const MobileNavbar = (): JSX.Element => {
    const [isMobileMenuVisible, mobileMenuToggle] = useState(false);

    const toggleMobileMenu = (): void => {
        !isMobileMenuVisible ? addScrollbarOffset() : removeScrollbarOffset();
        mobileMenuToggle((state) => !state)
    };

    const navItemClickHandler = (): void => closeMobileMenu();

    const closeMobileMenu = ():void => {
        removeScrollbarOffset();
        mobileMenuToggle(() => false)
    };

    const resizePageHandler = (): void => {
        mobileMenuToggle(isMobileMenuVisible => {
            if (isMobileMenuVisible && window.innerWidth > 1020) {
                removeScrollbarOffset();
                return false;
            }
            return isMobileMenuVisible;
        });
    };

    useEffect(() => {
        window.addEventListener("resize", resizePageHandler);
        return (): void => {
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

export default MobileNavbar;
