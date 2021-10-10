import * as types from "./constants/lazy";
import * as utils from "@components/Helpers/Functions/scrollbarHelper";

const initialState = {
    lazyRecivedData: null,
    lastIndex: 0,
    fetchingLazyDataStart: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LAZY_FETCH_PAGE_DATA: {
            return {
                ...state,
                lastIndex: action.payload.lastIndex,
                lazyRecivedData: action.payload.load,
            };
        }

        case types.LAZY_START_FETCH_DATA: {
            return {
                ...state,
                fetchingLazyDataStart: true,
            };
        }

        case types.LAZY_END_FETCH_DATA: {
            utils.scrollToBottom();
            return {
                ...state,
                fetchingLazyDataStart: false,
            };
        }

        case types.LAZY_CLEAR_CATEGORY_REDUX_DATA: {
            return {
                ...state,
                lastIndex: 0,
                lazyRecivedData: null
            };
        }

        default:
            return state;
    }
};



