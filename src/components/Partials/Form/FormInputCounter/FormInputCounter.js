import React, { PureComponent } from "react";

//region Описание
/**
 * Компонент отвечает лишь за приведение количества выбранного товара к нормализованному виду.
 * Эти данные он при onBlur сохраняет в своей state и возращает через отданный родителем метод.
 * Родитель, например компонент всей строки товара в корзине, уже исходя из этих данных может в своем
 * методе апдейтить глобальный стейт заказа, опираясь на title товара и прочие данные, которые тут не нужны.
 */
    //endregion
export class FormInputCounter extends PureComponent {

    state = {
        value: null
    };

    static getDerivedStateFromProps(props, state) {
        if (state.value === null) {
            return /^[0-9]+$/.test(props.initialValue) ? { value: props.initialValue } : { value: 1 }
        }
        return null;
    }

    static defaultProps = {
        getProcessedAmount: (value) => value,
        maxValue: 99,
        initialValue: 1,
        classList: ""
    };

    amountNormalize = (value, max) => {
        const currentAmount = isNaN(Math.abs(parseInt(value))) ? 1 : value;
        const maxValue = isNaN(Math.abs(parseInt(max))) ? 99 : max;
        return Math.max(1, Math.min(maxValue, currentAmount));
    };

    onChangeAmount = (evt) => {
        evt.preventDefault();
        const { target: { dataset: { action } } } = evt;
        const currentValue = action === "inc" ? this.state.value + 1 : this.state.value - 1;
        const value = this.amountNormalize(currentValue, this.props.maxValue);
        this.props.getProcessedAmount(value);
        this.setState({ value });
    };

    onInputBlur = ({ target: { value: inputValue } }) => {
        const value = this.amountNormalize(inputValue, this.props.maxValue);
        this.props.getProcessedAmount(value);
        this.setState({ value });
    };

    onInputChange = ({ target: { value }, nativeEvent: { inputType } }) => {
        if (inputType === "deleteContentBackward" || inputType === "deleteContentForward") {
            this.setState({ value });
        } else {
            if (!/^[0-9]+$/.test(value)) return;
            this.setState({ value });
        }
    };

    onKeyPress = (evt) => {
        if (evt.key === "Enter") evt.preventDefault();
    };

    render() {
        return (
            <div className={this.props.classList}>
                <button
                    onClick={this.onChangeAmount}
                    data-action="dec">
                    {this.props.badge ? "-" : null}
                </button>
                <label>
                    <input
                        onChange={this.onInputChange}
                        onBlur={this.onInputBlur}
                        onKeyPress={this.onKeyPress}
                        type="text"
                        value={this.state.value}
                    />
                </label>
                <button
                    onClick={this.onChangeAmount}
                    data-action="inc">
                    {this.props.badge ? "+" : null}
                </button>
            </div>
        );
    }
}

export default FormInputCounter;
