import { createBundle, fetchCells, saveCells } from "./actions";
import bundleSlice from "./slices/bundleSlice";
import cellSlice from "./slices/cellSlice";

export * from "./store";
export * from "./slices/bundleSlice";
export * from "./slices/cellSlice";
export * from "./cell";
export const actionCreators = {
    ...cellSlice.actions,
    ...bundleSlice.actions,
    createBundle,
    fetchCells,
    saveCells,
};
