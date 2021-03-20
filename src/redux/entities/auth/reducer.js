import * as types from "./constants/user";

const initialState = {
    token: null,
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.USER_AUTH: {
            return {
                token: "12dfg5464e534",
                user: "bob"
            }
        }

        default:
            return state;
    }
}










