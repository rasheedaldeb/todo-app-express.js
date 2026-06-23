import express from "express";
import { todosArr } from "../data/data.js";
export const router = express.Router();
router.get("/", (req, res) => {
  res.send("TaskTrek Project");
});
router.get("/", (req, res) => {
  res.json(todosArr);
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const todo = todosArr.find((todo) => todo.id === parseInt(id));
  const statusCode = todo ? 200 : 404;
  res.status(statusCode);
  res.json(todo || { message: "Todo not found" });
});
router.post("/", (req, res) => {
  const todo = req.body;
  if (!todo.task) {
    return res.status(400).json({ message: "task is required" });
  }
  if (!todo.tags) {
    return res.status(400).json({ message: "tags are required" });
  }
  if (!todo.status) {
    return res.status(400).json({ message: "status is required" });
  }
  const newTodo = {
    id: todosArr[todosArr.length - 1].id + 1,
    task: todo.task,
    tags: todo.tags,
    status: todo.status,
  };
  todosArr.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task, tags, status } = req.body || {};
  const todoIndex = todosArr.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  if (task) {
    todosArr[todoIndex].task = task;
  }
  if (tags) {
    todosArr[todoIndex].tags = tags;
  }
  if (status) {
    todosArr[todoIndex].status = status;
  }
  res.json(todosArr[todoIndex]);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todosArr.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todosArr.splice(todoIndex, 1);
  res.json({ message: "Todo deleted successfully" });
});
