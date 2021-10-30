export const getCategoryData = (state) => {
    return {
            data: state.category.categoryRecivedData,
            lazy: state.category.lazyRecivedData,
            lastIndex: state.category.lastIndex,
            sortType: state.category.sortType,
            error: state.category.error
    }
};

export const getLazyParams = (state) => {
    return {
        lastIndex: state.category.lastIndex,
        hasLazyDataBeenAdded: state.category.hasLazyDataBeenAdded,
        fetchingLazyDataStart: state.category.fetchingLazyDataStart,
        error: state.category.error
    }
};





