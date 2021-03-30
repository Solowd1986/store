import * as types from "./constants/sort";

const initialState = {
    sortType: "по популярности",
};

export default (state = initialState, action) => {
    switch (action.type) {
    case types.SORT_CHANGE_SORT_TYPE: {
        return {
            sortType: action.payload.sortType,
        };
    }

    case types.SORT_DISCARD_SORT_TYPE: {
        return {
            sortType: "по популярности",
        };
    }
    default: {
        return state;
    }
    }
};
