import React, { PureComponent } from "react";

import { ProductTypes, CategoryTypes } from "@custom-types//types";
import ProductPrice from "@components/Partials/ProductPrice/ProductPrice";
import OrderButton from "@components/Partials/OrderButton/OrderButton";
import PromoProductCard from "./PromoProductCard";
import { NavLink } from "react-router-dom";


import styles from "./product-card.module.scss";
import cn from "classnames";

type ProductCardProps = {
    item: ProductTypes,
    category: {
        alias: string
    }
};

class ProductCard extends PureComponent<ProductCardProps> {
    render() {
        const { category: { alias }, item, item: { id, title, rest, specifications } } = this.props;

        return (
            <li className={styles.item}>
                <span className={cn(styles.tag, { [styles.not_in_stock]: !rest })}>В наличии</span>

                <NavLink to={`/product/${alias}/${id}`}>
                    <img className={styles.img} src={item.img.md} alt={item["img_alt"]}/>
                </NavLink>

                <div className={styles.title}>
                    <span>{title}</span>
                    {specifications ? <span>"{specifications.color}"</span> : null}
                </div>

                <PromoProductCard item={{ alias, rest: item.rest, adsType: item["ads_type"] }}/>
                <div className={styles.price}>
                    <ProductPrice product={item}/>
                </div>
                <OrderButton product={item}/>
            </li>
        );
    }
}

export default ProductCard;
