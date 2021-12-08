import { RouteComponentProps } from "react-router";
import { IProductTypes, IError } from "@root/types/_core";

interface MatchParams {
    type?: string,

}

export interface ICategoryProps extends RouteComponentProps<MatchParams> {
    clearCategoryPageReduxData: () => void,
    fetchCategoryPageData: (path: string, params: unknown) => void,
    clearCategoryReduxState: () => void,
    clearLazyReduxData: () => void,
    discardSortType: () => void,
    lastIndex: number,
    sortType: string | undefined,

    error: IError,
    data: ICategoryTypes,
    lazy: IProductTypes[],
}

export interface IReduxCategoryProps {
    data: ICategoryTypes,
    lazy: IProductTypes[],
    lastIndex: number,
    sortType: string | undefined,
    error: IError
}



export interface ICategoryTypes {
    data: Array<IProductTypes>,
    main: {
        alias: string,
        img: { path: string, alt: string },
        title: string
    }
}

export interface ICategoryState {
    products: ICategoryTypes | null,
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
