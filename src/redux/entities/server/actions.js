import * as types from "./constants/server";

/**
 * Данный метод работает за счет Redux Thunk - первый вызов его в компоненте, отдающим методу params позволяет через
 * замыкание иметь эти params в дальнейшем. В результате возвращается новая функция вида async (dispatch, getState, api) {}
 * Эта функция уходит в обработку Redux и middlaware, а Thunk содержит в себе проверку на передачу функции.
 * Именно ее он и вызывает.
 */
export const fetchPageData = ({ match: { path: route = "/", params } }) => async (dispatch, getState, api) => {
    //console.log('route', route);
   // console.log('params', params);

    const isThatIndexPage = !Object.keys(params).length;
    //console.log(isThatIndexPage);

    const uri = isThatIndexPage ? "index" : `${route.match(/\/([a-z]*)\/:/)[1]}/${Object.values(params).join("/")}`;
    //console.log('uri', uri);

    const pageType = !Object.keys(params).length ? "index" : route.match(/\/([a-z]*)\/:/)[1];
    dispatch({ type: types.SERVER_START_FETCH_DATA });

    // Тут перехват через try работает, только если interceptor FailRequest от axios сочтет это ошибкой.
    // Иначе это будет просто текстовый ответ от сервера, типа разметки страницы с ошибкой и это все уйдет в response.data
    // и ошибкой считаться не будет
    try {
        const response = await api.get(uri);
        dispatch({
            type: types.SERVER_FETCH_PAGE_DATA,
            payload: { pageType, data: response.data },
        });
        dispatch({ type: types.SERVER_END_FETCH_DATA });
    } catch (error) {
        // Если обьявить history выше, в начале функции, то она может быть проиницализирована null, так как useEffect
        // от хука HistoryInstance еще не сработал. В этой точке значение уже корректное. Но я все равно прописал fallback для редиректа
        const { history } = getState().server;
        dispatch({ type: types.SERVER_END_FETCH_DATA });
        const status = error.response ? error.response.status : error.code === "ECONNABORTED" ? 500 : 400;
        status === 400 ? history.push("/400") : status === 500 ? history.push("/500") : history.push("/404");
    }
};


export const clearCategoryPageReduxData = () => ({
    type: types.SERVER_CLEAR_CATEGORY_PAGE_REDUX_DATA,
});

export const clearSingleProductReduxData = () => ({
    type: types.SERVER_CLEAR_SINGLE_PRODUCT__PAGE_REDUX_DATA,
});


export const createHistoryInstance = (history) => ({
    type: types.CREATE_HISTORY_INSTANCE,
    payload: history
});














