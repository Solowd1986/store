import React from "react";
import { RouteComponentProps } from "react-router";
import { IError } from "@root/types/_core";

export interface ILazyLoadProps extends RouteComponentProps {
    children: React.ReactNode,
    fetchingLazyDataStart: boolean,
    hasLazyDataBeenAdded: boolean,
    categoryName: string,
    lastIndex: number,
    discardLazyDataStatus: () => {},
    fetchLazyCategoryProducts: (categoryName: string, lastIndex: number ) => void;
}

export interface ReduxLazyProps {
    lastIndex: number,
    hasLazyDataBeenAdded: boolean,
    fetchingLazyDataStart: boolean,
    error: IError
}
