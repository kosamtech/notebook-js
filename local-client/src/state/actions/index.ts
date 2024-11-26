import { createAsyncThunk } from "@reduxjs/toolkit";
import { CellType } from "../cell";
import bundle from "../../bundler";

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

export type Action =
    | MoveCellAction
    | DeleteCellAction
    | InsertCellAfterAction
    | UpdateCellAction
    | BundleStartAction
    | BundleCompleteAction;
