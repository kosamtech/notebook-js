import { CellType } from "../cell";

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

export type Action =
    | MoveCellAction
    | DeleteCellAction
    | InsertCellAfterAction
    | UpdateCellAction
    | BundleStartAction
    | BundleCompleteAction;
