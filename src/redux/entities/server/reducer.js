import * as types from "./constants/server";

const initialState = {
  index: null,
  category: null,
  product: null,
  lazy: null,

  lastIndex: 0,
  fetchingDataStart: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SERVER_FETCH_PAGE_DATA: {
      return {
        ...state,
        [action.payload.pageType]: action.payload.data,
      };
    }

    case types.SERVER_START_FETCH_DATA: {
      return {
        ...state,
        fetchingDataStart: true,
      };
    }

    case types.SERVER_END_FETCH_DATA: {
      return {
        ...state,
        fetchingDataStart: false,
      };
    }

    case types.SERVER_FETCH_LAZY_PAGE_DATA: {
      return {
        ...state,
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
