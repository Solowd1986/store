const loggerExample = (store) => (next) => (action) => {
  if (action === "string") {
    return {
      type: action,
    };
  }
  //console.log(next);
  //action.payload.num = 1;
  //console.log('action', action);
  //console.log('middle', store.getState());

  return next(action);
};

export default loggerExample;
