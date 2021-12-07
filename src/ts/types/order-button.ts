import React from "react";
import { IProductTypes } from "@root/ts/types/_core";

export interface IOrderButtonProps {
    product: IProductTypes,
    productsInCart?: IProductTypes[],
    addItemToCart?: (product: IProductTypes) => void,
    removeItemFromCart?: () => void,
    classList?: string,
}

export type IProductStatusHandler = (
    evt: React.MouseEvent<HTMLButtonElement>,
    product: IProductTypes,
    callback?: (product: IProductTypes) => void
) => void;

export type IProductInCart = (productsInCart: IProductTypes[], title: string, id: number) => IProductTypes | undefined


export interface ReduxCartList {
    productsInCart: IProductTypes[],
}
