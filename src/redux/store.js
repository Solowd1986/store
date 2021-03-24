import { applyMiddleware, createStore } from "redux";
import composeEnhancers from "./middlware/composeEnhancers";
import reducer from "./entities/rootReducer";
import reduxThunk from "redux-thunk";
import reduxLogger from "./middlware/reduxLogger";
import loggerExample from "@redux/middlware/loggerExample";
import ApiService from "./api/ApiService/ApiService";

const activeMiddlewareList = [reduxThunk.withExtraArgument(ApiService), loggerExample];

const preloadedState = {
  ...JSON.parse(decodeURIComponent(localStorage.getItem("cart"))),
  ...JSON.parse(decodeURIComponent(localStorage.getItem("auth"))),
};

const enhancedStore = composeEnhancers(applyMiddleware(...activeMiddlewareList));
const store = preloadedState
  ? createStore(reducer, preloadedState, enhancedStore)
  : createStore(reducer, enhancedStore);

store.subscribe(() => {
  if (store.getState().cart.products.length) {
    localStorage.setItem("cart", encodeURIComponent(JSON.stringify({ cart: store.getState().cart })));
  }
  if (localStorage.getItem("cart") && !store.getState().cart.products.length) {
    localStorage.removeItem("cart");
  }
  if (store.getState().auth.token) {
    localStorage.setItem("auth", encodeURIComponent(JSON.stringify({ auth: store.getState().auth })));
  }
  if (store.getState().auth.isTokenExpired) {
    localStorage.removeItem("auth");
  }
});

export default store;
