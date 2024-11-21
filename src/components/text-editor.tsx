import { useState, useRef, FC } from "react";
import MDEditor from "@uiw/react-md-editor";
import useClickOutside from "../hooks/use-click-outside";
import "./text-editor.css";

const TextEditor: FC = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editting, setEditting] = useState(false);
    const [value, setValue] = useState("# Header");

    useClickOutside(editorRef, setEditting);

    return (
        <>
            {editting ? (
                <div className="text-editor" ref={editorRef}>
                    <MDEditor
                        value={value}
                        onChange={(v) => setValue(String(v))}
                    />
                </div>
            ) : (
                <div
                    className="text-editor card"
                    onClick={() => setEditting(true)}
                >
                    <div className="card-content">
                        <MDEditor.Markdown source={value} />
                    </div>
                </div>
            )}
        </>
    );
};

export default TextEditor;
