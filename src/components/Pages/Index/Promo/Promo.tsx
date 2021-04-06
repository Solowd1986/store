import React, { Component } from "react";

import styles from "./promo.module.scss";
import cn from "classnames";
import * as PropTypes from "prop-types";
import ProductCard from "@components/Partials/ProductCard/ProductCard";
import { IndexPageTypes, ProductTypes } from "@custom-types/types";

import DataStore  from "@components/test/DataStore";


import Auth from "@components/test/Other/Form/Auth/Auth";

const ob: Array<{ name: string }> = [{ name: "alex" }, { name: "alex" }, { name: "alex" }];

class Promo extends Component<IndexPageTypes> {
    render() {
        //console.dir(this.props);
        const { phones, accessoires, gadgets } = this.props.index;
        return (
            <section className={cn("container", styles.wrapper)}>
                <main className={cn("wrapper", styles.content)}>
                    <DataStore />

                    {/*<Auth/>*/}

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
