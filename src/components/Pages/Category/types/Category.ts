import { CategoryTypes, Error, ProductTypes } from "@root/ts/types/types";

export interface CategoryProps {
    clearCategoryPageReduxData: () => void,
    fetchCategoryPageData: (props:CategoryProps) => void,
    clearCategoryReduxState: () => void,
    clearLazyReduxData: () => void,
    discardSortType: () => void,
    lastIndex: number,
    sortType: string,

    error: Error,
    data: CategoryTypes,
    lazy: any[],
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


