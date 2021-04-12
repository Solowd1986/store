import React, { Component } from "react";
import styles from "./form.module.scss";

import setValidateSchema from "@components/Helpers/Validation/validateSchema/validateSchema";
import produce from "immer";
import Inputmask from "inputmask";
import * as yup from "yup";
import InputText from "@components/test/Other/Form/Input/Input";
import SubmitButton from "@components/test/Form/SubmitButton/SubmitButton";
import InputField from "@components/test/Form/InputField/InputField";
import InputRadio from "@components/test/Form/InputRadio/InputRadio";
import InputCheckbox from "@components/test/Form/InputCheckbox/InputCheckbox";
import InputFile from "@components/test/Form/InputFile/InputFile";
import Cookies from "js-cookie";


class Form extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.validationSchema = setValidateSchema(["login", "email", "address"]);
        this.state = {
            isUserConfirmOrder: false,
            isFormValid: true,

            shipping: {
                type: "one"
            },
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

    componentDidMount() {
        if (Cookies.get("form-data")) {
            const cookieFormFields = Cookies.getJSON("form-data");
            const form = Array.from(this.form.current.elements);
            const fields = form.filter(item => Object.keys(cookieFormFields).includes(item.name));
            fields.forEach(item => item.value = cookieFormFields[item.name]);
        }
    }

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


    //region Описание
    /**
     * Для того чтобы отслеживать на оишбки динамически, проверяем, была ли уже вытсалвена ошибка для поля
     * или была ли state формы выставлен в false, это будет значить, что были попытки ввода и были ошибки, поэтому
     * даже поле быз ошибок проверяем в динамике, это нужно также чтобы в динамике разблочить кнопку отправки формы, а
     * не по blur. так это мненее понято, что для разблока нужно именно уйти из поля.
     */
        //endregion
    handleInputChange = ({ target, target: { name: inputName, value: inputValue } }) => {
        if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);
        if (this.state.fields[inputName].error || !this.state.isFormValid) {
            const checkedField = this.checkSingleFieldErrorSync(inputName, inputValue);
            if (!checkedField.error) {
                this.setState(
                    produce(this.state, (draft) => {
                        draft["fields"][checkedField.fieldName].error = false;
                        draft["fields"][checkedField.fieldName].msg = "";
                        if (this.validateForm(target.form.elements).isFormValid) {
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


    handleRadioChange = ({ target: { name: inputName, dataset: { type } } }) => {
        this.setState(
            produce(this.state, (draft) => {
                draft[inputName]["type"] = type;
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
        //this.setState({ isUserConfirmOrder: true });
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

                    <InputField
                        name={"shipping"}
                        type="radio"
                        checked={this.state.shipping.type === "one"}
                        value={1}
                        data-type="one"
                        onChange={this.handleRadioChange}
                    />
                    <InputField
                        name={"shipping"}
                        type="radio"
                        checked={this.state.shipping.type === "two"}
                        value={12}
                        data-type="two"
                        onChange={this.handleRadioChange}
                    />

                    <InputFile name={"asd"}/>

                    <SubmitButton disabled={!this.state.isFormValid}/>
                </form>
            </>
        );
    }
}


export default Form;
