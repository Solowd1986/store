import React, { useLayoutEffect, useState } from "react";
import cn from "classnames";
import { IComp } from "@root/types/_core";
import * as util from "@components/Helpers/Functions/scrollbarHelper";


//<editor-fold desc="Описание">
/**
 *
 * В типах мы указываем, что каждый компонент, который мы оборачиваем будет получать атрибут close указанной сигнатуры
 *
 * 1. На вход приходит компонент, который нужно обернуть
 * 2. Сам ModalWrapper создает div, который позиционируется как fixed и занимает весь экран, центруя в себе переданный компонент
 * 2. Div имеет data-атрибут modal, он нужен для того, чтобы отслеживать, откуда пришел клик и не убирать оверлей при клике на
 *    вложенные элементы. Конечно, вложенным элементам можно запретить Propagation, но это потребует прописывание этого для
 *    каждого элемента, а так вопрос решается в рамках ModalWrapper
 * 4. Компоненту ModalWrapper можно передать два атрибута: bg и interactions
 * 5. bg - это background-фон, если true, то фон будет
 * 6. interactions - реакция на клик по оверлею, если передать true, то по клику овердей + модальное окно пропадут.
 *    Но это нужно не всегда
 * 7. Также можно передать иные атрибуты, они сформируются в обьект rest и уже уйдут напрямую в оборачиваемый компонент
 * 8. Также в оборачиваемый компонент уйдет метод для скрытия оверлея, а значит и вложенного компонента, этот метод можно
 *    подвесить на интерактивный элемент, типа крестика.
 *
 * 9. При вызове компонента-обертки ей могут быть переданы методы. Например, при заказе - это очитка state заказа.
 *    Это должно вызываться как при клике на оверлее, так и при клике на крестике. Компонету с крестиком мы передаем
 *    как местный метод закрытия модального окна closeModalFromChildren так и все методы переданные обертке выше. Они
 *    все вызовутся при закрытии окна. Данный компонент тоже должен при закритии вызывать все методы которые ему переданы,
 *    кроме того, чтобы сбрамывать свой state.
 *
 * Возвращается именованная функция, так как линтер в противном случае (возврате анонимной функции) дает ошибку вызова хуков
 * вне пользовательских хуков или функциональных компонентов. Поэтому мы используем функцию с названием в верхнем регистре,
 * чтобы выдать эту функцию за функциональный компонент.
 *
 */
    //</editor-fold>
const ModalWrapper = (Component: React.FunctionComponent<{ [key: string]: (evt?: React.SyntheticEvent) => void}>) => {
    return function Comp({ bg = false, interactions = false, ...props }: IComp):JSX.Element | null {

        const [isModalShow, showModalStatus] = useState(true);

        const closeModal = (evt: React.SyntheticEvent<HTMLElement>):void => {
            if (!(evt.target instanceof HTMLElement)) return;
            if (!("modal" in evt.target.dataset)) return;

            Object.keys(props).forEach(property => {
                if (typeof props[property] === "function") props[property]();
            });
            showModalStatus(false);
        };

        const closeModalFromChildren = ():void => showModalStatus(false);

        useLayoutEffect(() => {
            isModalShow ? util.addScrollbarOffset() : util.removeScrollbarOffset();
            return ():void => util.removeScrollbarOffset()
        }, [isModalShow]);

        const options = {
            classList: cn("overlay", {
                "overlay__b-bg": bg,
            }),
            interactions: interactions ? closeModal : ():void => {}
        };

        if (!isModalShow) return null;
        return (
            <div className={options.classList} onClick={options.interactions} data-modal={true}>
                <Component {...props} close={closeModalFromChildren} />
            </div>
        );
    }
};

export default ModalWrapper;


