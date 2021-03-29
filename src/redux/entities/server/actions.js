import * as types from "./constants/server";

export const fetchPageData = params => async (dispatch, getState, api) => {
  const {
    match: { path: route, params: data },
    history,
  } = params;

  const pageType = !Object.keys(data).length ? "index" : route.match(/\/([a-z]*)\/:/)[1];

  dispatch({ type: types.SERVER_START_FETCH_DATA});

  try {
    const response = await api.fetchData(params);
    if (response.data.error) return;
    dispatch({
      type: types.SERVER_FETCH_PAGE_DATA,
      payload: { pageType, data: response.data },
    });
    dispatch({ type: types.SERVER_END_FETCH_DATA});

  } catch (e) {
    history.push("/500");
    dispatch({ type: types.SERVER_END_FETCH_DATA});
  }
};

export const clearCategoryPageReduxData = () => ({
  type: types.SERVER_CLEAR_CATEGORY_PAGE_REDUX_DATA,
});

export const fetchLazyCategoryProducts = (category, index, history) => async (dispatch, getState, api) => {
  dispatch({ type: types.SERVER_START_FETCH_DATA });

  // console.log(category);
  // console.log(history);

  const response = await api.get(`lazy/${category}/${index}`);
  // const response = await api.axrReq(`lazy/${category}/${index}`);

  // console.dir(response);
  dispatch({
    type: types.SERVER_FETCH_LAZY_PAGE_DATA,
    payload: {
      lastIndex: response.data.lastIndex,
      load: response.data.load,
    },
  });
  dispatch({ type: types.SERVER_END_FETCH_DATA });
};


// export const f1etchLazyCategoryProducts = (category) => (dispatch, getState, api) => {
//   dispatch({ type: types.SERVER_START_FETCH_PAGE_DATA });
//   api
//     .get(`category/${category}`)
//     .then((responce) => {
//       console.dir(responce);
//       dispatch({
//         type: types.SERVER_FETCH_LAZY_PAGE_DATA,
//         payload: {
//           load: responce.data,
//         },
//       });
//     })
//     .catch((error) => {
//       console.log("error from server in action fetchLazyCategoryProducts: ", error);
//     });
// };
