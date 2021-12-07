import * as types from "./constants/cart";

const initialState = {
    minAmountOfProduct: 1,
    products: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM: {
            const { item } = action.payload;
            if (state.products.find((product) => product.id === item.id && product.title === item.title)) return state;
            const products = [...state.products];
            products.push({...item, quantity: state.minAmountOfProduct});

            return {
                ...state,
                products
            }
        }

        case types.CART_REMOVE_ITEM: {
            const { item } = action.payload;
            const products = state.products.filter((product) => product.id !== item.id && product.title !== item.title);
            return {
                ...state,
                products
            }
        }

        case types.CART_CHANGE_PRODUCT_AMOUNT: {
            const { id, title, quantity } = action.payload;

            if (!state.products.find((product) => product.id === id && product.title === title)) return state;
            const products = state.products.map(product =>
                product.id !== id && product.title !== title
                ? product
                : {...product, quantity} );

            return {
                ...state,
                products
            }
        }
        default:
            return state;
    }
};
