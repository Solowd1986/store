import React, { Component } from "react";
import styles from "./product-card.module.scss";

class PromoProductCard extends Component {
  render() {
    const { alias, rest, adsType } = this.props.item;
    let promo = [];

    if (alias === "phones" && rest > 0) {
      switch (adsType) {
        case 0: {
          promo = [<div className={styles.new}>Новинка</div>, <div className={styles.most_endorsed}>Хит продаж</div>];
          break;
        }
        case 1: {
          promo = [
            <div className={styles.installment}>Рассрочка 0-0-12</div>,
            <div className={styles.sim}>
              <span>SIM </span>в подарок
            </div>,
          ];
          break;
        }
        case 2: {
          promo = [
            <div className={styles.installment}>Рассрочка 0-0-12</div>,
            <div className={styles.gift}>
              <span>Подарок </span>3 500 р.
            </div>,
          ];
          break;
        }
        case 3: {
          promo = [
            <div className={styles.new}>Новинка</div>,
            <div className={styles.sim}>
              <span>SIM </span>в подарок
            </div>,
          ];
          break;
        }
      }
    } else if (rest > 0) {
      switch (adsType) {
        case 0:
          promo = [
            <div className={styles.gift}>
              <span>Подарок </span>1 500 р.
            </div>,
          ];
          break;
        case 1:
          promo = [<div className={styles.most_endorsed}>Хит продаж</div>];
          break;
        case 2:
          promo = [<div className={styles.new}>Новинка</div>];
          break;
        case 3:
          promo = [<div className={styles.installment}>Рассрочка 0-0-12</div>];
          break;
      }
    }

    return (
      <>
        {promo.map((item, i) => {
          return <React.Fragment key={i}>{item}</React.Fragment>;
        })}
      </>
    );
  }
}

export default PromoProductCard;
