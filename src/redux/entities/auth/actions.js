import * as types from "./constants/auth";



export const authUser = (data = null) => {
    return {
        type: types.AUTH_REQUIRE_AUTHORIZATION,
        payload: {
            data
        }
    }
};

export const getToken = (data = null) => async (dispatch, getState, api) => {
    try {
        //console.log(process.env.NODE_ENV);

        console.log('before request from action auth', data);
        const response = await api.getToken("token");
        console.log('final response in action auth', response);
    } catch (e) {
        console.log('catch that bithc', e);

    }



    // return {
    //     type: types.AUTH_REQUIRE_AUTHORIZATION,
    //     payload: {
    //         data
    //     }
    // }
};
