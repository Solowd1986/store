import React from "react";


export interface OrderState {
    isUserConfirmOrder: boolean,
    isFormTouched: boolean,
    isFormValid: boolean,

    fields: {
        [key: string]: {
            [key: string]: string | number | boolean;
        }
    }
}

export interface Field {
    [key: string]: {
        [key: string]: string | number | boolean;
    }
}



export interface Error {
    fieldName: string,
    error: boolean,
    msg: string
}

export interface IFormInputCounter {
    classList: string,
    getProcessedAmount: (quantity: number) => void,
    initialValue: number,
    maxValue: number,
}

export interface Element {
    target: HTMLInputElement| HTMLTextAreaElement
}

export interface IOrderItem {
    item: {
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
    },
    changeAmountOfProduct: (id: number, title:string, quantity: number) => void,
    removeItemFromCart: (item: any) => void
}



export interface IOrderPrice {
    listOfProducts: any[],
    shipping: number
}

export interface Product {
    price: number,
    quantity: number,
    discount: boolean
}

export interface OrderSummaryTypes {
    listOfProducts: any[],
    isFormValid: boolean,
    shipping: number,
    resetOrderForm: (evt: React.SyntheticEvent) => void
}

export interface OrderInfoTypes {
    handleInputChange: ({ target, target: { name, value } }: Element) => void,
    handleRadioChange: ({ target: { id, name, dataset } }: { target: HTMLInputElement }) => void,
    handleInputBlur: ({ target: { name, value } }: Element) => void,
    fields: Field,
    shipping: string,
    payment: string
}
