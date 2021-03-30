export const requestIndexData = () => (dispatch, getState) => {
    dispatch({ type: "server/startRequest" });
    // setTimeout(() => {
    //
    //
    //
    // });
    fetch("api/index", { method: "GET" })
        .then((result) => result.json())
        .then((result) => {
            dispatch({ type: "server/getIndexData", payload: result });
        })
        .catch((error) => dispatch({ type: "server/serverError", payload: error }));
};
