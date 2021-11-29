import { ProductTypes } from "@root/ts/types//types";

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
