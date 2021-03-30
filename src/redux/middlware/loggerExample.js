const loggerExample = ({ dispatch, getState }) => (next) => (action) =>
// console.log(dispatch);
// console.log(getState);
// console.log(next);
// if (typeof action !== "function") console.log(action);

// if (action.type === "server/fetchPageData") return;

// const { fetchingDataStart } = getState().server;
// if (fetchingDataStart && typeof action === "function") return;

// console.log('logger', action);

    // if (action === "string") {
    //   return {
    //     type: action,
    //   };
    // }
    next(action);
export default loggerExample;
