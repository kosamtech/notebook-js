import { useEffect } from "react";
import * as esbuild from "esbuild-wasm";
// import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

function App() {
    useEffect(() => {
        (async () => {
            await esbuild.initialize({
                worker: true,
                wasmURL: "https://unpkg.com/esbuild-wasm@0.24.0/esbuild.wasm",
            });
        })();
    }, []);
    return (
        <>
            <TextEditor />
            {/* <CodeCell /> */}
        </>
    );
}

export default App;
