import express, { json } from "express";
import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pathFile = "./data/todos.json";

app.get("/todos", async (req, res) => {
    try {
        const preview = await readFile(pathFile, "utf-8");
        const todos = JSON.parse(preview);

        res.json(todos);
    } catch (err) {
        console.error("Error ===> " + err);
        return res.json({ ok: false });
    }
});

app.post("/todos", async (req, res) => {
    try {
        const { task = "" } = req.body;
        const newTodo = {
            id: nanoid(4),
            task,
            completed: false,
        };

        const preview = await readFile(pathFile, "utf-8");
        const todos = JSON.parse(preview);

        todos.push(newTodo);

        await writeFile(pathFile, JSON.stringify(todos));
        res.json(todos);
    } catch (err) {
        console.error("Error ===> " + err);
        return res.json({ ok: false });
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const preview = await readFile(pathFile, "utf-8");
        const todos = JSON.parse(preview);

        const todo = todos.find((item) => item.id === id);

        if (!todo) return res.status(404).json({ msg: "no se encontro recurso" });

        const nuevaLista = todos.filter((item) => item.id !== id);

        await writeFile(pathFile, JSON.stringify(nuevaLista));

        res.json(nuevaLista);
    } catch (err) {
        console.error("Error ===> " + err);
        return res.json({ ok: false });
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;

        const preview = await readFile(pathFile, "utf-8");
        const todos = JSON.parse(preview);

        const todo = todos.find((item) => item.id === id);

        if (!todo) return res.status(404).json({ msg: "recurso no encontrado" });

        todo.task = task;
        todo.completed = completed;

        await writeFile(pathFile, JSON.stringify(todos));

        res.json(todos);
    } catch (err) {
        console.error("Error ===> " + err);
        return res.json({ ok: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
