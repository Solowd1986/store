export interface SortProductsProps {
    readonly sortType: string,
    readonly changeSortTypeCallback: (sortType: string) => void;
}

export interface SortProductsState {
    showSortPanel: boolean
}

