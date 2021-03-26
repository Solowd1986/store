import * as types from "./constants/server";

const initialState = {
  index: null,
  category: null,
  product: null,
  lazy: null,

  lastIndex: 0,
  fetchingLazyDataStart: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SERVER_FETCH_PAGE_DATA: {
      // console.log('act', action);

      return {
        ...state,
        [action.payload.pageType]: action.payload.data,
      };
    }

    case types.SERVER_START_FETCH_PAGE_DATA: {
      return {
        ...state,
        fetchingLazyDataStart: true,
      };
    }

    case types.SERVER_FETCH_LAZY_PAGE_DATA: {
      return {
        ...state,
        fetchingLazyDataStart: false,
        lastIndex: action.payload.lastIndex,
        lazy: action.payload.load,
      };
    }

    case types.SERVER_CLEAR_CATEGORY_PAGE_REDUX_DATA: {
      return {
        ...state,
        category: null,
        lastIndex: 0,
      };
    }
  }

  return state;
};
