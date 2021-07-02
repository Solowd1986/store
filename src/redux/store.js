import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import loggerExample from "@redux/middlware/loggerExample";
import composeEnhancers from "./middlware/composeEnhancers";
import reducer from "./entities/rootReducer";
import reduxLogger from "./middlware/reduxLogger";
import {axiosInstance as api} from "./api/ApiService/ApiService";

const activeMiddlewareList = [loggerExample, reduxThunk.withExtraArgument(api.customAxiosInstance)];

const preloadedState = {
    ...JSON.parse(decodeURIComponent(localStorage.getItem("cart"))),
    ...JSON.parse(decodeURIComponent(localStorage.getItem("auth"))),
};

const enhancedStore = composeEnhancers(applyMiddleware(...activeMiddlewareList));
const store = Object.keys(preloadedState).length
    ? createStore(reducer, preloadedState, enhancedStore)
    : createStore(reducer, enhancedStore);

store.subscribe(() => {
    if (store.getState().cart.products.length) {
        localStorage.setItem("cart", encodeURIComponent(JSON.stringify({ cart: store.getState().cart })));
    }
    if (localStorage.getItem("cart") && !store.getState().cart.products.length) {
        localStorage.removeItem("cart");
    }
    if (store.getState().auth.rememberMe && store.getState().auth.token) {
        localStorage.setItem("auth", encodeURIComponent(JSON.stringify({ auth: store.getState().auth })));
    }
    if (store.getState().auth.isTokenExpired) {
        localStorage.removeItem("auth");
    }
});

export default store;
