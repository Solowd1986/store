import { Error, ProductTypes } from "@root/ts/types/types";
import { RouteComponentProps } from "react-router-dom";

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
    product: ProductTypes & {
        slider: string[]
    },
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
