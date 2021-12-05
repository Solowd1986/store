import React, { PureComponent } from "react";
import styles from "./product-card.module.scss";
import cn from "classnames";
import { IProductCardProps } from "@root/ts/types/product-card";

import ProductPrice from "@components/Partials/ProductPrice/ProductPrice";
import OrderButton from "@components/Partials/OrderButton/OrderButton";
import PromoProductCard from "./PromoProductCard";
import { NavLink } from "react-router-dom";

const ProductCard = ({ category: { alias }, item, item: { id, title, rest, specifications } }: IProductCardProps) => {
    return (
        <li className={styles.item}>
            <span className={cn(styles.tag, { [styles.not_in_stock]: !rest })}>В наличии</span>

            <NavLink to={`/product/${alias}/${id}`}>
                <img className={styles.img} width={310} height={310} src={item.img.md} alt={item["img_alt"]}/>
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
};

export default ProductCard;
