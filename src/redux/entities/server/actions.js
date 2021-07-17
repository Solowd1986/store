import * as types from "./constants/server";

export const fetchPageData = (params) => async (dispatch, getState, api) => {
    const {
        match: { path: route, params: data },
        history,
    } = params;
    const isThatIndexPage = !Object.keys(data).length;
    const uri = isThatIndexPage ? "index" : `${route.match(/\/([a-z]*)\/:/)[1]}/${Object.values(data).join("/")}`;
    const pageType = !Object.keys(data).length ? "index" : route.match(/\/([a-z]*)\/:/)[1];
    dispatch({ type: types.SERVER_START_FETCH_DATA });

    // Тут перехват через try работает, только если interceptor FailRequest от axios сочтет это ошибкой.
    // Иначе это будет просто текстовый ответ от сервера, типа разметки страницы с ошибкой и это все уйдет в response.data
    try {
        const response = await api.get(uri);
        dispatch({
            type: types.SERVER_FETCH_PAGE_DATA,
            payload: { pageType, data: response.data },
        });
        dispatch({ type: types.SERVER_END_FETCH_DATA });
    } catch (error) {
        dispatch({ type: types.SERVER_END_FETCH_DATA });
        const status = error.response ? error.response.status : error.code === "ECONNABORTED" ? 500 : 400;
        switch (status) {
            case 400: {
                history.push("/400");
                break;
            }
            case 500: {
                history.push("/500");
                break;
            }
            default:
        }
    }
};


export const fetchLazyCategoryProducts = (category, index, history) => async (dispatch, getState, api) => {
    dispatch({ type: types.SERVER_START_FETCH_DATA });

    try {
        const response = await api.get(`lazy/${category}/${index}`);
        dispatch({
            type: types.SERVER_FETCH_LAZY_PAGE_DATA,
            payload: {
                lastIndex: response.data.lastIndex,
                load: response.data.load,
            },
        });
        dispatch({ type: types.SERVER_END_FETCH_DATA });
    } catch (error) {
        dispatch({ type: types.SERVER_END_FETCH_DATA });
        const status = error.response ? error.response.status : error.code === "ECONNABORTED" ? 500 : 400;
        switch (status) {
            case 400: {
                history.push("/400");
                break;
            }
            case 500: {
                history.push("/500");
                break;
            }
            default:
        }
    }
};

export const clearCategoryPageReduxData = () => ({
    type: types.SERVER_CLEAR_CATEGORY_PAGE_REDUX_DATA,
});

export const clearSingleProductReduxData = () => ({
    type: types.SERVER_CLEAR_SINGLE_PRODUCT__PAGE_REDUX_DATA,
});
