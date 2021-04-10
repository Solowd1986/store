import React, { Component } from "react";
import styles from "./product.module.scss";
import cn from "classnames";

import OrderButton from "@components/Partials/OrderButton/OrderButton";
import ProductPrice from "@components/Partials/ProductPrice/ProductPrice";
import PromoBadge from "@components/Partials/PromoBadge/PromoBadge";
import ProductSlider from "./ProductSlider/ProductSlider";
import ProductTabs from "./ProductTabs/ProductTabs";
import Spinner from "@components/Partials/Spinner/Spinner";

import { bindActionCreators } from "redux";
import * as serverActions from "@redux/entities/server/actions";
import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import { connect } from "react-redux";

class Product extends Component {
    state = {
        product: null,
    };

    //region Описание
    /**
     * Выставляем state для product когда приходят данные от сервера, до этого показываем спиннер
     * Можно перейти полностью на props, но тогда нужно описать оистку redux-store при unmount компонента, иначе
     * будут демонстрироваться старые данные до прихода новых.
     */
    //endregion
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.product && this.props.product) {
            this.setState({ product: this.props.product });
        }
    }

    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    render() {
        if (!this.state.product) return <Spinner />;
        const { main: category, data: product } = this.state.product;

        return (
            <>
                <section className={cn("container", styles.item_bg)}>
                    <div className={cn("wrapper", styles.order)}>
                        <ProductSlider list={product.slider} alt={product.img_alt} />
                        <div className={styles.order__info_wrapper}>
                            <h1 className={styles.order__title}>{product.title}</h1>
                            <p className={styles.order__desc}>{product.desc}</p>

                            <div className={styles.price}>
                                <ProductPrice product={product} />
                            </div>

                            <div className={styles.btn_wrapper}>
                                <OrderButton product={product} classList={styles.btn_order} />
                            </div>
                            <span className={styles.availability}>
                                {product.rest ? "Наличие: в наличии" : "Наличие: нет наличии"}
                            </span>
                        </div>
                    </div>
                </section>
                <ProductTabs category={category} product={product} />
                <PromoBadge />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        product: serverSelectors.serverProductSelector(state),
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPageData: serverActions.fetchPageData }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Product);
