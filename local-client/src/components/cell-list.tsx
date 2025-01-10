import { FC, Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import SaveCell from "./save-cells";
import "./cell-list.css";

const CellList: FC = () => {
    const { order, data } = useTypedSelector((state) => state.cells);
    const cells = order.map((id) => data[id]);

    const { fetchCells } = useActions();

    useEffect(() => {
        fetchCells();
    }, []);

    const renderedCells = cells.map((cell) => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
        </Fragment>
    ));

    return (
        <div className="cell-list">
            <SaveCell />
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    );
};

export default CellList;
