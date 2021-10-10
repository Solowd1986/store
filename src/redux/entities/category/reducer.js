import * as types from "./constants/category";

const initialState = {
    categoryRecivedData: null,
    lazyRecivedData: null,

    lastIndex: 0,
    sortType: "по популярности",
    fetchingCategoryDataStart: false,
    fetchingLazyDataStart: false,
    hasLazyDataBeenAdded: false,

    error: {
        recived: false,
        code: null,
    }

};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CATEGORY_START_FETCH_DATA: {
            return {
                ...state,
                fetchingCategoryDataStart: true,
            };
        }

        case types.CATEGORY_END_FETCH_DATA: {
            return {
                ...state,
                fetchingCategoryDataStart: false,
                categoryRecivedData: action.payload.data,
            };
        }

        case types.CATEGORY_ERROR_FETCH_DATA: {
            return {
                ...state,
                fetchingDataStart: false,
                error: {
                    recived: true,
                    code: action.payload.code,
                }
            };
        }


        case types.LAZY_START_FETCH_DATA: {
            return {
                ...state,
                fetchingLazyDataStart: true,
            };
        }

        case types.LAZY_END_FETCH_DATA: {
            return {
                ...state,
                fetchingLazyDataStart: false,
                lastIndex: action.payload.lastIndex,
                lazyRecivedData: action.payload.load,
            };
        }

        case types.LAZY_DATA_BEEN_ADDED: {
            return {
                ...state,
                hasLazyDataBeenAdded: true,
            };
        }

        case types.LAZY_DATA_DISCARD_STATUS: {
            return {
                ...state,
                hasLazyDataBeenAdded: false,
            };
        }


        case types.LAZY_ERROR_FETCH_DATA: {
            return {
                ...state,
                fetchingLazyDataStart: false,
                error: {
                    recived: true,
                    code: action.payload.code,
                }
            };
        }


        case types.CATEGORY_CLEAR_REDUX_STATE: {
            return {
                ...state,
                categoryRecivedData: null,
                lazyRecivedData: null,

                lastIndex: 0,
                sortType: "по популярности",
                fetchingCategoryDataStart: false,
                fetchingLazyDataStart: false,
                hasLazyDataBeenAdded: false,

                error: {
                    recived: false,
                    code: null,
                }
            };
        }

        case types.SORT_CHANGE_SORT_TYPE: {
            return {
                ...state,
                sortType: action.payload.sortType,
            };
        }

        case types.SORT_DISCARD_SORT_TYPE: {
            return {
                ...state,
                sortType: "по популярности",
            };
        }

        default:
            return state;
    }
};






