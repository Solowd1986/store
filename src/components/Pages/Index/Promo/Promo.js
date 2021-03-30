import React, { Component } from "react";

import styles from "./promo.module.scss";
import cn from "classnames";
import * as PropTypes from "prop-types";

import ProductCard from "@components/Partials/ProductCard/ProductCard";

import DataStore from "@components/Test/DataStore";
import { Alert, DataStore2 } from "@components/Test/DataStore";

class Promo extends Component {
  static propTypes = {
    index: PropTypes.shape({
      phones: PropTypes.object.isRequired,
      accessoires: PropTypes.object.isRequired,
      gadgets: PropTypes.object.isRequired,
    }),
  };

  render() {
    const { phones, accessoires, gadgets } = this.props.index;
    return (
      <section className={cn("container", styles.wrapper)}>
        <main className={cn("wrapper", styles.content)}>
          {/*<DataStore2 />*/}

          <h2 className={styles.section_title}>Рекомендуем</h2>
          <ul className={styles.list}>
            {phones.data.map((item) => (
              <ProductCard key={item.title + item.id} item={item} category={phones.main} />
            ))}
          </ul>

          <h2 className={styles.section_title}>Популярные гаджеты</h2>
          <ul className={styles.list}>
            {gadgets.data.map((item) => (
              <ProductCard key={item.title + item.id} item={item} category={gadgets.main} />
            ))}
          </ul>

          <h2 className={styles.section_title}>Аксессуары</h2>
          <ul className={styles.list}>
            {accessoires.data.map((item) => (
              <ProductCard key={item.title + item.id} item={item} category={accessoires.main} />
            ))}
          </ul>
        </main>
      </section>
    );
  }
}

export default Promo;
