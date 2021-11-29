
export interface LazyLoadProps {
    children: React.ReactNode,
    fetchingLazyDataStart: boolean,
    hasLazyDataBeenAdded: boolean,
    categoryName: string,
    lastIndex: number,
    discardLazyDataStatus: () => {},
    fetchLazyCategoryProducts: (categoryName: string, lastIndex: number ) => void;
}
