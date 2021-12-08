import { IError } from "@root/types/_core";
import { ICategoryTypes } from "@root/types/category";

export interface IIndexPagePropducts {
    readonly index: {
        phones: ICategoryTypes
        gadgets: ICategoryTypes,
        accessoires: ICategoryTypes,
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


