import { RouteComponentProps } from "react-router";
import { IProductTypes, IError } from "@root/ts/types/_core";

export interface CategoryProps extends RouteComponentProps{
    clearCategoryPageReduxData: () => void,
    fetchCategoryPageData: (props:CategoryProps) => void,
    clearCategoryReduxState: () => void,
    clearLazyReduxData: () => void,
    discardSortType: () => void,
    lastIndex: number,
    sortType: string | undefined,

    error: IError,
    data: CategoryTypes,
    lazy: IProductTypes[],
    match: any
}

export interface CategoryTypes {
    data: Array<IProductTypes>,
    main: {
        alias: string,
        img: { path: string, alt: string },
        title: string
    }
}

export interface CategoryState {
    products: any | null,
    lastIndex: number
}


export interface CategoryProductsListTypes {
    category: {
        alias: string,
        img: {
            alt: string,
            path: string
        },
        title: string
    },
    products: IProductTypes[],
}










export interface SortProductsProps {
    readonly sortType: string,
    readonly changeSortType: (sortType: string) => void;
}
