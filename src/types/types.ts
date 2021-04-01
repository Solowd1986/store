export interface ProductType {
    id: number,
    title: string,
    desc: string,
    price: number,
    color: string,
    descount: number,
    img_alt: string,
    rest: number,
    ads_type: number,
    img: { md: string, lg_1: string, lg_2?: string, lg_3?: string },
    promo: Array<{ id: number, title: string, desc: string, img_alt: string, img_path: string }>
    specifications? : any
}

export interface CategoryType {
    data: Array<ProductType>,
    main: {
        alias: string,
        img: { path: string, alt: string },
        tittle: string
    }
}

export interface IndexPageType {
    readonly index: {
        phones: CategoryType
        gadgets: CategoryType,
        accessoires: CategoryType
    }
}
