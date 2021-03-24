import React from "react";
import styles from "./product-price.module.scss";
import cn from "classnames";

//region Описание
/**
 * classList приходит от компонента SingleProduct, формат по-умолчанию ему дан, чтобы не выбрасывало ошибку,
 * при попытке обратиться к свойству от null или undeifned (то есть если бы classList = null, например), по сути условие
 * всегда сработает, так как classList всегда true при указанном подходе, но вместо класса подставится "", если ничего не
 * передано  так что не проблема. А если набор классов все же придет, то они без проблем извлекутся и подставятся.
 *
 * В конце округляем результат преобразования цены до сотен
 */
//endregion
const ProductPrice = ({ product: { price, discount, rest }, classList = { main: "", discount: "" } }) => {
  const formatPrice = (price) => new Intl.NumberFormat().format(price);

  let initialPriceClassList = cn(styles.discount, {
    [classList.discount]: classList,
  });
  let finalPriceClassList = cn(styles.price, {
    [classList.main]: classList,
  });

  let initialPrice = discount ? <span className={initialPriceClassList}>{formatPrice(price)} р.</span> : null;
  let finalPrice = discount
    ? formatPrice(Math.round(((price - (price * 10) / 100) / 100) * 100)) + " р."
    : formatPrice(price) + " р.";

  if (!rest) return null;
  return (
    <span className={finalPriceClassList}>
      {initialPrice}
      {finalPrice}
    </span>
  );
};

export default ProductPrice;
