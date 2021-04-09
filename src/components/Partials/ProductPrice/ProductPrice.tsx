import React from "react";

interface ProductPriceInterface {
    product: {
        price: number,
        discount: boolean,
        rest: number
    }
}

// region Описание
/**
 * classList приходит от компонента SingleProduct, формат по-умолчанию ему дан, чтобы не выбрасывало ошибку,
 * при попытке обратиться к свойству от null или undeifned (то есть если бы classList = null, например), по сути условие
 * всегда сработает, так как classList всегда true при указанном подходе, но вместо класса подставится "", если ничего не
 * передано  так что не проблема. А если набор классов все же придет, то они без проблем извлекутся и подставятся.
 *
 * В конце округляем результат преобразования цены до сотен
 */
// endregion
const ProductPrice = ({ product: { price, discount, rest } }:ProductPriceInterface):JSX.Element | null => {
    if (!rest) return null;
    const calcDiscount = (price: number):number => Math.round(((price - (price * 10) / 100) / 100) * 100);
    const formatPrice = (price: number):string => new Intl.NumberFormat().format(price);

    const initialPrice = formatPrice(price);
    const finalPrice = discount ? formatPrice(calcDiscount(price)) : formatPrice(price);
    return (
        <>
        {discount ? <span data-initial="">{initialPrice} р.</span> : null}
        <span data-final="">{finalPrice} р.</span>
        </>
    );
};

export default ProductPrice;
