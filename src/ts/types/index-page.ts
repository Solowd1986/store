import { IError } from "@root/ts/types/_core";
import { CategoryTypes } from "@root/ts/types/category";

export interface IIndexPagePropducts {
    readonly index: {
        phones: CategoryTypes
        gadgets: CategoryTypes,
        accessoires: CategoryTypes,
        slider: IMainPageSlide[]
    }
}

export interface IMainPageProps extends IIndexPagePropducts{
    error: IError,
    fetchIndexPageData: () => void
}

export interface IMainPageSlide {
    id: number,
    imgAlt: string,
    imgFullPath: string,
    imgSmallPath: string,
}

export interface IMainPageSlides {
    slides: IMainPageSlide[]
}


