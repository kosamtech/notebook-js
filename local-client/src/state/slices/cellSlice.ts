import { createSlice } from "@reduxjs/toolkit";
import { Cell } from "../cell";
import {
    DeleteCellAction,
    InsertCellAfterAction,
    MoveCellAction,
    UpdateCellAction,
} from "../actions";

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
        updateCell: (state: CellState, action: UpdateCellAction) => {
            const { id, content } = action.payload;
            state.data[id].content = content;
        },
        deleteCell: (state: CellState, action: DeleteCellAction) => {
            delete state.data[action.payload];
            state.order = state.order.filter((id) => id !== action.payload);
        },
        moveCell: (state: CellState, action: MoveCellAction) => {
            const { direction, id } = action.payload;
            const index = state.order.findIndex((id) => id === id);
            const targetIndex = direction === "up" ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return;
            }
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = id;
        },
        insertCellAfter: (state, action: InsertCellAfterAction) => {
            const cell: Cell = {
                content: "",
                type: action.payload.type,
                id: randomId(),
            };

            state.data[cell.id] = cell;
            const foundIndex = state.order.findIndex(
                (id) => id === action.payload.id,
            );
            if (foundIndex < 0) {
                state.order.unshift(cell.id);
            } else {
                state.order.splice(foundIndex + 1, 0, cell.id);
            }
        },
    },
});

const randomId = () => Math.random().toString(36).substring(2, 5);

export default cellSlice;