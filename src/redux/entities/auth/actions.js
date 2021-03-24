import * as types from "./constants/auth";

export const authUser = (data = null) => {
    return {
        type: types.AUTH_REQUIRE_AUTHORIZATION,
        payload: {
            data
        }
    }
};

