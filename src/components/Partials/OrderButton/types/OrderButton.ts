import { ProductTypes } from "@root/ts/types/types";
import React from "react";

export interface IOrderButtonProps {
    product: ProductTypes,
    productsInCart?: ProductTypes[],
    addItemToCart?: (product: ProductTypes) => void,
    removeItemFromCart?: () => void,
    classList?: string,
}


export type buttonClickHandler = (
    evt: React.MouseEvent<HTMLButtonElement>,
    product: ProductTypes,
    callback?: (product: ProductTypes) => void
) => void;


export type isProductInCart = (productsInCart: ProductTypes[], title: string, id: number) => ProductTypes | undefined

