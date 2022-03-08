import React from "react";


export interface IOrderState {
    isUserConfirmOrder: boolean,
    isBeenAttemptToSendForm: boolean,
    isFormValid: boolean,
    isFormPending: boolean,
    fields: Fields
}

type Fields = {
    [key: string]: {
        [key: string]: string | number | boolean;
    }
}

export interface IFormInputCounter {
    classList: string,
    getProcessedAmount: (quantity: number) => void,
    initialValue: number,
    maxValue: number,
}

export interface IElement {
    target: HTMLInputElement| HTMLTextAreaElement
}

export interface IOrderError {
    fieldName: string,
    error: boolean,
    msg: string
}


type OrderProductsListItem = {
    title: string,
    color: string,
    specifications?: {
        color: string
    },
    id: number,
    price: number,
    discount: boolean,
    rest: number,
    quantity: number,
    img_alt: string,
    img: {
        [key: string]: string
    },
};

export interface IOrderItem {
    item: OrderProductsListItem,
    changeAmountOfProduct: (id: number, title:string, quantity: number) => void,
    removeItemFromCart: (item: any) => void
}

export interface IOrderPrice {
    listOfProducts: OrderProductsListItem[],
    shipping: number
}

export interface IProductInCart {
    price: number,
    quantity: number,
    discount: boolean
}

export interface IOrderSummaryProps {
    listOfProducts: OrderProductsListItem[],
    isFormValid: boolean,
    shipping: number,
    resetOrderForm: (evt: React.SyntheticEvent) => void
}

export interface IOrderInfoProps {
    handleInputChange: ({ target, target: { name, value } }: IElement) => void,
    handleRadioChange: ({ target: { id, name, dataset } }: { target: HTMLInputElement }) => void,
    handleInputBlur: ({ target: { name, value } }: IElement) => void,
    fields: Fields,
    shipping: string,
    payment: string
}

export interface IReduxListOfProducts {
    listOfProducts: OrderProductsListItem[],
}

export interface ISubmitButton {
    value: string,
    disabled: boolean,
    classList: string,
    handler?: () => void
}




