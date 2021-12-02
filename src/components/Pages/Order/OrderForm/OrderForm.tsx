import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import styles from "./order-form.module.scss";

import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";

import setValidateSchema from "@components/Pages/Order/OrderForm/validationSchema/validationSchema";
import Inputmask from "inputmask";
import produce from "immer";
import Cookies from "js-cookie";

import * as cartSelectors from "@redux/entities/cart/selectors/cartSelectors";
import { connect } from "react-redux";

import ModalWrapper from "@components/Helpers/Hooks/ModalWrapper/ModalWrapper";
import Confirm from "@components/Pages/Order/Confirm/Confirm";


interface OrderState {
    isUserConfirmOrder: boolean,
    isFormTouched: boolean,
    isFormValid: boolean,

    fields: {
        name: {
            error: boolean,
            msg: string,
        },
        phone: {
            error: boolean,
            msg: string,
        },
        email: {
            error: boolean,
            msg: string,
        },
        address: {
            error: boolean,
            msg: string,
        },
        comment: {
            error: boolean,
            msg: string,
        },
        shipping: {
            assignment: string,
            price: number
        },
        payment: {
            assignment: string
        },
    },
}


const initalState = {
    isUserConfirmOrder: false,
    isFormTouched: false,
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

const validationSchema = setValidateSchema(["name", "phone", "email", "address", "comment"]);






type formFieldsToObjectType = {
    [key: string]: any
}
type FieldsTypes = {
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
    }


};


type Fields = formFieldsToObjectType & FieldsTypes;


