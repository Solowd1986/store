import { RouteComponentProps } from "react-router";
import { IProductTypes, IError, Promo } from "@root/ts/types/_core";


interface MatchParams {
    id?: string,
    category?: string
}

export interface ISingleProductProps extends RouteComponentProps<MatchParams>{
    product: ISingleProductState,
    error: IError,
    fetchProductPageData: (path: string, id: string | undefined, category: string | undefined) => void,
    clearProductReduxState: () => void,
}

export interface ISingleProductState {
    data: IProductTypes & {
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
    product: IProductTypes

}

export interface ISingleProductSlider {
    list: string[],
    alt: string
}

export interface IPromoSingleProduct {
    promo: Promo
}

export interface ReduxRecivedProps {
    product: ISingleProductState,
    error: IError
}
