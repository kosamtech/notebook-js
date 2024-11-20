import { configureStore } from "@reduxjs/toolkit";
import cellReducer from "./slices/cellSlice";

const store = configureStore({
    reducer: {
        cells: cellReducer,
    },
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
