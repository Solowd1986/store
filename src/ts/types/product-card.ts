import { IProductTypes } from "@root/ts/types/_core";

export interface IProductCardProps {
    item: IProductTypes,
    category: {
        alias: string
    }
}

export interface IPromoProductCardProps {
    alias: string,
    rest: number,
    adsType: number
}
