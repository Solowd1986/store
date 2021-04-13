import lodashCloning from "@components/Helpers/Lodash/lodashCloning";
import produce from "immer";
import * as types from "./constants/cart";

const initialState = {
    minAmountOfProduct: 1,
    products: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM: {
            const { item } = action.payload;
            const products = lodashCloning(state.products);
            if (!products.includes(item)) {
                const product = { ...item, quantity: 1 };
                products.push(product);
            }

            return produce(state, (draft) => {
                draft.products = products;
            });
        }

        case types.CART_REMOVE_ITEM: {
            const { item } = action.payload;
            const products = lodashCloning(state.products);
            const index = products.findIndex((product) => product.id === item.id && product.title === item.title);
            products.splice(index, 1);

            return produce(state, (draft) => {
                draft.products = products;
            });
        }

        case types.CART_CHANGE_PRODUCT_AMOUNT: {
            const { id, title, quantity } = action.payload;

            const products = lodashCloning(state.products);
            const product = products.find((item) => item.id === id && item.title === title);
            product.quantity = Math.max(state.minAmountOfProduct, Math.min(product.rest, quantity));

            return produce(state, (draft) => {
                draft.products = products;
            });
        }

        default:
            return state;
    }
};
