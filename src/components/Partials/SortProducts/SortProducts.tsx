import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./sort-products.module.scss";
import cn from "classnames";
import { SortProductsProps } from "@root/ts/types/category";

import { AnyAction, bindActionCreators, Dispatch } from "redux";
import * as categoryActions from "@redux/entities/category/actions";
import { connect } from "react-redux";

const SortPorducts = ({ sortType = "по популярности", changeSortType }: SortProductsProps) => {
    const [isSortPanelShow, toggleSortPanelVisibility] = useState(false);
    const listOfSortTypes = useRef<HTMLUListElement>(null);

    const toggleSortPanel = (evt: React.MouseEvent) => {
        evt.stopPropagation();
        toggleSortPanelVisibility((isSortPanelShow: boolean) => !isSortPanelShow);
    };

    const switchSortType = (evt: React.MouseEvent<HTMLElement>) => {
        evt.stopPropagation();
        if (!(evt.target instanceof HTMLElement)) return;
        if (evt.target.nodeName === "LI" && evt.target.innerText !== sortType) {
            changeSortType(evt.target.innerText);
            toggleSortPanelVisibility(false);
        }
    };

    const closeSortPanelOnClickByWindow = useCallback(() => toggleSortPanelVisibility(false), []);

    useEffect(() => {
        window.addEventListener("click", closeSortPanelOnClickByWindow);
        return () => {
            window.removeEventListener("click", closeSortPanelOnClickByWindow);
        }
    }, []);

    useEffect(() => {
        if (listOfSortTypes.current) {
            const listItems = Array.from(listOfSortTypes.current.children);
            listItems.forEach((item) => item.classList.remove(styles.active));
            const current = listItems.find((item) => (item as HTMLElement).innerText === sortType);
            if (current) current.classList.add(styles.active);
        }
    }, [sortType]);


    const classSortList = cn(styles.sort_list_panel, "animate__animated animate__zoomIn animate__faster", {
        [styles.panel_show]: isSortPanelShow,
        [styles.panel_hide]: !isSortPanelShow,
    });

    const classSvgIcon = cn(styles.sort_icon, {
        [styles.icon_rotate]: isSortPanelShow
    });

    return (
        <>
            <div className={styles.sort_wrapper}>
                <span className={styles.sort_title}>Сортировать: </span>
                <span className={styles.sort_type} onClick={toggleSortPanel}>
                    {sortType}
                    <svg width={"9px"} height={"9px"} className={classSvgIcon} viewBox="0 0 451.847 451.847">
                            <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27
                            151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354
                            44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0
                            12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274
                            9.257-22.369 9.257z"/>
                        </svg>
                    </span>
                <ul className={classSortList} onClick={switchSortType} ref={listOfSortTypes}>
                    <li>по новинкам</li>
                    <li>по популярности</li>
                    <li>по возрастанию цены</li>
                    <li>по убыванию цены</li>
                    <li>по скидкам</li>
                </ul>
            </div>
        </>
    );
};

const mapStateToProps = (state: any) => ({ sortType: state.category.sortType });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(categoryActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SortPorducts);

