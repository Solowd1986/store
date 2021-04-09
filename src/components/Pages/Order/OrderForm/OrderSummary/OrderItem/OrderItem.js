import React, { Component } from "react";
import styles from "./order_item.module.scss";
import cn from "classnames";
import * as PropTypes from "prop-types";

import * as cartActions from "@redux/entities/cart/actions";
import * as serverActions from "@redux/entities/server/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class OrderItem extends Component {
    static propTypes = {
        changeAmountOfProduct: PropTypes.func.isRequired,
        removeItemFromCart: PropTypes.func.isRequired,
    };

    state = {
        item: this.props.item,
    };

    normalizeValue = (value) => Math.max(1, Math.min(this.props.item.rest, Math.abs(parseInt(value))));

    onChangeInput = (evt) => {
        const quantity = Math.abs(parseInt(evt.target.value));
        if (isNaN(quantity)) return;
        this.setState({ item: { ...this.state.item, quantity } });
    };

    onBlurInput = (evt) => {
        this.props.changeAmountOfProduct(this.props.item.id, this.props.item.title, evt.target.value);
        this.setState({
            item: {
                ...this.state.item,
                quantity: this.normalizeValue(evt.target.value),
            },
        });
    };

    changeAmount = (id, title, quantity) => {
        this.props.changeAmountOfProduct(id, title, quantity);
        this.setState({
            item: { ...this.state.item, quantity: this.normalizeValue(quantity) },
        });
    };

    deleteFromOrder = () => {
        this.props.removeItemFromCart(this.props.item);
    };

    render() {
        const { item, item: { img_alt: alt, img } } = this.props;
        const discount = item.discount ? item.price - (item.price * 10) / 100 : item.price;
        const price = new Intl.NumberFormat().format(discount * item.quantity) + " р.";

        return (
            <div className={styles.info}>
                <img width={82} height={82} className={styles.img_sm} src={img.md} alt={alt} />
                <div className={styles.info_inner_wrapper}>
                    <p className={styles.product_title}>
                        <span>{item.title}</span>
                        <span>({item.color || item.specifications.color})</span>
                    </p>

                    <div className={styles.counter_block}>
                        <span
                            onClick={(evt) => this.changeAmount(item.id, item.title, item.quantity - 1)}
                            className={cn(styles.counter, styles.counter_minus)}
                        />

                        <label>
                            <input
                                type="text"
                                name={item.title}
                                onChange={this.onChangeInput}
                                onBlur={this.onBlurInput}
                                value={this.state.item.quantity}
                            />
                        </label>

                        <span
                            onClick={(evt) => this.changeAmount(item.id, item.title, item.quantity + 1)}
                            className={cn(styles.counter, styles.counter_plus)}
                        />
                    </div>
                </div>
                <span className={styles.price__sm}>{price}</span>
                <span className={styles.delete} onClick={this.deleteFromOrder}>
                    &times;
                </span>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(cartActions, dispatch),
});
export default connect(null, mapDispatchToProps)(OrderItem);
