import { useState, useRef, FC } from "react";
import MDEditor from "@uiw/react-md-editor";
import useClickOutside from "../hooks/use-click-outside";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import "./text-editor.css";

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editting, setEditting] = useState(false);
    const { updateCell } = useActions();

    useClickOutside(editorRef, setEditting);

    return (
        <>
            {editting ? (
                <div className="text-editor" ref={editorRef}>
                    <MDEditor
                        value={cell.content}
                        onChange={(v) =>
                            updateCell({ id: cell.id, content: String(v) })
                        }
                    />
                </div>
            ) : (
                <div
                    className="text-editor card"
                    onClick={() => setEditting(true)}
                >
                    <div className="card-content">
                        <MDEditor.Markdown
                            source={cell.content || "Click to edit"}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default TextEditor;
