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




interface IOrderState {
    isUserConfirmOrder: boolean,
    isFormTouched: boolean,
    isFormValid: boolean,

    fields: {
        [key: string]: {
            msg?: string,
            error?: boolean,
            assignment?: string,
            price?: number
        }
    },
}

interface IField {
    [key: string]: {
        msg?: string,
        error?: boolean,
        assignment?: string,
        price?: number
    }
}

interface IError {
    fieldName: string,
    error: boolean,
    msg?: string
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

type FieldProperties = {
    error: boolean,
    msg: string,
    assignment: string,
    price: number
};


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


type FieldProps = {
    [key: string]: {
        msg?: string,
        error?: boolean,
        assignment?: string,
        price?: number
    }
};


type Fields = formFieldsToObjectType & FieldsTypes;


/**
 * Обработчик ошибок формы заказа инициализируется с указанными значениями - кажде поле без ошибок и без сообщения
 *
 * isUserConfirmOrder: - подтвердил ли пользователь заказ. Срабатывает когда нет ошибок и форму отправили.
 *
 * isFormTouched - воздействовал ли пользователь на форму. Ставится в true, если пользователь попробовал отправить форму
 * и в ней были ошибки. Так как если он отправляет и ошибок нет, то покажется Confirm-окно и форма сбросится на default.
 *
 * isFormValid - валидна ли форма. Форма получает статус true при инициализации, потом сбрасывается при ошибках.
 * Если все поля валидны - опять true.
 *
 *
 *
 *
 *
 *
 */

import ReactDOM from 'react-dom';

const OrderForm = () => {
    const [state, setState] = useState<IOrderState>(initalState);
    const form = useRef<HTMLFormElement>(null);
    const ConfirmModalDialog = ModalWrapper(Confirm);

    /**
     * Метод получения из куки данных для формы, чтобы не терять введенные данные при закрытии страницы.
     *
     * При монтировании формы забираем данные из кук, если они есть. Это позволяет не терять данные заполненной формы
     * при случайно закрытой странице. Обходим массив полей из кук, ищем в форме одноименные поля и вписываем им
     * значения, которые были сохранены в куке. Также учитываем, что форма могла быть закрыта с ошибками, поэтому
     * сразу проверяем всю форму на ошибки и есои форма не валидна, то вызываем метод showAllFormErrors. По сути
     * значение не запишется, если оно невалидное, но это так, на всякий случай.
     */
    useEffect(() => {
        if (!form.current) return;
        if (Cookies.get("form-data")) {
            const cookieFormFields = Cookies.getJSON("form-data");
            const formAray: any[] = Array.from(form.current.elements);

            const fields = formAray.filter((item) => Object.keys(cookieFormFields).includes(item.name));
            fields.forEach((item: any) => item.value = cookieFormFields[item.name]);
            const formValiditaionData = validateForm();

            if (!formValiditaionData.isFormValid) {
                showAllFormErrors();
            }
        }
    }, []);


    /**
     * Метод для сохранения значения поля в куку на 15 минут, если значение валидное.
     *
     * Создаем смещение даты в 15 минут, создаем обьект с полем и значением, которое было передано на вход методу.
     * Забираем данные из куки, если они уже есть, то есть куку ставили ранее. Или просто берем null
     *
     * Варианты:
     *
     * 1. Куку не ставили. Тогда ставим куку form-data, передаем обьект с полем/значением + 15 минут длительность. Выходим.
     *
     * 2. Если мы тут, то куку уже ставили. Если в обьекте, который уже есть, переданного в метод поля нет, то дописываем его
     * в уже существующий обьект. Ставим куку form-data, передаем обьект с полем/значением + 15 минут длительность. Выходим.
     *
     * 3. Дальше ситуация, где переданное в метод имя поля уже есть в обьекте куки, и нужно понять, что с ним делать.
     * Если значение в куки под переданным именем равно тому, что передано в метод, то делать ничего не нужно - выходим.
     * Если значение новое, то записываем в обьект новое значение и сохраняем куку, опять задавая 15 минут жизни.
     */
    const saveFormValuesToCookie = (fieldName: string, fieldValue: string) => {
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

        if (dataForm[fieldName] === fieldValue) return;
        dataForm[fieldName] = fieldValue;
        Cookies.set("form-data", dataForm, { expires: cookieExpires });
    };


    /**
     * Метод для получения всех валидируемых полей формы и их значений в удобной форме обьекта. Возвращает обьект.
     *
     * Обьект formFieldsToObject будет содержать все валидируемые поля формы в виде: атрибут name элемента -> его значение
     * Массив validationFields содержит все названия валидируемых полей (тех, что прописаны в validationSchema)
     *
     * Далее берем форму, переводим ее в массив. Теперь это массив DOM-элементов.
     * Через filter отбираем все элементы, которые вернули true на проверку вхождения в список валидируемых полей.
     * Проще говоря, отбираем из всех DOM-элементов формы те элементы, которые относятся к валидируемым.
     *
     * Потом обходим получившийся массив DOM-элементов и вносим в обьект formFieldsToObject атрибуиы этих DOM-элементов:
     * Атрибут name - как имя поля обьекта, а атрибут value - как значение обьекта.
     *
     *
     *
     *
     * Получаем все отслеживаемые поля формы, создаем пустой обьект и массив из ключей-полей формы, они основаны на схеме
     * валидации, то есть это список всех полей, коорые мы валидируем в этой форме. Далее отсеиваем из переданных
     * в метод списка
     * полей только те, что входят в список валидируемых.
     * Далее в ицкле заполняем обьект набором "название поля формы - его значение" и возвращаем.
     */
    const getAllTrackedFields = () => {
        if (!form.current) return null;
        const formFieldsToObject: formFieldsToObjectType = {};
        const validationFields = Object.keys(validationSchema.fields);
        const formFields = Array.from(form.current.elements).filter((item: any) => validationFields.includes(item.name));
        formFields.forEach((item: any) => formFieldsToObject[item.name] = item.value);
        return formFieldsToObject;
    };

    /**
     * Метод для проверки конретного поля формы на ошибки. Возвращает обьект с результатом.
     *
     * Получаем имя поля и значение, за счет метода validateSyncAt (из пакета yup)
     * Если все ок, возвращаем обьект с именем поля и false-ошибкой для него.
     * Иначе - вернем обьект с именем поля, true-ошибкой и текстом этой оишбки.
     * Помни, что validateSyncAt требует обертки из try/catch
     */
    const checkSingleFieldErrorSync = (inputName: string, inputValue: unknown) => {
        try {
            validationSchema.validateSyncAt(inputName, { [inputName]: inputValue });
            return { fieldName: inputName, error: false };
        } catch (error) {
            return { fieldName: inputName, error: true, msg: error.message };
        }
    };

    /**
     * Метод проверки всей формы на наличие ошибкок. Возвращает обьект с двумя полями: isFormValid и errors
     *
     * Данный метод в цикле обращается к вышеописанного методу checkSingleFieldErrorSync, проверяя все поля.
     *
     * errors - массив обьектов ошибок, изначально пустой.
     * Каждый обьект ошибки иммет вид: { fieldName: <имя поля>, error: true, msg: <текст ошибки> }
     *
     * allFormFields - получение из getAllTrackedFields всех валидируемых полей формы и их значений в удобной форме обьекта
     * Обходим этот обьект в цикле, к каждому полю применяем метод checkSingleFieldErrorSync.
     * Если ошибка получена - помещаем обьект вышеописанного формата в массив errors
     *
     * По окончании работы цикла возвращаем обьект, с двумя полями:
     * isFormValid - валидна ли форма в целом (true/false)
     * errors - массив ошибок, либо пустой, либо нет.
     */
    const validateForm = () => {
        const errors = [];
        const allFormFields: any = getAllTrackedFields();

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
     * Метод демонстрации пользователю всех ошибок формы. Меняет state.
     *
     * Если проверка validateForm не пройдена, то обходится весь массив ошибок errors, который возвращает validateForm,
     * на основе это массива создается набор обьектов с заполненными полями error и msg (с текстом ошибки), далее это
     * все вносится в state. После чего isFormValid ставится в false, что блокирует кнопку отправки формы, а для каждого
     * поля с ошибкой выводится текстовое описание ошибки.
     *
     * Далее, чтобы не мутировать state создаем новый обьект с полями содержащими ошибки, а потом создаем
     * новый обьект fields, где неизменные поля-обьекты доступны по ссылке, а измененные - заменены.
     */
    const showAllFormErrors = () => {
        if (!validateForm().isFormValid) {
            const fieldsWithError:IField = {};
            validateForm().errors.forEach((item: IError) => {
                if (Object.keys(state.fields).includes(item.fieldName)) {
                    fieldsWithError[item.fieldName] = { error: true, msg: item.msg };
                }
            });

            setState(
                produce(state, (draft) => {
                    draft["isFormTouched"] = true;
                    draft["isFormValid"] = false;
                    draft["fields"] = { ...state.fields, ...fieldsWithError };
                }),
            );
        }
    };


    /**
     * Метод отвечает за переключение radio-кнопок выбора доставки и способа оплаты. Меняет state.
     *
     * При клике мы извлекаем нужные поля:
     *
     * name - имя radio-кнопки в целом, тут всего два варианта: shipping или payment. Это общее имя для input-ов кнопки
     *
     * id - этот атрибут есть у каждого input-а в radio-блоке, он позволяет отличать, какая опция выбрана. Например, для
     * radio-блока shipping id - это варианты доставки, такие как moscow, pickup, russia
     *
     * dataset - в нем лежит data-атрибут price, он есть только у shipping
     *
     * При смене state есть общее действие: по переданному name (shipping или payment) устанавливается id input-а, на основе
     * этого будет проставлен атрибут cheсked для определенного input-а в radio-блоке. Если передана цена, то есть
     * был клик по shipping, то также устаналиваем и цену доставки, она нужна потом, для расчета общей стоимости товара.
     */
    const handleRadioChange = ({ target: { id, name: inputName, dataset: { price = null } } }: any) => {
        setState(
            produce(state, (draft) => {
                draft["fields"][inputName]["assignment"] = id;
                if (price) draft["fields"][inputName]["price"] = price;
            })
        );
    };


    /**
     * Метод обработки события blur, при потере фокуса на поле ввода. Нужен только для записи значения в cookie
     *
     * Данный блок используется только для сохранения значения поля в куке, чтобы не вводить верное значение
     * по новой при перезагрузке страницы. Но если введенный символ запрещен для поля - он не сохранится.
     */
    const handleInputBlur = ({ target: { name: inputName, value: inputValue } }: any) => {
        const checkedField = checkSingleFieldErrorSync(inputName, inputValue);
        if (!checkedField.error) saveFormValuesToCookie(inputName, inputValue);
    };


    /**
     * Метод обработки пользовательского ввода в input-поле. Меняет state.
     *
     * Если имя поля phone - то прогоняем ввод через Inputmask, для форматирования в телефонный номер.
     *
     * Далее метод работает при условии, что isFormTouched = true. Это происходит только если была попытка отправки формы.
     * До этого пользователь может вводить любые данные и ошибок не будет, чтобы не мешать ему на этом этапе.
     *
     * Итак, для формы были показаны ошибки, отправка формы заблокирована, пользователь выбирает поле и начинает опять
     * вводить данные. Именно тут этот метод начинает работать динамически . На каждый ввод вызывается метод
     * checkSingleFieldErrorSync, возвращающий обьект с данными проверки на ошибки текущего поля ввода.
     * Далее два сценария:
     *
     * 1. Ошибки для поля возвращено не было. Тогда проверяем уже всю форму на ошибки, если и эта проверка пройдена,
     * то форму можно разблокировать поставив isFormValid в true. Но если это не так, то раз для текущего поля ошибки нет, то
     * просто поставим ему error = false и пустой текст ошибки. После чего пользователь может начать исправлять другие поля.
     *
     * 2. Ошибка для поля была получена. Если текст ошибки совпадает с тем, что уже был задан для данного поля, то просто
     * выходим из обработчика, так как менять state не нужно. Иначе прописываем данные об ошибке в state.
     */
    const handleInputChange = ({ target, target: { name: inputName, value: inputValue } }: any) => {
        if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);
        if (state.isFormTouched) {
            const checkedField = checkSingleFieldErrorSync(inputName, inputValue);
            if (!checkedField.error) {
                const formValiditaionData = validateForm();
                setState(
                    produce(state, (draft) => {
                        draft["fields"][checkedField.fieldName].error = false;
                        draft["fields"][checkedField.fieldName].msg = "";
                        formValiditaionData.isFormValid ? draft["isFormValid"] = true : draft["isFormValid"] = false;
                    }),
                );
            } else {
                if (state.fields[inputName].msg === checkedField.msg) return;
                setState(
                    produce(state, (draft) => {
                        draft["isFormValid"] = false;
                        draft["fields"][checkedField.fieldName].error = true;
                        draft["fields"][checkedField.fieldName].msg = checkedField.msg;
                    }),
                );
            }
        }
    };

    /**
     * Метод-обработчик события отправки формы.
     *
     * Отправку по-умолчанию отключаем.
     * Когда срабатывает событие отправки, проверяем форму на валидность, если есть ошибки - выводим их все.
     * Уходим из обработчика.
     *
     * Если же ошибок нет, то начинаем процесс сброса формы (как бы отправки)
     * 1. Забираем все даннеы из формы в обьект FormData, для потенциальной обработки.
     * 2. Удаляем куку, которая позволяла не терять данные при закрытии страницы.
     * 3. Вызываем метод reset для формы.
     * 4. Ставим isUserConfirmOrder в true.
     *
     * После этого будет показано изображение Confirm. Его компоненту будет передан метод resetOrderForm,
     * который служит для сброса всего state формы в изначальное состояние.
     * Сразу сбрасывать мы не может, так как Confirm не получится показать.
     */
    const handleSubmit = (evt: any) => {
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
     * Метод сброса state формы в изначальное состояние.
     * Вызывается при закрытии окна Confirm или нажатии на кнопку сброса формы.
     *
     * 1. Блокируем поведение элемента, так как если это кнопка, то она может вызвать событие отправки формы.
     * 2. Передать этот метод мы можем куда-то, где события не будет, поэтому проверяем на само событие.
     * 3. Очищаем куку, так как resetOrderForm может вызываться и не из handleSubmit, где кука тоже удаляется.
     * 4. Вызываем метод reset для формы.
     * 5. Заменяем весь state на initalState
     */
    const resetOrderForm = (evt: any) => {
        if (evt) evt.preventDefault();

        Cookies.remove("form-data");
        form.current?.reset();
        setState(initalState);
    };

    /**
     * Метод обработки нажатия на кнопку Enter, когда курсор находится внутри поля ввода.
     *
     *
     * Если нажата клавиша Enter, то вызываем клик по кнопке отправки формы и убираем фокус с поля. Это нужно для того,
     * чтобы помешать множественной отправке при зажатии клавиши.
     */
    const handleKeyPress = (evt: React.KeyboardEvent<HTMLElement>) => {
        const target = evt.target as HTMLInputElement;
        if (!target.form) return;

        if (evt.key === "Enter") {
            Array.from(target.form.elements).find((item: any) => {
                if (item.attributes.type && item.attributes.type.value === "submit") {
                    item.click();
                    target.blur();
                }
            });
        }
    };

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

const mapStateToProps = (state: unknown) => ({ listOfProducts: cartSelectors.cartItemsSelector(state) });
export default connect(mapStateToProps)(OrderForm);
