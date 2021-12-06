import React, { useEffect, useRef } from "react";
import styles from "./tabs.module.scss";
import cn from "classnames";
import { IProductTabs } from "@root/ts/types/single-product";

import Features from "./Features/Features";
import Specification from "./Specification/Specification";
import ProductDelivery from "./ProductDelivery/ProductDelivery";

const ProductTabs = (props: IProductTabs): JSX.Element => {
    const tabLinkList = useRef<HTMLElement>(null);
    const tabBodyList = useRef<HTMLUListElement>(null);
    const { category: { alias }, product: { promo, specifications } } = props;


    useEffect(() => {
        if (!tabLinkList.current || !tabBodyList.current) return;
        const animationList = ["animate__fadeIn", "animate__animated", "animate__fast"];
        tabLinkList.current.children[0].classList.add(styles.link_active);
        tabBodyList.current.children[0].classList.add(styles.tab_active);
        Array.from(tabBodyList.current.children).forEach((item) => item.classList.add(...animationList));
    });

    const tabClickHandler = (evt: React.SyntheticEvent<HTMLSpanElement>): void => {
        const target = evt.target as HTMLSpanElement;
        const { dataset: { tab: data } } = target;
        if (!tabLinkList.current || !tabBodyList.current) return;
        const tabLinkListArray = Array.from(tabLinkList.current.children);
        const tabBodyListArray = Array.from(tabBodyList.current.children);
        if (target.classList.contains(styles.link_active)) return;

        tabLinkListArray.forEach((item) => (item as HTMLSpanElement).classList.remove(styles.link_active));
        target.classList.add(styles.link_active);
        tabBodyListArray.forEach((item) => {
            (item as HTMLLIElement).classList.remove(styles.tab_active);
            if (item.id === data) item.classList.add(styles.tab_active);
        });
    };

    return (
        <section className={cn("wrapper", styles.info)}>
            <nav className={styles.info__nav} ref={tabLinkList}>
                    <span onClick={tabClickHandler}
                          className={cn(styles.info__nav_link)}
                          data-tab={"features"}>
                        Описание
                    </span>
                {alias === "phones" && (
                    <span onClick={tabClickHandler}
                          className={cn(styles.info__nav_link)}
                          data-tab={"specifications"}>
                            Характеристики
                        </span>
                )}
                <span onClick={tabClickHandler}
                      className={cn(styles.info__nav_link)}
                      data-tab={"shipping"}>
                        Доставка и оплата
                    </span>
            </nav>

            <div className={"container"}>
                <ul ref={tabBodyList}>
                    <li className={styles.tab} id={"features"}>
                        <Features promo={promo}/>
                    </li>
                    {alias === "phones" && specifications && (
                        <li className={styles.tab} id={"specifications"}>
                            <Specification specifications={specifications}/>
                        </li>
                    )}
                    <li className={styles.tab} id={"shipping"}>
                        <ProductDelivery/>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default ProductTabs;
