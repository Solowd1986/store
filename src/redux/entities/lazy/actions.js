import * as types from "./constants/lazy";

export const fetchLazyCategoryProducts = (category, index) => async (dispatch, getState, api) => {
    dispatch({ type: types.LAZY_START_FETCH_DATA });
    try {
        const response = await api.get(`lazy/${category}/${index}`);
        dispatch({
            type: types.LAZY_FETCH_PAGE_DATA,
            payload: {
                lastIndex: response.data.lastIndex,
                load: response.data.load,
            },
        });
        dispatch({ type: types.LAZY_END_FETCH_DATA });
    } catch (error) {
        dispatch({ type: types.LAZY_END_FETCH_DATA });
        const { history } = getState().server;
        const status = error.response ? error.response.status : error.code === "ECONNABORTED" ? 500 : 400;
        status === 400 ? history.push("/400") : status === 500 ? history.push("/500") : history.push("/404");
    }
};


export const clearLazyReduxData = () => ({
    type: types.LAZY_CLEAR_CATEGORY_REDUX_DATA,
});



