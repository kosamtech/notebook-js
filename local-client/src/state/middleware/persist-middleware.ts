import { Dispatch, MiddlewareAPI, Action } from "@reduxjs/toolkit"
import { actionCreators } from ".."


export const persistMiddleware = (_: MiddlewareAPI<Dispatch, any>) => {
    return (next: Dispatch<Action>) => {
        return (action: Action) => {
            next(action)
            if ([actionCreators.moveCell.type, actionCreators.updateCell.type, actionCreators.deleteCell.type, actionCreators.insertCellAfter.type].includes(action.type as typeof actionCreators.moveCell.type | typeof actionCreators.updateCell.type | typeof actionCreators.deleteCell.type | typeof actionCreators.insertCellAfter.type)) {
                console.log("I Want to SAVE CELLS");
            }
        }
    }
}