import { ProductTypes } from "@root/ts/types/_core";

export interface ProductCardProps {
    item: ProductTypes,
    category: {
        alias: string
    }
}

export interface PromoProductCardProps {
    alias: string,
    rest: number,
    adsType: number
}
