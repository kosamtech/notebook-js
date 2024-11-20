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

export interface InsertCellBeforeAction {
    payload: {
        id: string;
        type: CellType;
    };
}

export interface UpdateCellAction {
    payload: {
        id: string;
        content: string;
    };
}

export type Action =
    | MoveCellAction
    | DeleteCellAction
    | InsertCellBeforeAction
    | UpdateCellAction;
