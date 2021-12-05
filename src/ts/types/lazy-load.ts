import { RouteComponentProps } from "react-router";
import React from "react";

export interface ILazyLoadProps extends RouteComponentProps{
    children: React.ReactNode,
    fetchingLazyDataStart: boolean,
    hasLazyDataBeenAdded: boolean,
    categoryName: string,
    lastIndex: number,
    discardLazyDataStatus: () => {},
    fetchLazyCategoryProducts: (categoryName: string, lastIndex: number ) => void;
}
