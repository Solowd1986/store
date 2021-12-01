import React, { useState } from "react";


const FormInputCounter = (props:any) => {

    const [value, setValue] = useState<number>(1);

    const amountNormalize = (value:any, max:any) => {
        const currentAmount = isNaN(Math.abs(parseInt(value))) ? 1 : value;
        const maxValue = isNaN(Math.abs(parseInt(max))) ? 99 : max;
        return Math.max(1, Math.min(maxValue, currentAmount));
    };

    const onChangeAmount = (evt:any) => {
        evt.preventDefault();
        const { target: { dataset: { action } } } = evt;
        const currentValue = action === "inc" ? value + 1 : value - 1;
        const normalizedValue = amountNormalize(currentValue, maxValue);
        getProcessedAmount(normalizedValue);
        setValue(normalizedValue);
    };


    const onInputBlur = ({ target: { value: inputValue } }:any) => {
        const value = amountNormalize(inputValue, maxValue);
        getProcessedAmount(value);
        setValue(value);
    };

    const onInputChange = ({ target: { value }, nativeEvent: { inputType } }:any) => {
        if (inputType === "deleteContentBackward" || inputType === "deleteContentForward") {
            setValue(value);
        } else {
            if (!/^[0-9]+$/.test(value)) return;
            setValue(value);
        }
    };

    const onKeyPress = (evt:any) => {
        if (evt.key === "Enter") evt.preventDefault();
    };


    const {initialValue, maxValue, getProcessedAmount, classList} = props;


    return (
        <div className={classList}>
            <button
                onClick={onChangeAmount}
                data-action="dec">
            </button>
            <label>
                <input
                    onChange={onInputChange}
                    onBlur={onInputBlur}
                    onKeyPress={onKeyPress}
                    type="text"
                    value={value}
                />
            </label>
            <button
                onClick={onChangeAmount}
                data-action="inc">
            </button>
        </div>
    );


};




//region Описание
/**
 * Компонент отвечает лишь за приведение количества выбранного товара к нормализованному виду.
 * Эти данные он при onBlur сохраняет в своей state и возращает через отданный родителем метод.
 * Родитель, например компонент всей строки товара в корзине, уже исходя из этих данных может в своем
 * методе апдейтить глобальный стейт заказа, опираясь на title товара и прочие данные, которые тут не нужны.
 *
 * getDerivedStateFromProps - в данном блоке мы получаем исходные данные о количестве товара, на их основе формируется
 * начальынй state. Просто передать props как value нельзя, так как нужно менять по onChange value в широких пределах,
 * а props этого сделать не позволят, props уже про корректное значение товара. Полученные данные проверяются на число
 * и на превышение максимума, то есть, превышает ли запрошенное количество товара максимально доступное для заказа.
 */
    //endregion


// export class FormInputCounter extends PureComponent {
//
//     state = {
//         value: null
//     };
//
//     static getDerivedStateFromProps(props, state) {
//         if (state.value === null) {
//             return /^[0-9]+$/.test(props.initialValue)
//                 ? { value: Math.min(props.initialValue, props.maxValue) }
//                 : { value: 1 }
//         }
//         return null;
//     }
//
//     static defaultProps = {
//         getProcessedAmount: (value) => value,
//         maxValue: 99,
//         initialValue: 1,
//         classList: ""
//     };
//
//     amountNormalize = (value, max) => {
//         const currentAmount = isNaN(Math.abs(parseInt(value))) ? 1 : value;
//         const maxValue = isNaN(Math.abs(parseInt(max))) ? 99 : max;
//         return Math.max(1, Math.min(maxValue, currentAmount));
//     };
//
//     onChangeAmount = (evt) => {
//         evt.preventDefault();
//         const { target: { dataset: { action } } } = evt;
//         const currentValue = action === "inc" ? this.state.value + 1 : this.state.value - 1;
//         const value = this.amountNormalize(currentValue, this.props.maxValue);
//         this.props.getProcessedAmount(value);
//         this.setState({ value });
//     };
//
//     onInputBlur = ({ target: { value: inputValue } }) => {
//         const value = this.amountNormalize(inputValue, this.props.maxValue);
//         this.props.getProcessedAmount(value);
//         this.setState({ value });
//     };
//
//     onInputChange = ({ target: { value }, nativeEvent: { inputType } }) => {
//         if (inputType === "deleteContentBackward" || inputType === "deleteContentForward") {
//             this.setState({ value });
//         } else {
//             if (!/^[0-9]+$/.test(value)) return;
//             this.setState({ value });
//         }
//     };
//
//     onKeyPress = (evt) => {
//         if (evt.key === "Enter") evt.preventDefault();
//     };
//
//     render() {
//         return (
//             <div className={this.props.classList}>
//                 <button
//                     onClick={this.onChangeAmount}
//                     data-action="dec">
//                 </button>
//                 <label>
//                     <input
//                         onChange={this.onInputChange}
//                         onBlur={this.onInputBlur}
//                         onKeyPress={this.onKeyPress}
//                         type="text"
//                         value={this.state.value}
//                     />
//                 </label>
//                 <button
//                     onClick={this.onChangeAmount}
//                     data-action="inc">
//                 </button>
//             </div>
//         );
//     }
// }

export default FormInputCounter;
