# Mapeo de módulos

## Carpeta raíz

```sh
.
├── index.js
└── data
    ├── todos.json
└── controllers
    ├── todo.controller.js
└── routes
    ├── todo.route.js
└── models

```

### Index.js

```js
import express from "express";
import todoRoutes from "./routes/todo.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/todos", todoRoutes);

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
    // métodos para exportar
    getTodo,
    postTodo,
    deleteTodo,
    putTodo,
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

export default router;
```
