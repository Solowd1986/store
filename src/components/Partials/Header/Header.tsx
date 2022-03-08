import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./header.module.scss";
import cn from "classnames";

import MobileNavbar from "./Partials/MobileNavbar/MobileNavbar";
import Logo from "./Partials/Logo/Logo";
import NavbarList from "./Partials/NavbarList/NavbarList";
import Userbar from "./Partials/Userbar/Userbar";
import { calcScrollBarWidth } from "@components/Helpers/Functions/scrollbarHelper";



/**
 * Итак, это входная точка блока Header сайта, тут подключаются все прочие части.
 * Конкретно этот компонент крмое своей родительской функции выполняет следующую задачу:
 * 1. Фикисрует свою максимальную ширину при первом рендеринге компонента.
 * 2. Меняет ее при ресайзе стрницы и опять фиксирует.
 * Это нужно для того, чтобы при исчезновении скроллбара компонент Header не смещался вправо. Обычно это не проблема, и
 * все решается за счет padding-right для компонента, но тут у нас компонент, который может иметь css-свойство fixed, и тут
 * padding не помоэет, потому используется maxWidth
 *
 * Элементы:
 * 1. isPageScrolled - это state, указывает, прокручена страницы вниз или нет. Если да - Header получает css-свойство fixed, это
 *    происходит чуть ниже, в блоке classList, там используется условное подключение класса из пакета classnames
 * 2. header - ссылка на весь DOM-элемент header
 * 3. headerPlaceholderElem - это заглушка, пустой div-элемент, который используется когда реальный header становится фиксированным,
 * а значит - пропадает из потока. Это заставляет содержимое странциы прыгнуть вверх, как раз для предотвращения этого данный блок
 * и используется, изначально у него нулевая высота и он не занимает место, но как только страница прокручивается,
 * а значит, header получает свойство fixed, данный блок считывает высоту реального header и устанавливает ее себе.
 *
 *
 *
 * @constructor
 */
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
     * 2. Создаем метод handleScroll. Это нужно для addEventListener/removeEventListener, а прописываем тут
     *    чтоб не создавать зависимости для хука.
     * 3. Ставим maxWidth для Header на будущее, чтобы когда будет пропадать скроллбар header не прыгал
     * 4. Ждем скролла.
     * 5. После скролла срабатывает handleScroll и ставит isPageScrolled в true. Header получает класс fixed
     * 6. isPageScrolled - это зависимость эффекта, значит опять заходим в эффект.
     * 7. Первое что срабатывает - это метод очистки. Он сниимает слушатель handleScroll
     * 8. Потом заходим в эффект, но поскольку isPageScrolled = true - сразу выходим
     * 9. Таким образом, эффект выполнил задачи: поставил maxWidth при монтировании и сменил isPageScrolled при событии скролла
     * 10. По сути, если бы не использовать return, он мог бы опять создать функцию и опять поставить слушатель, но это
     *     лишь выставило бы isPageScrolled в true опять, хотя там уже true, и это спровоцировало еще один бессмысленный render,
     *     ничего по изменив
     */
    useLayoutEffect(() => {
        if (isPageScrolled) return;
        const handleScroll = (): void => togglePageScrolledStatus(true);

        if (header.current) {
            const currentHeaderWidth: number = header.current.clientWidth;
            header.current.style.maxWidth = `${currentHeaderWidth}px`;
        }
        window.addEventListener("scroll", handleScroll);
        return (): void => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [isPageScrolled]);


    /**
     * Фикисируем высоту div-заглушки на основе высоты header. Она встает на его место, когда он fixed и выпадает из потока.
     * */
    if (headerPlaceholderElem.current && header.current && isPageScrolled) {
        const currentHeaderHeight: number = header.current.clientHeight;
        headerPlaceholderElem.current.style.minHeight = `${currentHeaderHeight}px`;
    }

    return (
        <>
            <div ref={headerPlaceholderElem}/>
            <header className={cn({[styles.header_fixed]: isPageScrolled})} ref={header}>
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
