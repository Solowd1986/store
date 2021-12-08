import React from "react";
import styles from "./promo.module.scss";
import cn from "classnames";

import { IProductTypes } from "@root/types/_core";
import { IIndexPagePropducts } from "@root/types/index-page";

import ProductCard from "@components/Partials/ProductCard/ProductCard";

const Promo = ({ index: { phones, accessoires, gadgets } }: IIndexPagePropducts):JSX.Element => {
    return (
        <section className={cn("container", styles.wrapper)}>
            <main className={cn("wrapper", styles.content)}>
                <h2 className={styles.section_title}>Рекомендуем</h2>
                <ul className={styles.list}>
                    {phones.data.map((item: IProductTypes) => (
                        <ProductCard key={item.title + item.id} item={item} category={phones.main}/>
                    ))}
                </ul>

                <h2 className={styles.section_title}>Популярные гаджеты</h2>
                <ul className={styles.list}>
                    {gadgets.data.map((item: IProductTypes) => (
                        <ProductCard key={item.title + item.id} item={item} category={gadgets.main}/>
                    ))}
                </ul>

                <h2 className={styles.section_title}>Аксессуары</h2>
                <ul className={styles.list}>
                    {accessoires.data.map((item: IProductTypes) => (
                        <ProductCard key={item.title + item.id} item={item} category={accessoires.main}/>
                    ))}
                </ul>
            </main>
        </section>
    );
};

export default React.memo(Promo);
