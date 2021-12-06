import * as types from "@redux/entities/product/constants/product";


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
export const fetchProductPageData = (path, ...params) => async (dispatch, getState, api) => {
    console.log(path);
    console.log(params);


    const uri = `${path.match(/\/([a-z]*)\/:/)[1]}/${params.join("/")}`;
    dispatch({ type: types.PRODUCT_START_FETCH_DATA });

    try {
        const response = await api.get(uri);
        dispatch({
            type: types.PRODUCT_END_FETCH_DATA,
            payload: { data: response.data },
        });
    } catch (error) {
        const status = error.response ? error.response.status : error.code === "ECONNABORTED" ? 500 : 400;
        dispatch({
            type: types.PRODUCT_ERROR_FETCH_DATA,
            payload: { code: `/${status}` },
            error: true
        });
    }
};


export const clearProductReduxState = () => ({
    type: types.PRODUCT_CLEAR_REDUX_STATE,
});

