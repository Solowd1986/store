import * as types from "./constants/cart";

export const addItemToCart = (item) => {
    return {
        type: types.CART_ADD_ITEM,
        payload: {
            item
        }
    }
};

export const removeItemFromCart = (item) => {
    return {
        type: types.CART_REMOVE_ITEM,
        payload: {
            item
        }
    }
};


export const changeAmountOfProduct = (id, title, quantity) => {
    return {
        type: types.CART_CHANGE_PRODUCT_AMOUNT,
        payload: {
            id,
            title,
            quantity
        }
    }
};





















