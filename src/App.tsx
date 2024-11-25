import { useEffect } from "react";
import * as esbuild from "esbuild-wasm";
import CellList from "./components/cell-list";

function App() {
    useEffect(() => {
        (async () => {
            await esbuild.initialize({
                worker: true,
                wasmURL: "https://unpkg.com/esbuild-wasm@0.24.0/esbuild.wasm",
            });
        })();
    }, []);
    return <CellList />;
}

export default App;
