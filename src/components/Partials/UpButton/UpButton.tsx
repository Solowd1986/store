import React, { useEffect, useRef, useState } from "react";
import styles from "./up-button.module.scss";
import cn from "classnames";
import * as utils from "@components/Helpers/Functions/scrollbarHelper";

const UpButton = (): JSX.Element => {
    const [isPageScrolledToBottom, changePageScrolledStatus] = useState(false);
    const upBtnElem = useRef<HTMLDivElement>(null);
    const resizeInactivityTimer = useRef(0);

    const fixUpBtnWhenResize = ():void => {
        clearTimeout(resizeInactivityTimer.current);
        // скрываем, чтобы не было видно смещений элемента на пересчете отступа
        if (upBtnElem.current) upBtnElem.current.style.display = "none";
        /**
         * удаляем display свойство, оно все равно не проявит элемент без isPageScrolledToBottom. Оно использутся когда
         * isPageScrolledToBottom уже в true
         * считаем отступ справа и прибавляем ширину самого элемента. Отнимаем от ширины страницы - получаем отступ слева
         * задаем его через секукнду после того, как закончилось resize событие
         * Таким образом кнопка прокрутки всегда фиксирована и не смещается из-за пропажи скролла, причем это работает и на
         * resize страницы
         */
        resizeInactivityTimer.current = window.setTimeout(() => {
            if (upBtnElem.current) {
                upBtnElem.current.style.removeProperty("display");
                const rightOffset = getComputedStyle(upBtnElem.current).getPropertyValue("right");
                const leftOffset = upBtnElem.current.offsetWidth + parseInt(rightOffset);
                const offset = document.documentElement.clientWidth - leftOffset;
                upBtnElem.current.style.left = `${offset}px`;
            }
        }, 1000);
    };

    const handleScroll = (): void => {
        window.scrollY > document.documentElement.clientHeight ? changePageScrolledStatus(true) : changePageScrolledStatus(false);
    };

    useEffect(() => {
        if (upBtnElem.current) {
            upBtnElem.current.style.left = getComputedStyle(upBtnElem.current).getPropertyValue("left");
        }
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", fixUpBtnWhenResize);

        return ():void => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", fixUpBtnWhenResize);
            window.clearTimeout(resizeInactivityTimer.current);
        }
    }, []);

    const scrollToTop = ():void => {
        if (isPageScrolledToBottom) utils.scrollToTop()
    };

    const classList = cn(styles.up, {
        [styles.show]: isPageScrolledToBottom,
    });

    return <div ref={upBtnElem} onClick={scrollToTop} className={classList}/>;
};

export default UpButton;
