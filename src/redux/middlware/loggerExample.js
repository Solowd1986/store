const loggerExample = ({ dispatch, getState }) => (next) => (action) => {
  //console.log(dispatch);
  //console.log(getState);
  //console.log(next);
  console.log(action);

  // if (action === "string") {
  //   return {
  //     type: action,
  //   };
  // }
  return next(action);
};

export default loggerExample;
