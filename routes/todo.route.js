import { Router } from "express";
import { allMethod } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", allMethod.getTodo);

router.post("/", allMethod.postTodo);

router.delete("/:id", allMethod.deleteTodo);

router.put("/:id", allMethod.putTodo);

router.get("/edit/:id", allMethod.formEdit);

export default router;
