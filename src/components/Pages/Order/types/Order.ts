import React from "react";

export interface IOrderState {
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

export interface IField {
    [key: string]: {
        msg?: string,
        error?: boolean,
        assignment?: string,
        price?: number
    }
}

export interface IError {
    fieldName: string,
    error: boolean,
    msg?: string
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
    shipping: number | undefined
}

export interface IProduct {
    price: number,
    quantity: number,
    discount: boolean
}

export interface IOrderSummary {
    listOfProducts: any[],
    isFormValid: boolean,
    shipping: number | undefined,
    resetOrderForm: (evt: React.SyntheticEvent) => void
}

export interface IOrderInfo {
    handleInputChange: ({ target, target: { name, value } }: IElement) => void,
    handleRadioChange: ({ target: { id, name, dataset } }: { target: HTMLInputElement }) => void,
    handleInputBlur: ({ target: { name, value } }: IElement) => void,
    fields: IField,
    shipping: string | undefined,
    payment: string | undefined
}
