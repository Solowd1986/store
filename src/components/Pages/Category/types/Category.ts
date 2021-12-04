import { CategoryTypes, Error, ProductTypes } from "@root/ts/types/types";
import { RouteComponentProps } from "react-router";


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


