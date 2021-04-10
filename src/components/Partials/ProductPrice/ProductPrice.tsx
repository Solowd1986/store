import React from "react";

interface ProductPriceInterface {
    product: {
        price: number,
        discount: boolean,
        rest: number
    }
}

const ProductPrice = ({ product: { price, discount, rest } }:ProductPriceInterface):JSX.Element | null => {
    if (!rest) return null;
    const calcDiscount = (price: number):number => Math.round(((price - (price * 10) / 100) / 100) * 100);
    const formatPrice = (price: number):string => new Intl.NumberFormat().format(price);

    const initialPrice = formatPrice(price);
    const calculatedPrice = discount ? formatPrice(calcDiscount(price)) : formatPrice(price);
    return (
        <>
        {discount ? <span data-initial-price="">{initialPrice} р.</span> : null}
        <span data-calculated-price="">{calculatedPrice} р.</span>
        </>
    );
};

export default ProductPrice;