const OrderForm = () => {

    const [state, setState] = useState<OrderState>(initalState);
    const form = useRef<HTMLFormElement>(null);


    useEffect(() => {
        if (!form.current) return;
        if (Cookies.get("form-data")) {
            const cookieFormFields = Cookies.getJSON("form-data");
            const formAray = Array.from(form.current.elements);
            const fields = formAray.filter((item:any) => Object.keys(cookieFormFields).includes(item.name));
            fields.forEach((item:any) => item.value = cookieFormFields[item.name]);
            const formValiditaionData = validateForm();

            if (!formValiditaionData.isFormValid) {
                showAllFormErrors();
            }
        }
    }, []);


    /**
     * Метод для сохранения значения поля в куку на 15 минут, если значение валидное. Если данные уже есть, то есть
     * это не первое поле, то дополняем обьект с полями, иначе создаем новый. Вторая проверка применяется, если такого поля
     * еще не вводили, тут создаем его и заполняем значение, после выходим из метода. Третий вариант, если поле уже было,
     * но значение новое, тут мы обходим обьект в цикле, получая имя поля и его значение, если такое имя поля есть и
     * такое значение тоже, значит ничего не изменилось - выходим. Иначе, если поле есть - вписываем данные, проверка не нужна,
     * так как выше мы выходим при совпадении значений.
     */
    const saveFormValuesToCookie = (fieldName: string, fieldValue:string) => {
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


    /**
     * Получаем все отслеживаемые поля формы, создаем пустой обьект и массив из ключей-полей формы, они основаны на схеме
     * валидации, то есть это список всех полей, коорые мы валидируем в этой форме. Далее отсеиваем из переданных в метод списка
     * полей только те, что входят в список валидируемых.
     * Далее в ицкле заполняем обьект набором "название поля формы - его значение" и возвращаем.
     */
    const getAllTrackedFields = () => {
        if (!form.current) return null;
        const formFieldsToObject:formFieldsToObjectType = {};
        const validationFields = Object.keys(validationSchema.fields);
        const formFields = Array.from(form.current.elements).filter((item:any) => validationFields.includes(item.name));
        formFields.forEach((item:any) => formFieldsToObject[item.name] = item.value);
        return formFieldsToObject;
    };

    /**
     * Проверка конкретного поля на ошибку. Получаем имя поля и значение, за счет метода validateSyncAt (из yup),
     * если все ок, возвращаем обьект формата state - то есть обьект с именем поля и false-ошибкой. Иначе - вернем
     * обьект с именем поля, true-ошибкой и текстом этой оишбки. Помни, что validateSyncAt требует обертки из try/catch
     */
    const checkSingleFieldErrorSync = (inputName:string, inputValue:unknown) => {
        try {
            validationSchema.validateSyncAt(inputName, { [inputName]: inputValue });
            return { fieldName: inputName, error: false };
        } catch (error) {
            return { fieldName: inputName, error: true, msg: error.message };
        }
    };


    /**
     * Валидация всей формы, target.form.elements - все поля формы.
     * getAllTrackedFields - вернет обьект с набором полей формы и их значениями. Обходя этот обьект в цикле, проверяем каждое
     * поле. Если получена ошибка - обьект помещается в массив оишбок (errors). По окончании работы цикла возвращаем обьект,
     * с двумя полями: валидна ли форма в целом isFormValid - true/false и массив ошибок, либо пустой, либо нет.
     */
    const validateForm = () => {
        const errors = [];
        const allFormFields:any = getAllTrackedFields();
        for (const [key, value] of Object.entries(allFormFields)) {
            const field = checkSingleFieldErrorSync(key, value);
            if (field.error) errors.push(field);
        }
        return {
            isFormValid: validationSchema.isValidSync(allFormFields),
            errors
        }
    };

    /**
     * Этот метод передаем блоку OrderInfo, в нем он прописывается нужным полям.
     * Обработка radio-кнопок, из-за отличия из state-вида от текстовых полей. Это кнопки это либо город доставки, либо тип оплаты.
     * Текстовое значение, типа moscow или cash берется из id атрибуты формы. Также у типа доставки есть поле цена - проверяем и
     * заполняем его, если есть.
     */
    const handleRadioChange = ({ target: { id, name: inputName, dataset: { price = null} } }:any) => {
        setState(
            produce(state, (draft:any) => {
                draft["fields"][inputName]["assignment"] = id;
                if (price) draft["fields"][inputName]["price"] = price;
            })
        );
    };


    /**
     * Данный блок используется только для сохранения значения поля в куке, чтобы не вводить верное значение
     * по новой при перезагрузке страницы.
     */
    const handleInputBlur = ({ target: { name: inputName, value: inputValue } }:any) => {
        const checkedField = checkSingleFieldErrorSync(inputName, inputValue);
        if (!checkedField.error) saveFormValuesToCookie(inputName, inputValue);
    };


    /**
     * Изначально все проверяемые поля имеют статус ошибки false (то есть ошибки нет), а форма isFormValid в true и
     * isFormTouched в false
     * Это позволяет первый раз начав заполнять форму не видеть ошибки. Динамический показ ошибок включается при
     * isFormTouched в true. Смысл isFormTouched такой: нам нужно показывать ошибки ввода не сразу, а когда человек
     * первый раз ошибся. Это выявляется при первой попытке отправки формы и далее каждый ввод динамически
     * демонстрирует ошибки ввода. Важно заметить, что isFormTouched больше уже не меняется, если выставлена в true,
     * кроме вызова принудительного сброса значений формы.
     *
     * Теперь пользователь начинает исправлять данные и динамическая проверка работает.
     * Если ошибки для текущего поля нет, то сбрасываем его данные об ошибке, и если кроме этого поля все тоже ок,
     * то и форму ставим валидной (то есть разблокируем кнопку отправки).
     * Если же ошибка в текущем поле (где идет ввод) все же есть, то проверяем, не выставлена ли она уже ранее.
     * Если да - то ничего не меняем, ведь ошибка уже показна и перерисовывать ничего не нужно. Иначе - указываем новую ошибку.
     */
    const handleInputChange = ({ target, target: { name: inputName, value: inputValue } }:any) => {
        if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);
        if (state.isFormTouched) {
            const checkedField = checkSingleFieldErrorSync(inputName, inputValue);
            if (!checkedField.error) {
                const formValiditaionData = validateForm();
                setState(
                    produce(state, (draft:any) => {
                        draft["fields"][checkedField.fieldName].error = false;
                        draft["fields"][checkedField.fieldName].msg = "";
                        formValiditaionData.isFormValid ? draft["isFormValid"] = true : draft["isFormValid"] = false;
                    }),
                );
            } else {
                // проблема в обращении к высиялемому ключу, по хорошему это нужно описывать иначе
                const fields:formFieldsToObjectType = {...state.fields};
                if (fields[inputName].msg === checkedField.msg) return;
                setState(
                    produce(state, (draft:any) => {
                        draft["isFormValid"] = false;
                        draft["fields"][checkedField.fieldName].error = true;
                        draft["fields"][checkedField.fieldName].msg = checkedField.msg;
                    }),
                );
            }
        }
    };

    /**
     * Если проверка на валидность формы не пройдена, то сначала собираем все ошибки формы. Для этого создаем обьект под
     * часть state, а именно fields. В этом обьекте мы заменим лишь те поля, что содержат ошибки, прочие не затронем. Для этого
     * в цикле обходим весь набор валидированных полей формы (а там точно есть оишбки, без этого мы бы не попали в условие),
     * и если поле из этого набора присутствует в ключах state -> fields, то создаем новый обьект и заполняем его данными
     * об ошибке. То есть не меняем поля обьекта, а заменяем сам обьект. Это чтобы не мутировать весь fields.
     * Также, если ошибки есть, то сразу указываем форму touched и невалидной.
     */
    const showAllFormErrors = () => {
        if (!validateForm().isFormValid) {
            const fields:any = { ...state.fields };
            validateForm().errors.forEach((item:any) => {
                if (Object.keys(fields).includes(item.fieldName)) {
                    fields[item.fieldName] = { error: true, msg: item.msg };
                }
            });

            setState(
                produce(state, (draft) => {
                    draft["isFormTouched"] = true;
                    draft["isFormValid"] = false;
                    draft["fields"] = fields;
                }),
            );
        }
    };

    /**
     * Отправная точка для проверки формы. До попытки отправки нет динамических проверок, можно вводить что угодно.
     * Первая попытка отправки выявляет все ошибки и показывает их, до исправления - кнопка отправки формы блокируется.
     * Для начала динамической проверки полей формы, флаг isFormTouched ставится в true
     *
     * Если же все нормально, то очищаем куки и сбрасываем форму, данные как бы тут уходят на сервер, далее
     * показываем окно подтвержденияза счет смены isUserConfirmOrder.
     *
     * Тут не используется полный сброс формы resetOrderForm, так как там isUserConfirmOrder сбрасывается в false, а тут нужно
     * true для показа картинки.
     */
    const handleSubmit = (evt:any) => {
        evt.preventDefault();

        if (!validateForm().isFormValid) {
            showAllFormErrors();
            return;
        }

        const formData = new FormData(evt.target);
        Cookies.remove("form-data");
        evt.target.reset();
        setState({ ...state, isUserConfirmOrder: true });
    };

    /**
     * Метод сброса подтверждения отправки формы, передаем его в модалку, которая выводится после подтверждения. Тогда
     * клик по ней вызове сброс поля isUserConfirmOrder в текущем state и при любой перерисовке не появится неуместное
     * окно подттверждения. Также форма опять обозначится как нетронутоая пользователем.
     * Событие нужно, чтобы отменить поведение кнопки, которая будучи помещена в форму, провоцирует ее отправку при клике.
     * И у нас есть такая кнопка очистки формы в OrderSummary.
     * Но события может не быть, например, если мы передали метод куда-то, где он вызывается не при клике, проверка для этого
     */
    const resetOrderForm = (evt:any) => {
        if (evt) evt.preventDefault();
        Cookies.remove("form-data");
        form.current?.reset();

        const fields:any = { ...state.fields };
        Object.keys(fields).forEach((item:any) => {
            const allTrackedFields = getAllTrackedFields();
            if (!allTrackedFields) return;
            if (Object.keys(allTrackedFields).includes(item))
                fields[item] = { error: false, msg: "" };
        });

        setState(
            produce(state, (draft) => {
                draft["isFormTouched"] = false;
                draft["isUserConfirmOrder"] = false;
                draft["isFormValid"] = true;
                draft["fields"] = fields;
            }),
        );
    };

    // Если нажата клавиша Enter, то вызываем клик по кнопке отправки формы и убираем фокус с поля. Это нужно для того,
    // чтобы помешать куче отправок при зажатии клавиши.
    const handleKeyPress = (evt: any) => {
        if (evt.keyCode === 13) {
            Array.from(evt.target.form.elements).find((item:any) => {
                if (item.attributes.type && item.attributes.type.value === "submit") {
                    item.click();
                    evt.target.blur();
                }
            });
        }
    };

    const ConfirmModalDialog = useMemo(() => ModalWrapper(Confirm), []);

    return (
        <>
            {state.isUserConfirmOrder && <ConfirmModalDialog bg={true} interactions={true} reset={resetOrderForm}/>}
            <form ref={form}
                  onSubmit={handleSubmit}
                  onKeyDown={handleKeyPress}
                  className={styles.form}
                  name="order-form" method="POST">
                <OrderInfo
                    handleInputChange={handleInputChange}
                    handleRadioChange={handleRadioChange}
                    handleInputBlur={handleInputBlur}
                    fields={state.fields}
                    shipping={state.fields.shipping}
                    payment={state.fields.payment}
                />
                <OrderSummary
                    isFormValid={state.isFormValid}
                    shipping={state.fields.shipping.price}
                    resetOrderForm={resetOrderForm}
                />
            </form>
        </>
    );
};




