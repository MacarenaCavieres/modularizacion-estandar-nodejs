# Mapeo de módulos

## Carpeta raíz

```sh
.
├── index.js
└── data
    ├── todos.json
└── controllers
    ├── todo.controller.js
└── public
    └── assets
        └── js
            ├── app.js
└── routes
    ├── todo.route.js
└── views
    ├── todos.hbs
    ├── todo-edit.hbs
    └── layouts
        ├── main.hbs
└── models

```

### Index.js

```js
import express from "express";
import todoRoutes from "./routes/todo.route.js";

const app = express();

app.use(express.static("public"));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname + "/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
```

### todos.json

```json
[
    { "id": "1", "task": "Tarea 1", "completed": false },
    { "id": "2", "task": "Tarea 2", "completed": false },
    { "id": "3", "task": "Tarea 3", "completed": false },
    { "id": "4", "task": "Tarea 4", "completed": false },
    { "id": "5", "task": "Tarea 5", "completed": false }
]
```

### todo.controller.js

```js
import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const __dirname = import.meta.dirname;

const pathFile = path.join(__dirname, "../data/todos.json");

//lógica de los métodos

export const allMethod = {
    // metodos para exportar a carpeta routes
    getTodo,
    postTodo,
    deleteTodo,
    putTodo,
    formEdit,
};
```

### todo.route.js

```js
import { allMethod } from "../controllers/todo.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", allMethod.getTodo);

router.post("/", allMethod.postTodo);

router.delete("/:id", allMethod.deleteTodo);

router.put("/:id", allMethod.putTodo);

router.get("/edit/:id", allMethod.formEdit);

export default router;
```

### main.hbs

```html
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>To dos</title>
    </head>
    <body>
        {{{body}}}
        <script src="/assets/js/app.js"></script>
    </body>
</html>
```

### todos.hbs

```html
<form action="/todos" method="POST">
    <input type="text" name="task" placeholder="Ingrese tarea" />
    <button type="submit">Agregar</button>
</form>

<ul>
    {{#if todos}} {{#each todos}}
    <li>
        <input type="checkbox" {{#if completed}} checked {{/if}} disabled> {{this.task}}
        <button onclick="todoDelete('{{id}}')">Eliminar</button>
        <a href="/todos/edit/{{id}}">Actualizar</a>
    </li>
    {{/each}} {{/if}}
</ul>
```

### todo-edit.hbs

```html
<form id="form">
    <input type="hidden" value="{{todo.id}}" id="id" />
    <input type="text" value="{{todo.task}}" id="task" />
    <input type="checkbox" {{#if todo.completed}}checked{{/if}} id="completed">
    <button type="submit">Editar todo</button>
</form>
```

### app.js

```js
const todoDelete = async (id) => {
    console.log("click");
    const response = await fetch(`/todos/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        window.location.reload();
    }
};

const form = document.getElementById("form");
const id = document.getElementById("id");
const task = document.getElementById("task");
const completed = document.getElementById("completed");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const editTodo = {
            id: id.value,
            task: task.value,
            completed: completed.value,
        };

        const response = await fetch(`/todos/${editTodo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editTodo),
        });

        if (response.ok) {
            window.location.href = "/todos";
        }
    });
}
```
