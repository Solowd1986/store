import { CategoryTypes, Error } from "@root/ts/types/types";

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



interface MatchProps extends RouteComponentProps<MatchParams> {
}



import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
    name: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}



export interface match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}
