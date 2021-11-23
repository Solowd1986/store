export interface SortProductsProps {
    readonly sortType: string,
    readonly changeSortType: (sortType: string) => void;
}

export interface SortProductsState {
    showSortPanel: boolean
}

