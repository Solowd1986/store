import React, { PureComponent } from "react";

import { IndexPageTypes, ProductTypes } from "@custom-types/types";
import styles from "./promo.module.scss";
import cn from "classnames";

import ProductCard from "@components/Partials/ProductCard/ProductCard";
import FormCounter  from "@components/test/Form/FormCounter/FormCounter";


class Promo extends PureComponent<IndexPageTypes> {
    render() {
        //console.dir(this.props);
        const { phones, accessoires, gadgets } = this.props.index;

        return (
            <section className={cn("container", styles.wrapper)}>
                <main className={cn("wrapper", styles.content)}>
                    <FormCounter />


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
