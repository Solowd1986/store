import * as types from './constants/cart';

export const addItemToCart = (item) => ({
    type: types.CART_ADD_ITEM,
    payload: {
        item,
    },
});

export const removeItemFromCart = (item) => ({
    type: types.CART_REMOVE_ITEM,
    payload: {
        item,
    },
});

export const changeAmountOfProduct = (id, title, quantity) => ({
    type: types.CART_CHANGE_PRODUCT_AMOUNT,
    payload: {
        id,
        title,
        quantity,
    },
});
