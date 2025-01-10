import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cell, CellType } from "../cell";
import bundle from "../../bundler";
import { RootState } from "../store";

export type Direction = "up" | "down";

export interface MoveCellAction {
    payload: {
        id: string;
        direction: Direction;
    };
}

export interface DeleteCellAction {
    payload: string;
}

export interface InsertCellAfterAction {
    payload: {
        id: string | null;
        type: CellType;
    };
}

export interface UpdateCellAction {
    payload: {
        id: string;
        content: string;
    };
}

export interface BundleStartAction {
    payload: {
        cellId: string;
    };
}

export interface BundleCompleteAction {
    payload: {
        cellId: string;
        bundle: {
            code: string;
            err: string;
        };
    };
}

interface CreateBundleArgs {
    cellId: string;
    input: string;
}

export const createBundle = createAsyncThunk(
    "bundle/createBundle",
    async (args: CreateBundleArgs, thunkAPI) => {
        try {
            const result = await bundle(args.input);
            const payload = {
                cellId: args.cellId,
                bundle: result,
            };
            return payload;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            console.log("unexpected error occurred", error);
            return thunkAPI.rejectWithValue("unexpected error occurred");
        }
    },
);

export const fetchCells = createAsyncThunk(
    "cell/fetchCell",
    async (_, thunkAPI) => {
        try {
            const { data }: { data: Cell[] } = await axios.get(
                "http://localhost:4005/api/v1/cells",
            );
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            console.log("unexpected error occurred", error);
            return thunkAPI.rejectWithValue("unexpected error occurred");
        }
    },
);

export const saveCells = createAsyncThunk(
    "cell/saveCells",
    async (_, thunkAPI) => {
        try {
            const {
                cells: { data, order },
            } = thunkAPI.getState() as RootState;
            const cells = order.map((id) => data[id]);
            return await axios.post("http://localhost:4005/api/v1/cells", {
                cells,
            });
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            console.log("unexpected error occurred", error);
            return thunkAPI.rejectWithValue("unexpected error occurred");
        }
    },
);

export type Action =
    | MoveCellAction
    | DeleteCellAction
    | InsertCellAfterAction
    | UpdateCellAction
    | BundleStartAction
    | BundleCompleteAction;
