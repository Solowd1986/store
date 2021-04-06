import React, { Component, PureComponent } from "react";

import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import { bindActionCreators } from "redux";
import * as authActions from "@redux/entities/auth/actions";
import { connect } from "react-redux";


/**
 * Компонент отвечает лишь за приведение количества выбранного товара к нормализованному виду.
 * Эти данные он при onBlur сохраняет в своей state и возращает через отданный родителем метод.
 * Родитель, например компонент всей строки товара в корзине, уже исходя из этих данных может в своем
 * методе апдейтить глобальный стейт заказа, опираясь на title товара и прочие данные, которые тут не нужны.
 */
export class DataStore extends PureComponent {

    state = {
        value: null
    };

    static getDerivedStateFromProps(props, state) {
        if (state.value === null ) {
            return /^[0-9]+$/.test(props.initialValue) ? { value: props.initialValue } : { value: 1 }
        }
        return null;
    }

    static defaultProps = {
        returnCurrentAmount: (value) => value,
        maxAmount: 99,
        initialValue: 12,
        classList: ""
    };

    amountNormalize = (value, max) => {
        const amount = isNaN(Math.abs(parseInt(value))) ? 1 : value;
        const maxAmount = isNaN(Math.abs(parseInt(max))) ? 99 : max;
        return Math.max(1, Math.min(maxAmount, Math.abs(parseInt(amount))))
    };

    onChangeAmount = ({ target: { dataset: { action } } }) => {
        const currentValue = parseInt(this.state.value);
        const value = this.amountNormalize(action === "inc" ? currentValue + 1 : currentValue - 1, this.props.maxAmount);
        this.props.returnCurrentAmount(value);
        this.setState({ value });
    };

    onChangeBlur = ({ target: { value: inputValue } }) => {
        const value = this.amountNormalize(inputValue, this.props.maxAmount);
        this.props.returnCurrentAmount(value);
        this.setState({ value });
    };

    onChangeValue = ({ target: { value }, nativeEvent: { inputType } }) => {
        if (inputType === "deleteContentBackward" || inputType === "deleteContentForward") {
            this.setState({ value });
        } else {
            if (!/^[0-9]+$/.test(value)) return;
            this.setState({ value });
        }
    };

    render() {
        return (
            <fieldset className={this.props.classList}>
                <button
                    style={{ padding: "5px", color: "red" }}
                    onClick={this.onChangeAmount}
                    data-action="dec">
                    -
                </button>
                <label>
                    <input
                        onChange={this.onChangeValue}
                        onBlur={this.onChangeBlur}
                        type="text"
                        value={this.state.value}
                    />
                </label>
                <button
                    style={{ padding: "5px", color: "red" }}
                    onClick={this.onChangeAmount}
                    data-action="inc">
                    +
                </button>
                <div>
                    <h3>{this.state.value}</h3>
                </div>
            </fieldset>
        );
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators(authActions, dispatch);
export default connect(null, mapDispatchToProps)(DataStore);
