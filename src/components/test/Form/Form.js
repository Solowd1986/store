import React, { Component } from "react";
import styles from "./form.module.scss";

import setValidateSchema from "@components/Helpers/Validation/validateSchema/validateSchema";
import produce from "immer";
import Inputmask from "inputmask";
import * as yup from "yup";
import InputText from "@components/test/Other/Form/Input/Input";
import SubmitButton from "@components/test/Form/SubmitButton/SubmitButton";
import InputField from "@components/test/Form/InputField/InputField";

class Form extends Component {
    constructor(props) {
        super(props);
        this.isFormTouched = false;
        this.form = React.createRef();
        this.validationSchema = setValidateSchema(["login","email", "address"]);
        this.state = {
            isUserConfirmOrder: false,
            isFormValid: true,
            // ПОМЕСТИ СТЕЙТ В РЕДАКС ЧТОбЫ ХРАНИТЬ ДАНЫЕ ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ А ПОСЛЕ УСПЕШНОЙ ОТПРАВКИ ОБНУЛЯ ЭТО
            // сброс кнопкой очистить поля формы
            fields: {
                login: {
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
                }
            },
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //return this.isFormTouched && !this.state.isUserConfirmOrder;
        return true;
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

    checkAllTrackedFields = () => {
        for (const [key, value] of Object.entries(this.state.fields)) {

            if (key === 'email') return;
            console.log(key);
            console.log(value);

        }


    };

    handleValidation = (inputName, inputValue) => {
        if (!(inputName in this.validationSchema.fields)) return;
        yup.reach(this.validationSchema, inputName)
            .validate(inputValue)
            .then((success) => {
                if (!this.state.fields[inputName].error && !this.state.fields[inputName].msg) return;
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






    checkFieldError = (inputName, inputValue) => {
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

    isFormValid = (fields) => {
        return this.validationSchema.isValidSync(this.getAllTrackedFields(fields));
    };

    isFormHasError = (fields) => {
        for (const [key, value] of Object.entries(this.getAllTrackedFields(fields))) {
            const field = this.checkFieldError(key, value);
            if (field.error) return field;
        }
        return { error: false };
    };


    handleInputChange = ({ target, target: { name: inputName, value: inputValue, id = null } }) => {
        if (this.state.fields[inputName].error || !this.state.isFormValid) {
            const checkedField = this.checkFieldError(inputName, inputValue);
            if (!checkedField.error) {
                this.setState(
                    produce(this.state, (draft) => {
                        draft["fields"][checkedField.fieldName].error = false;
                        draft["fields"][checkedField.fieldName].msg = "";
                        if (this.isFormValid(target.form.elements)) {
                            draft["isFormValid"] = true;
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


    handleOnBlur = ({ target, target: { name: inputName, value: inputValue, id = null } }) => {
        const checkedField = this.checkFieldError(inputName, inputValue);
        if (checkedField.error) {
            this.setState(
                produce(this.state, (draft) => {
                    draft["fields"][checkedField.fieldName].error = true;
                    draft["fields"][checkedField.fieldName].msg = checkedField.msg;
                    if (this.state.isFormValid) {
                        draft["isFormValid"] = false;
                    }
                }),
            );
        }
    };


    handleSubmit = (evt) => {
        evt.preventDefault();
        const { target: form, target: { elements: formFields } } = evt;
        const validityField = this.isFormHasError(formFields);

        if (validityField.error) {
            this.setState(
                produce(this.state, (draft) => {
                    draft["fields"][validityField.fieldName].error = true;
                    draft["fields"][validityField.fieldName].msg = validityField.msg;
                    draft["isFormValid"] = false;
                }),
            );
            return;
        }







        //console.log(this.checkFieldError("name", "олег"));
        //console.log(this.getAllTrackedFields(formFields));




        //this.checkAllTrackedFields();


        return;

        this.isFormTouched = true;
        const fields = {};

        Array.from(this.form.current.elements).forEach((item) => {
            if (Object.keys(this.state.fields).includes(item.name)) {
                fields[item.name] = item.value;
                this.handleValidation(item.name, item.value);
            }
        });

        if (!this.validationSchema.isValidSync(fields)) {
            this.setState({ isFormValid: false });
            return;
        }

        const form1 = new FormData(this.form.current);
        const userOrderInfo = {
            userInfo: {},
            userOrder: [],
        };

        for (const [key, value] of form.entries()) {
            const product = this.props.listOfProducts.find((item) => item.title === key);
            if (product) userOrderInfo.userOrder.push(product);
            if (key === "shipping") {
                userOrderInfo.userInfo["shippingType"] = this.state.fields.shipping.type;
                userOrderInfo.userInfo["shippingPrice"] = this.state.fields.shipping.price;
            } else {
                userOrderInfo.userInfo[key] = value;
            }
        }
        evt.target.reset();
        //console.dir(userOrderInfo);
        this.setState({ isUserConfirmOrder: true });
    };

    handleChange = ({ target, target: { name: inputName, value: inputValue, id = null } }) => {
        this.isFormTouched = true;
        if (!Object.keys(this.state.fields).includes(inputName)) return;
        if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);
        if (id) {
            const result = inputName === "shipping" ? { type: id, price: parseInt(inputValue) } : { type: id };
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
        return (
            <>
                <form
                    ref={this.form}
                    onSubmit={this.handleSubmit}
                    name="user-form"
                    method="POST"
                    className={styles.form}>
                    <InputField
                        name={"login"}
                        error={this.state.fields.login}
                        onChange={this.handleInputChange}
                        onBlur={this.handleOnBlur}
                    />
                    <InputField
                        name={"email"}
                        error={this.state.fields.email}
                        defaultValue="trems@yandex.ru"
                        onChange={this.handleInputChange}
                        onBlur={this.handleOnBlur}
                    />
                    <InputField
                        name={"address"}
                        error={this.state.fields.address}
                        onChange={this.handleInputChange}
                        onBlur={this.handleOnBlur}

                    />
                    <SubmitButton disabled={!this.state.isFormValid}/>
                </form>
            </>
        );
    }
}


export default Form;
