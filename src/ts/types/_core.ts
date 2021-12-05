
export interface ProductTypes {
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
    promo: Array<{ id?: number, title: string, desc: string, img_alt: string, img_path: string }>
    specifications?: { [key: string]: (string | number) } | undefined,
    slider?: string[],
}

export interface CategoryTypes {
    data: Array<ProductTypes>,
    main: {
        alias: string,
        img: { path: string, alt: string },
        title: string
    }
}
