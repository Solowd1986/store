import React, { Component } from "react";

import { ProductTypes, CategoryTypes } from "@custom-types//types";
import ProductPrice from "@components/Partials/ProductPrice/ProductPrice";
import OrderButton from "@components/Partials/OrderButton/OrderButton";
import PromoProductCard from "./PromoProductCard";
import { NavLink } from "react-router-dom";
import * as PropTypes from "prop-types";

import styles from "./product-card.module.scss";
import cn from "classnames";

type ProductCardProps = {
    item: ProductTypes,
    specifications: any,
    color: string,
    category: {
        alias: string
    }
};


class ProductCard extends Component<ProductCardProps> {
    render() {
        const {
            category,
            item,
            item: { rest },
        } = this.props;
        const tagClassList = cn(styles.tag, {
            [styles.not_in_stock]: !rest,
        });

        const productColor = item.specifications ? (
            <span className={styles.color}>{`"${item.specifications.color}"`}</span>
        ) : null;

        return (
            <li key={item.id} className={styles.item}>
                <span className={tagClassList}>В наличии</span>

                <NavLink to={`/product/${category.alias}/${item.id}`}>
                    <img className={styles.img} src={item.img.md} alt={item["img_alt"]} />
                </NavLink>

                <div className={styles.title}>
                    <span>{item.title}</span>
                    {productColor}
                </div>

                <PromoProductCard
                    item={{
                        alias: category.alias,
                        rest: item.rest,
                        adsType: item["ads_type"],
                    }}
                />
                <ProductPrice product={item} />
                <OrderButton product={item} />
            </li>
        );
    }
}

export default ProductCard;
