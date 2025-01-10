import fs from "node:fs/promises";
import path from "node:path";
import express from "express";

interface Cell {
    id: string;
    content: string;
    type: "text" | "code";
}

interface LocalApiError {
    code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();

    router.use(express.json());

    const fullPath = path.join(dir, filename);

    const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === "string";
    };

    router.get("/api/v1/cells", async (req, res) => {
        // Read the file
        // Parse a list of cells out of it
        // Send list of cells back to broswer
        try {
            const result = await fs.readFile(fullPath, "utf8");
            res.status(200).json(JSON.parse(result));
        } catch (error) {
            if (isLocalApiError(error)) {
                if (error.code === "ENOENT") {
                    await fs.writeFile(fullPath, "[]", "utf8");
                    res.status(200).json([]);
                }
            } else {
                throw error;
            }
        }
    });

    router.post("/api/v1/cells", async (req, res) => {
        const { cells }: { cells: Cell[] } = req.body;

        try {
            await fs.writeFile(
                fullPath,
                JSON.stringify(cells, null, 4),
                "utf8",
            );
            res.status(201).json({ message: "created" });
        } catch (error) {
            throw error;
        }
    });

    return router;
};
