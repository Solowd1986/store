import * as types from "./constants/sort";

export const changeSortType = (sortType) => {
    return {
        type: types.SORT_CHANGE_SORT_TYPE,
        payload: {
            sortType
        }
    }
};

export const discardSortType = () => {
    return {
        type: types.SORT_DISCARD_SORT_TYPE,
    }
};
