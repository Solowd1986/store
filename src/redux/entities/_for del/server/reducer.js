import * as types from "./constants/server";


const initialState = {
    index: null,
    category: null,
    product: null,
    history: null,
    fetchingDataStart: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SERVER_FETCH_PAGE_DATA: {
            return {
                ...state,
                [action.payload.pageType]: action.payload.data,
            };
        }

        case types.SERVER_START_FETCH_DATA: {
            return {
                ...state,
                fetchingDataStart: true,
            };
        }

        case types.SERVER_END_FETCH_DATA: {
            return {
                ...state,
                fetchingDataStart: false,
            };
        }

        case types.SERVER_CLEAR_CATEGORY_PAGE_REDUX_DATA: {
            return {
                ...state,
                category: null,
            };
        }

        case types.SERVER_CLEAR_SINGLE_PRODUCT__PAGE_REDUX_DATA: {
            return {
                ...state,
                product: null,
            };
        }

        case types.CREATE_HISTORY_INSTANCE: {
            if (!state.history) {
                return { ...state, history: action.payload };
            }
            return state;
        }

        default:
            return state;
    }
};