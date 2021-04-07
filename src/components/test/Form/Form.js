import React, { Component } from "react";

import setValidateSchema from "@components/Helpers/Validation/validateSchema/validateSchema";
import produce from "immer";
import Inputmask from "inputmask";
import * as yup from "yup";

class Form extends Component {
    constructor(props) {
        super(props);
        this.isFormTouched = false;
        this.form = React.createRef();
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

    handleSubmit = (evt) => {
        evt.preventDefault();
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

        const form = new FormData(this.form.current);
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
        return (
            <>
                <form
                    ref={this.form}
                    onSubmit={this.handleSubmit}
                    name="user-form"
                    method="POST"
                >

                </form>
            </>
        );
    }
}



export default Form;
