import { FC, useRef } from "react";
import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import prettier from "prettier";
import parser from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
// import codeShift from "jscodeshift";
// import Highlighter from "monaco-jsx-highlighter";
import "./code-editor.css";
import "./syntax.css";

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const onEditorMount: OnMount = (editor, _) => {
        editorRef.current = editor;

        // const highlighter = new Highlighter(
        //     // @ts-ignore
        //     window.monaco,
        //     codeShift,
        //     editor,
        // );
        // highlighter.highLightOnDidChangeModelContent(
        //     () => {},
        //     () => {},
        //     undefined,
        //     () => {},
        // );
    };
    const onValueChange: OnChange = (value, _) => {
        onChange(String(value));
    };

    const onFormat = async () => {
        // get current value from editor
        const unformatted = editorRef.current?.getModel()?.getValue() as string;

        // format the value
        let formatted = await prettier.format(unformatted, {
            parser: "babel",
            plugins: [parser, estree],
            useTabs: false,
            semi: true,
            singleQuote: true,
        });
        formatted = formatted.replace(/\n$/, "");

        // set the formatted value back in the editor
        editorRef.current?.setValue(formatted);
    };

    return (
        <div className="editor-wrapper">
            <button
                className="button button-format is-primary is-small"
                onClick={onFormat}
            >
                Format
            </button>
            <MonacoEditor
                language="javascript"
                height="100%"
                theme="vs-dark"
                value={initialValue}
                onMount={onEditorMount}
                onChange={onValueChange}
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
