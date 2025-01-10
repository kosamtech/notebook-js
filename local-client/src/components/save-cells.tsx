import { FC, useState } from "react";
import "./save-cells.css";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

const SaveCell: FC = () => {
    const [root, setRoot] = useState<string>("notebook");
    const [showExt, setShowExt] = useState<boolean>(false);
    const [ext, setExt] = useState<string>(".js");
    const [showFileNameSave, setShowFileNameSave] = useState<boolean>(false);
    const { data, order } = useTypedSelector((state) => state.cells);
    const { saveCells } = useActions();

    const handleFileDownload = () => {
        const cells = order.map((id) => data[id]);
        saveCells();

        const fileName = root + ext;
        const href = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(cells, null, 2),
        )}`;
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    return (
        <div className="save-cells">
            <button
                className={`button is-primary fade-out ${showExt && "force-visible"}`}
                onClick={() => setShowExt(true)}
            >
                SaveAs
            </button>
            {showExt && (
                <div onClick={() => setShowFileNameSave(true)}>
                    <span
                        onClick={() => setExt(".js")}
                        className={`button is-rounded`}
                    >
                        .js {ext === ".js" && <strong> &#10003;</strong>}
                    </span>{" "}
                    <span
                        onClick={() => setExt(".json")}
                        className={`button is-rounded`}
                    >
                        .json {ext === ".json" && <strong> &#10003;</strong>}
                    </span>
                </div>
            )}
            {showFileNameSave && (
                <>
                    <div>
                        <input
                            className="input is-small"
                            type="text"
                            placeholder="Enter filename here"
                            value={root}
                            onChange={(e) => setRoot(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleFileDownload}
                        className="button is-small"
                    >
                        Download <span>&#11015;</span>
                    </button>
                </>
            )}
        </div>
    );
};

export default SaveCell;
