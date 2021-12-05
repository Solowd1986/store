import React from "react";
import { RouteComponentProps } from "react-router-dom";



export interface ProductTypes {
    id: number,
    category_id?: number,
    title: string,
    desc: string,
    price: number,
    color: string,
    discount: boolean,
    img_alt: string,
    rest: number,
    ads_type: number,
    img: { sm?: string, md: string, lg_1: string, lg_2?: string, lg_3?: string },
    promo: Array<{ id?: number, title: string, desc: string, img_alt: string, img_path: string }>
    specifications?: { [key: string]: (string | number) } | undefined,
    slider?: string[],
}

export interface CategoryTypes {
    data: Array<ProductTypes>,
    main: {
        alias: string,
        img: { path: string, alt: string },
        title: string
    }
}




export interface CartTypes {
    minAmountOfProduct: number,
    products: ProductTypes[],
}

export interface ProductsInCart {
    products: ProductTypes[],
}

export interface IndexPageTypes {
    readonly index: {
        phones: CategoryTypes
        gadgets: CategoryTypes,
        accessoires: CategoryTypes,
    }
}

export interface Error {
    recived: boolean,
    code: number
}

export interface IMainPage {
    index: {
        phones: CategoryTypes
        gadgets: CategoryTypes,
        accessoires: CategoryTypes,
        slider: ISlide[]
    },
    error: Error,
    fetchIndexPageData: () => void
}


/** LAZY LOAD **/

export interface LazyLoadProps extends RouteComponentProps{
    children: React.ReactNode,
    fetchingLazyDataStart: boolean,
    hasLazyDataBeenAdded: boolean,
    categoryName: string,
    lastIndex: number,
    discardLazyDataStatus: () => {},
    fetchLazyCategoryProducts: (categoryName: string, lastIndex: number ) => void;
}
/**********************/




/** CATEGORY  **/


export interface CategoryProps extends RouteComponentProps{
    clearCategoryPageReduxData: () => void,
    fetchCategoryPageData: (props:CategoryProps) => void,
    clearCategoryReduxState: () => void,
    clearLazyReduxData: () => void,
    discardSortType: () => void,
    lastIndex: number,
    sortType: string | undefined,

    error: Error,
    data: CategoryTypes,
    lazy: ProductTypes[],
    match: any
}


export interface ICategoryState {
    products: any | null,
    lastIndex: number
}


export interface ICategoryProps {
    category: {
        alias: string,
        img: {
            alt: string,
            path: string
        },
        title: string
    },
    products: ProductTypes[],
}


/**********************/


/** SLIDER FROM MAIN PAGE  **/

export interface ISlide {
    id: number,
    imgAlt: string,
    imgFullPath: string,
    imgSmallPath: string,
}

export interface ISlides {
    slides: ISlide[]
}

/**********************/



/** SINGLE PRODUCT  **/

export interface IProductPage extends RouteComponentProps{
    product: ISingleProduct,
    error: Error,
    fetchProductPageData: (props: IProductPage) => void,
    clearProductReduxState: () => void,
}

export interface ISingleProduct {
    data: ProductTypes & {
        slider: string[]
    },
    main: {
        alias: string,
        img: { path: string, alt: string },
        title: string
    }
}

export interface IProductTabs {
    category: {
        alias: string,
        img: {
            alt: string,
            path: string
        },
        title: string
    },
    product: ProductTypes

}

export interface ISingleProductData {
    product: ProductTypes & {
        slider: string[]
    },
}


export interface IProductSliderProps {
    list: string[],
    alt: string
}

export interface IPromoSingleProduct {
    promo: Array<{ id?: number, title: string, desc: string, img_alt: string, img_path: string }>
}

/**********************/



/** ORDER  **/

interface IObjectKeys {
    [key: string]: string | number | boolean;
}

interface Glow {
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
    }
}


export interface IOrderState {
    isUserConfirmOrder: boolean,
    isFormTouched: boolean,
    isFormValid: boolean,

    fields: {
        [key: string]: {
            [key: string]: string | number | boolean;
        }
    }
}

export interface IField {
    [key: string]: {
        [key: string]: string | number | boolean;
    }
}



export interface IError {
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
    shipping: number
}

export interface IProduct {
    price: number,
    quantity: number,
    discount: boolean
}

export interface IOrderSummary {
    listOfProducts: any[],
    isFormValid: boolean,
    shipping: number,
    resetOrderForm: (evt: React.SyntheticEvent) => void
}

export interface IOrderInfo {
    handleInputChange: ({ target, target: { name, value } }: IElement) => void,
    handleRadioChange: ({ target: { id, name, dataset } }: { target: HTMLInputElement }) => void,
    handleInputBlur: ({ target: { name, value } }: IElement) => void,
    fields: IField,
    shipping: string,
    payment: string
}


/**********************/






