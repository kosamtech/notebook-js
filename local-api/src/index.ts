import path from "node:path";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";

export const serve = (
    port: number,
    filename: string,
    dir: string,
    useProxy: boolean,
) => {
    const app = express();

    app.use(createCellsRouter(filename, dir));

    if (useProxy) {
        app.use(
            createProxyMiddleware({
                target: "http://127.0.0.1:5173",
                ws: true,
            }),
        );
    } else {
        // const pkgPath = require.resolve("local-client/build/index.html");
        // app.use(express.static(path.dirname(pkgPath)));
        app.get("/", (req, res) => {
            res.send("API is running successfully...");
        });
    }

    return new Promise<void>((resolve, reject) => {
        app.listen(port, () => {
            console.log(`server running on http://localhost:${port}`);
            resolve;
        }).on("error", reject);
    });
};

serve(4005, "notebook.json", path.dirname(__filename), false);
