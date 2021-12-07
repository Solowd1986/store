import React, { useEffect, useState } from "react";
import styles from "./product.module.scss";
import cn from "classnames";
import { ReduxState } from "@root/ts/types/_core";
import { ISingleProductState, ISingleProductProps, ReduxRecivedProps } from "@root/ts/types/single-product";
import { Redirect } from "react-router";

import ProductPrice from "@components/Partials/ProductPrice/ProductPrice";
import ProductSlider from "./ProductSlider/ProductSlider";
import ProductTabs from "./ProductTabs/ProductTabs";
import Spinner from "@components/Partials/Spinner/Spinner";
import OrderButton from "@components/Partials/OrderButton/OrderButton";
import PromoBadge from "@components/Partials/PromoBadge/PromoBadge";

import * as productActions from "@redux/entities/product/actions";
import * as productSelectors from "@redux/entities/product/selectors/productSelectors";
import { connect } from "react-redux";



//region Описание
/**
 *
 * Изначально state пуст и на странице показывается спиннер. При размещении компонента осуществляется звпрос к серверу.
 * Как только данные приходят - проверяем, пуст ли state для product, и если да - вписываем данные.
 * Когда компонент размонтируется - запускаем очистку поля product в state Redux. В целом можно не использовать очистку,
 * так как мы базируемся на state, а оно сбрасывается при размонтировании компонента, а потом ждет прихода данных по новому товару.
 * Таким образом то, что в product (в Redux) все еще лежит старое значение, проблемой не является.
 * Но для единообразия я решил все же так прописать.
 */
    //endregion
const Product = (props: ISingleProductProps): JSX.Element => {
    const [productState, setProduct] = useState<ISingleProductState>();

    const {
        product: singleProduct,
        error, fetchProductPageData,
        clearProductReduxState,
        match: { params: { id, category: categoryTitle }, path}
    } = props;


    useEffect(() => {
        if (!productState && singleProduct) setProduct({ ...singleProduct });
    }, [productState, singleProduct]);


    useEffect(() => {
        fetchProductPageData(path, categoryTitle, id);
        return (): void => {
            clearProductReduxState();
        }
    }, [path, categoryTitle, id, fetchProductPageData, clearProductReduxState]);

    if (error.recived) return <Redirect to={error.code}/>;
    if (!productState) return <Spinner/>;
    const { main: category, data: product } = productState;

    return (
        <>
            <section className={cn("container", styles.item_bg)}>
                <div className={cn("wrapper", styles.order)}>
                    <ProductSlider list={product.slider} alt={product.img_alt}/>
                    <div className={styles.order__info_wrapper}>
                        <h1 className={styles.order__title}>{product.title}</h1>
                        <p className={styles.order__desc}>{product.desc}</p>

                        <div className={styles.price}>
                            <ProductPrice product={product}/>
                        </div>

                        <div className={styles.btn_wrapper}>
                            <OrderButton product={product} classList={styles.btn_order}/>
                        </div>
                        <span className={styles.availability}>
                                {product.rest ? "Наличие: в наличии" : "Наличие: нет наличии"}
                            </span>
                    </div>
                </div>
            </section>
            <ProductTabs category={category} product={product}/>
            <PromoBadge/>
        </>
    );
};

const mapStateToProps = (state: ReduxState):ReduxRecivedProps => productSelectors.getProductData(state);
export default connect(mapStateToProps, productActions)(Product);
