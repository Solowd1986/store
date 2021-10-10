import * as types from "./constants/product";

const initialState = {
    productRecivedData: null,
    fetchingProductDataStart: false,

    error: {
        recived: false,
        code: null,
    }

};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCT_START_FETCH_DATA: {
            return {
                ...state,
                fetchingProductDataStart: true,
            };
        }

        case types.PRODUCT_END_FETCH_DATA: {
            return {
                ...state,
                fetchingProductDataStart: false,
                productRecivedData: action.payload.data,
            };
        }

        case types.PRODUCT_ERROR_FETCH_DATA: {
            return {
                ...state,
                fetchingProductDataStart: false,
                error: {
                    recived: true,
                    code: action.payload.code,
                }
            };
        }

        case types.PRODUCT_CLEAR_REDUX_STATE: {
            return {
                productRecivedData: null,
                fetchingProductDataStart: false,

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






