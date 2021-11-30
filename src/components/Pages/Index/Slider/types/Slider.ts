
export interface ISlide {
    id: number,
    imgAlt: string,
    imgFullPath: string,
    imgSmallPath: string,
}

export interface ISlides {
    slides: ISlide[]
}
