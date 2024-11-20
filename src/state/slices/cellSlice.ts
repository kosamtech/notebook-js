import { createSlice } from "@reduxjs/toolkit";
import { Cell } from "../cell";

interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    };
}

const initialState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const cellSlice = createSlice({
    name: "cell",
    initialState,
    reducers: {
        updateCell: () => {},
        deleteCell: () => {},
        moveCell: () => {},
        insertCellBefore: () => {},
    },
});

export const { deleteCell, insertCellBefore, moveCell, updateCell } =
    cellSlice.actions;
export default cellSlice.reducer;