// class OrderForm extends Component {
//     constructor(props) {
//         super(props);
//         this.form = React.createRef();
//         this.validationSchema = setValidateSchema(["name", "phone", "email", "address", "comment"]);
//         this.state = {
//             isUserConfirmOrder: false,
//             isFormTouched: false,
//             isFormValid: true,
//             fields: {
//                 name: {
//                     error: false,
//                     msg: "",
//                 },
//                 phone: {
//                     error: false,
//                     msg: "",
//                 },
//                 email: {
//                     error: false,
//                     msg: "",
//                 },
//                 address: {
//                     error: false,
//                     msg: "",
//                 },
//                 comment: {
//                     error: false,
//                     msg: "",
//                 },
//                 shipping: {
//                     assignment: "moscow",
//                     price: 400
//                 },
//                 payment: {
//                     assignment: "cash"
//                 },
//             },
//         };
//     }
//
//     /**
//      * При монтировании компонента через пакет работы с куками проверяем, записаны ли в них какие-то данные. Это нужно для того,
//      * чтоб при перезагрузке страницы пользователь не терял данные. Для этого берем обьект сохраненных полей, преобразовываем
//      * в массив, получая лишь ключи (то есть названия полей формы), фильтруем все поля формы, чтобы получить лишь те, что
//      * есть в массиве ключей из кук, так получаем лишь сохраненные поля. Обходим их в цикле и записываем в них данные из кук.
//      * Тут же проверяем форму на наличие ошибок, и если таковые есть, то берем первую же ошибку, фиксируем ее и обозначаем всю
//      * форму как невалидную.
//      */
//     componentDidMount() {
//         if (Cookies.get("form-data")) {
//             const cookieFormFields = Cookies.getJSON("form-data");
//             const form = Array.from(this.form.current.elements);
//             const fields = form.filter(item => Object.keys(cookieFormFields).includes(item.name));
//             fields.forEach(item => item.value = cookieFormFields[item.name]);
//             const formValiditaionData = this.validateForm(this.form.current.elements);
//
//             if (!formValiditaionData.isFormValid) {
//                 this.showAllFormErrors();
//             }
//         }
//     }
//
//     /**
//      * Метод для сохранения значения поля в куку на 15 минут, если значение валидное. Если данные уже есть, то есть
//      * это не первое поле, то дополняем обьект с полями, иначе создаем новый. Вторая проверка применяется, если такого поля
//      * еще не вводили, тут создаем его и заполняем значение, после выходим из метода. Третий вариант, если поле уже было,
//      * но значение новое, тут мы обходим обьект в цикле, получая имя поля и его значение, если такое имя поля есть и
//      * такое значение тоже, значит ничего не изменилось - выходим. Иначе, если поле есть - вписываем данные, проверка не нужна,
//      * так как выше мы выходим при совпадении значений.
//      */
//     saveFormValuesToCookie = (fieldName, fieldValue) => {
//         const cookieExpires = new Date(new Date().getTime() + 15 * 60 * 1000);
//         const formField = { [fieldName]: fieldValue };
//         const dataForm = Cookies.getJSON("form-data") || null;
//
//         if (!dataForm) {
//             Cookies.set("form-data", formField, { expires: cookieExpires });
//             return;
//         }
//         if (!Object.keys(dataForm).includes(fieldName)) {
//             dataForm[fieldName] = fieldValue;
//             Cookies.set("form-data", dataForm, { expires: cookieExpires });
//             return;
//         }
//         for (const [cookieFieldKey, cookieFieldValue] of Object.entries(dataForm)) {
//             if (cookieFieldKey === fieldName && cookieFieldValue === fieldValue) return;
//             if (cookieFieldKey === fieldName) dataForm[fieldName] = fieldValue;
//         }
//         Cookies.set("form-data", dataForm, { expires: cookieExpires });
//     };
//
//     /**
//      * Получаем все отслеживаемые поля формы, создаем пустой обьект и массив из ключей-полей формы, они основаны на схеме
//      * валидации, то есть это список всех полей, коорые мы валидируем в этой форме. Далее отсеиваем из переданных в метод списка
//      * полей только те, что входят в список валидируемых.
//      * Далее в ицкле заполняем обьект набором "название поля формы - его значение" и возвращаем.
//      */
//     getAllTrackedFields = () => {
//         const formFieldsToObject = {};
//         const validationFields = Object.keys(this.validationSchema.fields);
//         const formFields = Array.from(this.form.current.elements).filter(item => validationFields.includes(item.name));
//         formFields.forEach(item => formFieldsToObject[item.name] = item.value);
//         return formFieldsToObject;
//     };
//
//     /**
//      * Проверка конкретного поля на ошибку. Получаем имя поля и значение, за счет метода validateSyncAt (из yup),
//      * если все ок, возвращаем обьект формата state - то есть обьект с именем поля и false-ошибкой. Иначе - вернем
//      * обьект с именем поля, true-ошибкой и текстом этой оишбки. Помни, что validateSyncAt требует обертки из try/catch
//      */
//     checkSingleFieldErrorSync = (inputName, inputValue) => {
//         try {
//             this.validationSchema.validateSyncAt(inputName, { [inputName]: inputValue });
//             return { fieldName: inputName, error: false };
//         } catch (error) {
//             return { fieldName: inputName, error: true, msg: error.message };
//         }
//     };
//
//
//     /**
//      * Валидация всей формы, target.form.elements - все поля формы.
//      * getAllTrackedFields - вернет обьект с набором полей формы и их значениями. Обходя этот обьект в цикле, проверяем каждое
//      * поле. Если получена ошибка - обьект помещается в массив оишбок (errors). По окончании работы цикла возвращаем обьект,
//      * с двумя полями: валидна ли форма в целом isFormValid - true/false и массив ошибок, либо пустой, либо нет.
//      */
//     validateForm = () => {
//         const errors = [];
//         const allFormFields = this.getAllTrackedFields();
//         for (const [key, value] of Object.entries(allFormFields)) {
//             const field = this.checkSingleFieldErrorSync(key, value);
//             if (field.error) errors.push(field);
//         }
//         return {
//             isFormValid: this.validationSchema.isValidSync(allFormFields),
//             errors
//         }
//     };
//
//
//     /**
//      * Этот метод передаем блоку OrderInfo, в нем он прописывается нужным полям.
//      * Обработка radio-кнопок, из-за отличия из state-вида от текстовых полей. Это кнопки это либо город доставки, либо тип оплаты.
//      * Текстовое значение, типа moscow или cash берется из id атрибуты формы. Также у типа доставки есть поле цена - проверяем и
//      * заполняем его, если есть.
//      */
//     handleRadioChange = ({ target: { id, name: inputName, dataset: { price = null } } }) => {
//         this.setState(
//             produce(this.state, (draft) => {
//                 draft["fields"][inputName]["assignment"] = id;
//                 if (price) draft["fields"][inputName]["price"] = price;
//             })
//         );
//     };
//
//     /**
//      * Данный блок используется только для сохранения значения поля в куке, чтобы не вводить верное значение
//      * по новой при перезагрузке страницы.
//      */
//     handleInputBlur = ({ target: { name: inputName, value: inputValue } }) => {
//         const checkedField = this.checkSingleFieldErrorSync(inputName, inputValue);
//         if (!checkedField.error) this.saveFormValuesToCookie(inputName, inputValue);
//     };
//
//     /**
//      * Изначально все проверяемые поля имеют статус ошибки false (то есть ошибки нет), а форма isFormValid в true и
//      * isFormTouched в false
//      * Это позволяет первый раз начав заполнять форму не видеть ошибки. Динамический показ ошибок включается при
//      * isFormTouched в true. Смысл isFormTouched такой: нам нужно показывать ошибки ввода не сразу, а когда человек
//      * первый раз ошибся. Это выявляется при первой попытке отправки формы и далее каждый ввод динамически
//      * демонстрирует ошибки ввода. Важно заметить, что isFormTouched больше уже не меняется, если выставлена в true,
//      * кроме вызова принудительного сброса значений формы.
//      *
//      * Теперь пользователь начинает исправлять данные и динамическая проверка работает.
//      * Если ошибки для текущего поля нет, то сбрасываем его данные об ошибке, и если кроме этого поля все тоже ок,
//      * то и форму ставим валидной (то есть разблокируем кнопку отправки).
//      * Если же ошибка в текущем поле (где идет ввод) все же есть, то проверяем, не выставлена ли она уже ранее.
//      * Если да - то ничего не меняем, ведь ошибка уже показна и перерисовывать ничего не нужно. Иначе - указываем новую ошибку.
//      */
//     handleInputChange = ({ target, target: { name: inputName, value: inputValue } }) => {
//         if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);
//         if (this.state.isFormTouched) {
//             const checkedField = this.checkSingleFieldErrorSync(inputName, inputValue);
//             if (!checkedField.error) {
//                 const formValiditaionData = this.validateForm();
//                 this.setState(
//                     produce(this.state, (draft) => {
//                         draft["fields"][checkedField.fieldName].error = false;
//                         draft["fields"][checkedField.fieldName].msg = "";
//                         formValiditaionData.isFormValid ? draft["isFormValid"] = true : draft["isFormValid"] = false;
//                     }),
//                 );
//             } else {
//                 if (this.state.fields[inputName].msg === checkedField.msg) return;
//                 this.setState(
//                     produce(this.state, (draft) => {
//                         draft["isFormValid"] = false;
//                         draft["fields"][checkedField.fieldName].error = true;
//                         draft["fields"][checkedField.fieldName].msg = checkedField.msg;
//                     }),
//                 );
//             }
//         }
//     };
//
//     /**
//      * Если проверка на валидность формы не пройдена, то сначала собираем все ошибки формы. Для этого создаем обьект под
//      * часть state, а именно fields. В этом обьекте мы заменим лишь те поля, что содержат ошибки, прочие не затронем. Для этого
//      * в цикле обходим весь набор валидированных полей формы (а там точно есть оишбки, без этого мы бы не попали в условие),
//      * и если поле из этого набора присутствует в ключах state -> fields, то создаем новый обьект и заполняем его данными
//      * об ошибке. То есть не меняем поля обьекта, а заменяем сам обьект. Это чтобы не мутировать весь fields.
//      * Также, если ошибки есть, то сразу указываем форму touched и невалидной.
//      */
//     showAllFormErrors = () => {
//         if (!this.validateForm().isFormValid) {
//             const fields = { ...this.state.fields };
//             this.validateForm().errors.forEach(item => {
//                 if (Object.keys(fields).includes(item.fieldName)) {
//                     fields[item.fieldName] = { error: true, msg: item.msg };
//                 }
//             });
//
//             this.setState(
//                 produce(this.state, (draft) => {
//                     draft["isFormTouched"] = true;
//                     draft["isFormValid"] = false;
//                     draft["fields"] = fields;
//                 }),
//             );
//         }
//     };
//
//     /**
//      * Отправная точка для проверки формы. До попытки отправки нет динамических проверок, можно вводить что угодно.
//      * Первая попытка отправки выявляет все ошибки и показывает их, до исправления - кнопка отправки формы блокируется.
//      * Для начала динамической проверки полей формы, флаг isFormTouched ставится в true
//      *
//      * Если же все нормально, то очищаем куки и сбрасываем форму, данные как бы тут уходят на сервер, далее
//      * показываем окно подтвержденияза счет смены isUserConfirmOrder.
//      *
//      * Тут не используется полный сброс формы resetOrderForm, так как там isUserConfirmOrder сбрасывается в false, а тут нужно
//      * true для показа картинки.
//      */
//     handleSubmit = (evt) => {
//         evt.preventDefault();
//
//         if (!this.validateForm().isFormValid) {
//             this.showAllFormErrors();
//             return;
//         }
//
//         const formData = new FormData(evt.target);
//         Cookies.remove("form-data");
//         evt.target.reset();
//         this.setState({ isUserConfirmOrder: true });
//     };
//
//     /**
//      * Метод сброса подтверждения отправки формы, передаем его в модалку, которая выводится после подтверждения. Тогда
//      * клик по ней вызове сброс поля isUserConfirmOrder в текущем state и при любой перерисовке не появится неуместное
//      * окно подттверждения. Также форма опять обозначится как нетронутоая пользователем.
//      */
//     resetOrderForm = (evt) => {
//         if (evt) evt.preventDefault();
//         Cookies.remove("form-data");
//         this.form.current.reset();
//
//         const fields = { ...this.state.fields };
//         Object.keys(fields).forEach(item => {
//             if (Object.keys(this.getAllTrackedFields()).includes(item))
//                 fields[item] = { error: false, msg: "" };
//         });
//
//         this.setState(
//             produce(this.state, (draft) => {
//                 draft["isFormTouched"] = false;
//                 draft["isUserConfirmOrder"] = false;
//                 draft["isFormValid"] = true;
//                 draft["fields"] = fields;
//             }),
//         );
//     };
//
//     // Если нажата клавиша Enter, то вызываем клик по кнопке отправки формы и убираем фокус с поля. Это нужно для того,
//     // чтобы помешать куче отправок при зажатии клавиши.
//     handleKeyPress = (evt) => {
//         if (evt.keyCode === 13) {
//             Array.from(evt.target.form.elements).find(item => {
//                 if (item.attributes.type && item.attributes.type.value === "submit") {
//                     item.click();
//                     evt.target.blur();
//                 }
//             });
//         }
//     };
//
//
//     render() {
//         const ConfirmModalDialog = ModalWrapper(Confirm);
//         return (
//             <>
//                 {this.state.isUserConfirmOrder && <ConfirmModalDialog bg={true} interactions={true} reset={this.resetOrderForm}/>}
//                 <form ref={this.form}
//                       onSubmit={this.handleSubmit}
//                       onKeyDown={this.handleKeyPress}
//                       className={styles.form}
//                       name="order-form" method="POST">
//                     <OrderInfo
//                         handleInputChange={this.handleInputChange}
//                         handleRadioChange={this.handleRadioChange}
//                         handleInputBlur={this.handleInputBlur}
//                         fields={this.state.fields}
//                         shipping={this.state.fields.shipping}
//                         payment={this.state.fields.payment}
//                     />
//                     <OrderSummary
//                         isFormValid={this.state.isFormValid}
//                         shipping={this.state.fields.shipping.price}
//                         resetOrderForm={this.resetOrderForm}
//                     />
//                 </form>
//             </>
//         );
//     }
// }

const mapStateToProps = (state:unknown) => ({ listOfProducts: cartSelectors.cartItemsSelector(state) });
export default connect(mapStateToProps)(OrderForm);
