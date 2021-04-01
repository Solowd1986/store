import * as types from './constants/auth';

const initialState = {
    isUserAuthorized: false,
    isTokenExpired: false,
    rememberMe: false,
    token: null,
    user: null,

    logged: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_REQUIRE_AUTHORIZATION: {
            return {
                ...state,
                token: '12dfg5464e534',
                user: 'bob',
            };
        }

        case types.AUTH_SUCCESS_AUTHORIZATION: {
            return {
                ...state,
                isUserAuthorized: true,
            };
        }

        default:
            return state;
    }
};
