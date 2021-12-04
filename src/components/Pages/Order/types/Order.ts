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
