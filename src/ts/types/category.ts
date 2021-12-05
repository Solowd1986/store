import { RouteComponentProps } from "react-router";
import { IProductTypes, IError } from "@root/ts/types/_core";

export interface ICategoryProps extends RouteComponentProps{
    clearCategoryPageReduxData: () => void,
    fetchCategoryPageData: (props:ICategoryProps) => void,
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
    products: CategoryTypes | null,
    lastIndex: number
}


export interface IDraft {
    [key: string]: any
}


export interface ICategoryProductsListProps {
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

export interface ISortProductsProps {
    readonly sortType: string,
    readonly changeSortType: (sortType: string) => void;
}
