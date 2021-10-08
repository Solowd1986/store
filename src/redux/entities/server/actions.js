import * as types from "./constants/server";


/**
 * Данный метод работает за счет Redux Thunk - первый вызов его в компоненте, отдающим методу params позволяет через
 * замыкание иметь эти params в дальнейшем. В результате возвращается новая функция вида async (dispatch, getState, api) {}
 * Эта функция уходит в обработку Redux и middlaware, а Thunk содержит в себе проверку на передачу функции.
 * Именно ее он и вызывает.
 */
export const fetchPageData = ({ match: { path: route = "/", params } }) => async (dispatch, getState, api) => {
    const isThatIndexPage = !Object.keys(params).length;
    const uri = isThatIndexPage ? "index" : `${route.match(/\/([a-z]*)\/:/)[1]}/${Object.values(params).join("/")}`;
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
        switch (status) {
            case 400: {
                history ? history.push("/400") : window.location.href = "/400";
                break;
            }
            case 500: {
                history ? history.push("/500") : window.location.href = "/500";
                break;
            }
            default:
        }
    }
};


export const fetchLazyCategoryProducts = (category, index) => async (dispatch, getState, api) => {
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
        const { history } = getState().server;
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


export const createHistoryInstance = (history) => ({
    type: types.CREATE_HISTORY_INSTANCE,
    payload: history
});














