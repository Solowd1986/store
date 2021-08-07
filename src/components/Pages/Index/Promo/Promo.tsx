import React, { Component, PureComponent } from "react";

import { IndexPageTypes, ProductTypes } from "@root/ts/types/types";
import styles from "./promo.module.scss";
import cn from "classnames";

import ProductCard from "@components/Partials/ProductCard/ProductCard";


import { test1 } from "@root/ts/test";
import nin from "@root/ts/nin";

nin();
test1();


class Promo extends PureComponent<IndexPageTypes> {
    render() {
        //console.dir(this.props);
        const { phones, accessoires, gadgets } = this.props.index;
        return (
            <section className={cn("container", styles.wrapper)}>
                <main className={cn("wrapper", styles.content)}>

                    <div id="glow">

                    </div>

                    <h2 className={styles.section_title}>Рекомендуем</h2>
                    <ul className={styles.list}>
                        {phones.data.map((item: ProductTypes) => (
                            <ProductCard key={item.title + item.id} item={item} category={phones.main} />
                        ))}
                    </ul>

                    <h2 className={styles.section_title}>Популярные гаджеты</h2>
                    <ul className={styles.list}>
                        {gadgets.data.map((item: ProductTypes) => (
                            <ProductCard key={item.title + item.id} item={item} category={gadgets.main} />
                        ))}
                    </ul>

                    <h2 className={styles.section_title}>Аксессуары</h2>
                    <ul className={styles.list}>
                        {accessoires.data.map((item: ProductTypes) => (
                            <ProductCard key={item.title + item.id} item={item} category={accessoires.main} />
                        ))}
                    </ul>
                </main>
            </section>
        );
    }
}

export default Promo;
