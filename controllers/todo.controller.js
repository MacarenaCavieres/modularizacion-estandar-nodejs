import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const __dirname = import.meta.dirname;

const pathFile = path.join(__dirname, "../data/todos.json");
const getTodo = async (req, res) => {
    try {
        const preview = await readFile(pathFile, "utf-8");
        const todos = JSON.parse(preview);
        res.render("todos", { todos });
    } catch (err) {
        console.error("Error ===> " + err);
        return res.json({ ok: false });
    }
};

const postTodo = async (req, res) => {
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
        return res.redirect("/todos");
    } catch (err) {
        console.error("Error ===> " + err);
        return res.json({ ok: false });
    }
};

const deleteTodo = async (req, res) => {
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
};

const putTodo = async (req, res) => {
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
};

const formEdit = async (req, res) => {
    const { id } = req.params;
    const preview = await readFile(pathFile, "utf-8");
    const todos = JSON.parse(preview);

    const todo = todos.find((item) => item.id === id);
    if (!todo) return res.status(404).json({ ok: false, msg: "no se encontró el todo" });

    return res.render("todo-edit", { todo });
};

export const allMethod = {
    getTodo,
    postTodo,
    deleteTodo,
    putTodo,
    formEdit,
};
