import * as types from "./constants/index";

const initialState = {
    indexRecivedData: null,
    fetchingIndexDataStart: false,

    error: {
        recived: false,
        code: null,
    }

};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INDEX_START_FETCH_DATA: {
            return {
                ...state,
                fetchingIndexDataStart: true,
            };
        }

        case types.INDEX_END_FETCH_DATA: {
            return {
                ...state,
                fetchingIndexDataStart: false,
                indexRecivedData: action.payload.data,
            };
        }

        case types.INDEX_ERROR_FETCH_DATA: {
            return {
                ...state,
                fetchingIndexDataStart: false,
                error: {
                    recived: true,
                    code: action.payload.code,
                }
            };
        }

        case types.INDEX_CLEAR_REDUX_STATE: {
            return {
                indexRecivedData: null,
                fetchingIndexDataStart: false,

                error: {
                    recived: false,
                    code: null,
                }
            };
        }

        default:
            return state;
    }
};






