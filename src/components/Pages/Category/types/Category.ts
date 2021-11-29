
export interface CategoryProps {
    clearCategoryPageReduxData: () => {},
    fetchCategoryPageData: (props:any) => {},
    clearCategoryReduxState: () => {},
    clearLazyReduxData: () => {},
    sortType: string,
    discardSortType: () => {},
    lastIndex: number,

    error: any,
    data: any,
    lazy: any
}


