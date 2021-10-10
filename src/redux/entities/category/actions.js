import * as types from "@redux/entities/category/constants/category";


/**
 * Тут перехват через try работает, только если interceptor FailRequest от axios сочтет это ошибкой.
 * Иначе это будет просто текстовый ответ от сервера, типа разметки страницы с ошибкой и это все уйдет в response.data
 * и ошибкой считаться не будет
 *
 * // Если обьявить history выше, в начале функции, то она может быть проиницализирована null, так как useEffect
 * от хука HistoryInstance еще не сработал. В этой точке значение уже корректное. Но я все равно прописал fallback для редиректа
 *
 * @param path
 * @param params
 * @returns {Function}
 */
export const fetchCategoryPageData = ({ match: { path, params } }) => async (dispatch, getState, api) => {
    const uri = `${path.match(/\/([a-z]*)\/:/)[1]}/${Object.values(params).join("/")}`;
    dispatch({ type: types.CATEGORY_START_FETCH_DATA });

    try {
        const response = await api.get(uri);
        dispatch({
            type: types.CATEGORY_END_FETCH_DATA,
            payload: { data: response.data },
        });
    } catch (error) {

        const { history } = getState().server;
        //status === 400 ? history.push("/400") : status === 500 ? history.push("/500") : history.push("/404");

        const status = error.response ? error.response.status : error.code === "ECONNABORTED" ? 500 : 400;
        dispatch({
            type: types.CATEGORY_ERROR_FETCH_DATA,
            payload: { code: `/${status}` },
            error: true
        });
    }
};


export const fetchLazyCategoryProducts = (category, index) => async (dispatch, getState, api) => {
    dispatch({ type: types.LAZY_START_FETCH_DATA });
    try {
        const response = await api.get(`lazy/${category}/${index}`);
        dispatch({
            type: types.LAZY_END_FETCH_DATA,
            payload: {
                lastIndex: response.data.lastIndex,
                load: response.data.load,
            },
        });
        dispatch({ type: types.LAZY_DATA_BEEN_ADDED });
    } catch (error) {
        const status = error.response ? error.response.status : error.code === "ECONNABORTED" ? 500 : 400;
        dispatch({
            type: types.LAZY_ERROR_FETCH_DATA,
            payload: { code: `/${status}` },
            error: true
        });
    }
};


export const discardLazyDataStatus = () => ({
    type: types.LAZY_DATA_DISCARD_STATUS,
});

export const clearCategoryReduxState = () => ({
    type: types.CATEGORY_CLEAR_REDUX_STATE,
});


export const changeSortType = (sortType) => ({
    type: types.SORT_CHANGE_SORT_TYPE,
    payload: { sortType },
});

export const discardSortType = () => ({
    type: types.SORT_DISCARD_SORT_TYPE,
});
