
export interface IProductTypes {
    id: number,
    category_id?: number,
    title: string,
    desc: string,
    price: number,
    color: string,
    discount: boolean,
    img_alt: string,
    rest: number,
    ads_type: number,
    img: { sm?: string, md: string, lg_1: string, lg_2?: string, lg_3?: string },
    promo: Promo
    specifications?: { [key: string]: (string | number) } | undefined,
}

export type Promo = Array<{ id?: number, title: string, desc: string, img_alt: string, img_path: string }>;


export interface IError {
    recived: boolean,
    code: number
}
