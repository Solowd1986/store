import * as types from "./constants/user";

export const authUser = (data = null) => {
    return {
        type: types.USER_AUTH,
        payload: {
            data
        }
    }
};

