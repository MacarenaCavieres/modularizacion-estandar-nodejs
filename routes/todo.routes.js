import { allMethod } from "../controllers/todo.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", allMethod.getTodo);

router.post("/", allMethod.postTodo);

router.delete("/:id", allMethod.deleteTodo);

router.put("/:id", allMethod.putTodo);

export default router;
