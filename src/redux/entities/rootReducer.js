import { combineReducers } from "redux";
import cart from "./cart/reducer";
import auth from "./auth/reducer";
import category from "./category/reducer";
import index from "./index/reducer";
import product from "./product/reducer";

// экспортируем результат работы функции combineReducers
export default combineReducers({
    cart,
    auth,
    category,
    index,
    product
});
