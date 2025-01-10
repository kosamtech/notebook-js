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

const initialCells = [
    {
        content:
            "# NoteBookJS\n\nThis is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one) to edit it\n- The code in each code editor is in isolated enviroment. You have to redefine variables to use them in the subsquent cells!\n- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values.\n- Reorder or delete cells using the button on the top right\n- Add new cells by hovering on the divider between each cell\n- The css framework in the project is bulma css\n\nAll of your changes can be saved into a file, either as `.js` or `.json` by clicking on the `SaveAs` button on the menu bar",
        type: "text",
        id: "grku7qge",
    },
    {
        content:
            'import { useState } from "react";\n\nconst Counter = () => {\n    const [count, setCount] = useState(0);\n    return (\n        <div>\n            <button onClick={() => setCount(count + 1)} style={{marginRight: "10px"}}>Increment</button>\n            <button onClick={() => setCount(count - 1)}>Decrement</button>\n            <h3>Count: {count}</h3>\n        </div>\n    )\n}\n\n// Display any variable or React Component by calling \'show\'\nshow(<Counter />);',
        type: "code",
        id: "w64gmxcq",
    },
];

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
            const resultObj = JSON.parse(result);
            if (resultObj.length > 0) {
                res.status(200).json(resultObj);
            } else {
                res.status(200).json(initialCells);
            }
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
