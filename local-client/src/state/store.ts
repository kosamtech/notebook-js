import { configureStore } from "@reduxjs/toolkit";
import cellSlice from "./slices/cellSlice";
import bundleSlice from "./slices/bundleSlice";

export const store = configureStore({
    reducer: {
        cells: cellSlice.reducer,
        bundles: bundleSlice.reducer,
    },
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch(cellSlice.actions.insertCellAfter({ id: null, type: "code" }));
store.dispatch(cellSlice.actions.insertCellAfter({ id: null, type: "text" }));
