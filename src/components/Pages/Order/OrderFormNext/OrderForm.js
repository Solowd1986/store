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
import Form from "@components/Partials/Form/Form";
import Cookies from "js-cookie";


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
        this.form = React.createRef();
        this.validationSchema = setValidateSchema(["name", "phone", "email", "address", "comment"]);
        this.state = {
            isUserConfirmOrder: false,
            isFormValid: true,
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
                    assignment: "moscow",
                    price: 400
                },
                payment: {
                    assignment: "cash"
                },
            },
        };
    }

    componentDidMount() {
        if (Cookies.get("form-data")) {
            const cookieFormFields = Cookies.getJSON("form-data");
            const form = Array.from(this.form.current.elements);
            const fields = form.filter(item => Object.keys(cookieFormFields).includes(item.name));
            fields.forEach(item => item.value = cookieFormFields[item.name]);
            const formValiditaionData = this.validateForm(this.form.current.elements);
            if (!formValiditaionData.isFormValid) {
                this.setState(
                    produce(this.state, (draft) => {
                        draft["isFormValid"] = false;
                        draft["fields"][formValiditaionData.errors[0].fieldName].error = true;
                        draft["fields"][formValiditaionData.errors[0].fieldName].msg = formValiditaionData.errors[0].msg;
                    }),
                );
            }
        }
    }

    saveFormValuesToCookie = (fieldName, fieldValue) => {
        const cookieExpires = new Date(new Date().getTime() + 15 * 60 * 1000);
        const formField = { [fieldName]: fieldValue };
        const dataForm = Cookies.getJSON("form-data") || null;

        if (!dataForm) {
            Cookies.set("form-data", formField, { expires: cookieExpires });
            return;
        }
        if (!Object.keys(dataForm).includes(fieldName)) {
            dataForm[fieldName] = fieldValue;
            Cookies.set("form-data", dataForm, { expires: cookieExpires });
            return;
        }
        for (const [cookieFieldKey, cookieFieldValue] of Object.entries(dataForm)) {
            if (cookieFieldKey === fieldName && cookieFieldValue === fieldValue) return;
            if (cookieFieldKey === fieldName) dataForm[fieldName] = fieldValue;
        }
        Cookies.set("form-data", dataForm, { expires: cookieExpires });
    };

    checkSingleFieldErrorSync = (inputName, inputValue) => {
        try {
            this.validationSchema.validateSyncAt(inputName, { [inputName]: inputValue });
            return { fieldName: inputName, error: false };
        } catch (error) {
            return { fieldName: inputName, error: true, msg: error.message };
        }
    };

    getAllTrackedFields = (fields) => {
        const formFieldsToObject = {};
        const validationFields = Object.keys(this.validationSchema.fields);
        const formFields = Array.from(fields).filter(item => validationFields.includes(item.name));
        formFields.forEach(item => formFieldsToObject[item.name] = item.value);
        return formFieldsToObject;
    };


    validateForm = (fields) => {
        const errors = [];
        const allFormFields = this.getAllTrackedFields(fields);
        for (const [key, value] of Object.entries(allFormFields)) {
            const field = this.checkSingleFieldErrorSync(key, value);
            if (field.error) errors.push(field);
        }
        return {
            isFormValid: this.validationSchema.isValidSync(allFormFields),
            errors
        }
    };

    /**
     * Для того чтобы отслеживать на оишбки динамически, проверяем, была ли уже вытсалвена ошибка для поля
     * или была ли state формы выставлен в false, это будет значить, что были попытки ввода и были ошибки, поэтому
     * даже поле быз ошибок проверяем в динамике, это нужно также чтобы в динамике разблочить кнопку отправки формы, а
     * не по blur. так это мненее понято, что для разблока нужно именно уйти из поля.
     */
    handleInputChange = ({ target, target: { name: inputName, value: inputValue } }) => {
        if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);
        if (this.state.fields[inputName].error || !this.state.isFormValid) {
            const checkedField = this.checkSingleFieldErrorSync(inputName, inputValue);
            if (!checkedField.error) {
                const formValiditaionData = this.validateForm(target.form.elements);
                this.setState(
                    produce(this.state, (draft) => {
                        draft["fields"][checkedField.fieldName].error = false;
                        draft["fields"][checkedField.fieldName].msg = "";
                        if (formValiditaionData.isFormValid) {
                            draft["isFormValid"] = true;
                        } else {
                            draft["fields"][formValiditaionData.errors[0].fieldName].error = true;
                            draft["fields"][formValiditaionData.errors[0].fieldName].msg = formValiditaionData.errors[0].msg;
                        }
                    }),
                );
            } else {
                if (this.state.fields[inputName].msg === checkedField.msg) return;
                this.setState(
                    produce(this.state, (draft) => {
                        draft["fields"][checkedField.fieldName].error = true;
                        draft["fields"][checkedField.fieldName].msg = checkedField.msg;
                    }),
                );
            }
        }
    };

    handleInputBlur = ({ target, target: { name: inputName, value: inputValue, id = null } }) => {
        const checkedField = this.checkSingleFieldErrorSync(inputName, inputValue);
        if (checkedField.error) {
            this.setState(
                produce(this.state, (draft) => {
                    draft["fields"][checkedField.fieldName].error = true;
                    draft["fields"][checkedField.fieldName].msg = checkedField.msg;
                    draft["isFormValid"] = false;
                }),
            );
        } else {
            this.saveFormValuesToCookie(inputName, inputValue);
        }
    };

    handleRadioChange = ({ target: { id, name: inputName, dataset: { price = null } } }) => {
        this.setState(
            produce(this.state, (draft) => {
                draft["fields"][inputName]["assignment"] = id;
                if (price) draft["fields"][inputName]["price"] = price;
            })
        );
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const { target: form, target: { elements: formFields } } = evt;

        if (!this.validateForm(formFields).isFormValid) {
            const firstFieldWithError = this.validateForm(formFields).errors[0];
            this.setState(
                produce(this.state, (draft) => {
                    draft["fields"][firstFieldWithError.fieldName].error = true;
                    draft["fields"][firstFieldWithError.fieldName].msg = firstFieldWithError.msg;
                    draft["isFormValid"] = false;
                }),
            );
            return;
        }

        const formData = new FormData(form);
        Cookies.remove("form-data");
        form.reset();
        this.setState({ isUserConfirmOrder: true });
    };

    resetFormConfirmation = () => this.setState({ isUserConfirmOrder: false });

    render() {
        const ConfirmModalWindow = withDelay(withModal(Confirm));
        return (
            <>
                { this.state.isUserConfirmOrder && <ConfirmModalWindow reset = {this.resetFormConfirmation}/>}

                <form ref={this.form} onSubmit={this.handleSubmit} className={styles.form} name="order-form" method="POST">
                    <OrderInfo
                        handleInputChange={this.handleInputChange}
                        handleRadioChange={this.handleRadioChange}
                        handleInputBlur={this.handleInputBlur}
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
