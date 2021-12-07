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

    /**
     * Метод реакции на изменения размера страницы и подстройки ширины Hrader под новый размер страницы.
     * Разделение методов handlerResizePage и handleScroll нужно потому, что handlerResizePage нужен постоянно,
     * а handleScroll только один раз.
     */
    useLayoutEffect(() => {
        const handlerResizePage = (): void => {
            if (header.current) {
                header.current.style.maxWidth = `${window.innerWidth - calcScrollBarWidth()}px`;
            }
        };
        window.addEventListener("resize", handlerResizePage);
        return (): void => {
            window.removeEventListener("resize", handlerResizePage);
        }
    }, []);

    /**
     * useEffect для handleScroll.
     *
     * Метод для решения двух задач: установить maxWidth для Header, это позволит при выставлении fixed не смещать Header
     * вправо из-за исчезновения скролла и поставить слушатель для события скролла, чтоб сменить isPageScrolled и за счет
     * этого добавить для Header класс fixed. После этого state менять уже не нужно, он до конца жизни компонента будет таким,
     * как и класс fixed для Header.
     *
     * Ход работы:
     * 1. Компонент монтируется, входим в эффект. Если isPageScrolled = true, то выходим, но пока это не так.
     * 2. Создаем метод handleScroll. Это нужно для addEventListener/removeEventListener
     * 3. Ставим maxWidth для Header на будущее.
     * 4. Ждем скролла.
     * 5. После скролла срабатывает handleScroll и ставит isPageScrolled в true. Header получает класс fixed
     * 6. isPageScrolled - это зависимость эффекта, значит опять заходим в эффект.
     * 7. Первое что срабатывает - это метод очистки. Он сниимает слушатель handleScroll
     * 8. Потом заходим в эффект, но поскольку isPageScrolled = true - сразу выходим
     * 9. Таким образом, эффект выполнил задачи: поставил maxWidth при монтировании и сменил isPageScrolled при событии скролла
     * 10. По сути, если бы не использовать return, он мог бы опять создать функцию и опять поставить слушатель, но это
     * лишь выставило бы isPageScrolled в true опять и спровоцировало еще один бессмысленный render, ничего по изменив
     */
    useLayoutEffect(() => {
        if (isPageScrolled) return;
        const handleScroll = (): void => togglePageScrolledStatus(true);

        if (header.current) {
            header.current.style.maxWidth = `${getHeaderCurrentwidth()}px`;
        }
        window.addEventListener("scroll", handleScroll);
        return (): void => {
            window.removeEventListener("scroll", handleScroll);
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
