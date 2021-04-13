import React, { Component } from "react";
import styles from "./order-form.module.scss";

import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";

import Confirm from "@components/Pages/Order/Confirm/Confirm";
import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
import withModal from "@components/Helpers/Hoc/withModal/withModal";
import * as cartSelectors from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";

import setValidateSchema from "@components/Helpers/Validation/validateSchema/validateSchema";
import Inputmask from "inputmask";
import * as yup from "yup";
import produce from "immer";

//<editor-fold desc="Описание работы submit формы">
/**
 * Ход работы формы:
 * 1. Клик по кнопке submit ставит флаг isTouched. Проверяются все поля формы на ошибки, заполняется state errors, если есть
 * 2. Проводим общую проверку формы, если есть ошибки - ставим флаг isFormValid в false и перерисовываем компонент.
 * 3. Поскольку ранее мы проверили все элементы, то на этапе render все полученные ошибки будут показаны.
 * 4. Если пользователь исправил ошибки и снова жмет submit, то меняем isUserConfirmOrder в true.
 * 5. Это вызывает вход в shouldComponentUpdate, isFormTouched равно true, isUserConfirmOrder пока false, на этом этапе.
 * 6. Проходит render, выводится модальное окно с подтверждением. Тут же меняется isTouched на false.
 * 7. Далее этап componentDidUpdate, this.isFormTouched сейчас false, а isUserConfirmOrder уже true, меняем его через setState
 * 8. По идее, это вызывает re-render, а значит, должно пропасть модальное окно.
 * 9. Но в блоке shouldComponentUpdate поводом для render является isFormTouched равное true, а сейчас оно сброшено в false
 * 10. Поэтому любой re-render будет запрещен.
 * 11. Для того, чтобы дальше все работало корректно, каждый вызов обработчика действий пользователя, Submit или Change ставит
 *     isFormTouched в true, а isUserConfirmOrder сброшено в false ранее(в componentDidUpdate). Поэтому re-render's пройдут.
 */
//</editor-fold>
class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.isFormTouched = false;
        this.validationSchema = setValidateSchema(["name", "phone", "email", "address", "comment"]);
        this.state = {
            isUserConfirmOrder: false,
            isFormValid: true,
            // ПОМЕСТИ СТЕЙТ В РЕДАКС ЧТОбЫ ХРАНИТЬ ДАНЫЕ ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ А ПОСЛЕ УСПЕШНОЙ ОТПРАВКИ ОБНУЛЯ ЭТО
            // сброс кнопкой очистить поля формы
            fields: {
                name: {
                    error: false,
                    msg: "",
                },
                phone: {
                    error: false,
                    msg: "",
                },
                email: {
                    error: false,
                    msg: "",
                },
                address: {
                    error: false,
                    msg: "",
                },
                comment: {
                    error: false,
                    msg: "",
                },
                shipping: {
                    type: "moscow",
                    price: 400
                },
                payment: {
                    type: "cash"
                },
            },
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.isFormTouched && !this.state.isUserConfirmOrder;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.isFormTouched && this.state.isUserConfirmOrder) {
            this.setState({ isUserConfirmOrder: false });
        }
    }

    checkFieldsErrors = () => {
        const verifyFields = Object.values(this.state.fields).filter((item) => item.error !== undefined);
        if (!this.state.isFormValid && verifyFields.every((item) => !item.error)) {
            this.setState({ isFormValid: true });
        }
    };

    processedUserOrder = (form, initialOrderList) => {
        const userOrderInfo = {
            userInfo: {},
            userOrder: [],
        };

        for (const [key, value] of form.entries()) {
            const product = initialOrderList.find((item) => item.title === key);
            if (product) userOrderInfo.userOrder.push(product);
            if (key === "shipping") {
                userOrderInfo.userInfo["shippingType"] = this.state.fields.shipping.type;
                userOrderInfo.userInfo["shippingPrice"] = this.state.fields.shipping.price;
            } else {
                userOrderInfo.userInfo[key] = value;
            }
        }
        return userOrderInfo;
    };

    handleValidation = (inputName, inputValue) => {
        if (!(inputName in this.validationSchema.fields)) return;

        yup.reach(this.validationSchema, inputName)
            .validate(inputValue)
            .then((success) => {
                //if (!this.state.fields[inputName].error) return;
                this.setState(
                    produce(this.state, (draft) => {
                        draft["fields"][inputName].error = false;
                        draft["fields"][inputName].msg = "";
                    }),
                );
            })
            .catch((error) => {
                if (error.message === this.state.fields[inputName].msg) return;
                this.setState(
                    produce(this.state, (draft) => {
                        draft["fields"][inputName].error = true;
                        draft["fields"][inputName].msg = error.message;
                        draft["isFormValid"] = false;
                    }),
                );
            });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const { target, target: { elements: formFields } } = evt;

        this.isFormTouched = true;
        const fields = {};

        Array.from(formFields).forEach((item) => {
            if (Object.keys(this.state.fields).includes(item.name)) {
                fields[item.name] = item.value;
                this.handleValidation(item.name, item.value);
            }
        });

        if (!this.validationSchema.isValidSync(fields)) {
            this.setState({ isFormValid: false });
            return;
        }

        const order = this.processedUserOrder(new FormData(target), this.props.listOfProducts);
        target.reset();
        //console.dir(order);
        this.setState({ isUserConfirmOrder: true });
    };

    handleBlur = () => {

    };

    handleChange = ({ target, target: { name: inputName, value: inputValue, id = null } }) => {
        this.isFormTouched = true;
        //if (!Object.keys(this.state.fields).includes(inputName)) return;
        if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);

        if (id) {
            const result = inputName === "shipping" ? { type: id, price: parseInt(inputValue)} : { type: id};
            this.setState(
                produce(this.state, (draft) => {
                    draft["fields"][inputName] = result;
                }),
            );
            return;
        }

        this.handleValidation(inputName, inputValue);
        // каждый ввод тест на ошибки всей формы, если все ок - true в isFormValid, и снятие disabled с кнопки submit
        this.checkFieldsErrors();
    };

    render() {
        //console.log("render");
        let ConfirmModalWindow = null;
        if (this.state.isUserConfirmOrder && this.isFormTouched) {
            ConfirmModalWindow = withDelay(withModal(Confirm));
            this.isFormTouched = false;
        }
        return (
            <>


                {ConfirmModalWindow ? <ConfirmModalWindow /> : null}
                <form
                    onSubmit={this.handleSubmit}
                    className={styles.form}
                    name="order-form"
                    method="POST">
                    <OrderInfo
                        handleChange={this.handleChange}
                        fields={this.state.fields}
                        shipping={this.state.fields.shipping}
                        payment={this.state.fields.payment}
                    />
                    <OrderSummary
                        isFormValid={this.state.isFormValid}
                        shipping={this.state.fields.shipping.price}
                    />
                </form>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        listOfProducts: cartSelectors.cartItemsSelector(state),
    };
}

export default connect(mapStateToProps)(OrderForm);
