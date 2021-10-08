export const serverCategorySelector = (state) => state.server.category;
export const serverProductSelector = (state) => state.server.product;
export const serverIndexSelector = (state) => ({index: state.server.index, history: state.server.history});
export const serverLazySelector = (state) => state.server.lazy;
export const serverLastIndexSelector = (state) => state.server.lastIndex;
export const serverfetchingDataStartSelector = (state) => state.server.fetchingDataStart;
