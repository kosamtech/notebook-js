import path from "node:path";
import { Command } from "commander";
// import { serve } from "local-api";

const serve = (
    port: number,
    filename: string,
    dir: string,
    useProxy: boolean,
) => {
    console.log("serving traffic in port", port);
    console.log("saving/fetching calls from", filename);
    console.log("that file is in dir", dir);
};

interface LocalApiError {
    code: string;
}

const isLocalApiError = (err: any): err is LocalApiError => {
    return typeof err.code === "string";
};

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4050")
    .action(async (filename = "notebook.js", options: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(
                parseInt(options.port),
                path.basename(filename),
                dir,
                !isProduction,
            );
            console.log(
                `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`,
            );
        } catch (error) {
            if (isLocalApiError(error)) {
                if (error.code === "EADDRINUSE") {
                    console.log(
                        "Port is in use. Try running on a different port.",
                    );
                }
            } else if (error instanceof Error) {
                console.log("Here is the problem", error.message);
            }
            process.exit(1);
        }
    });
