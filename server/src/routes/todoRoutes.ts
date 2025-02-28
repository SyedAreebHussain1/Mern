import express from "express";
import {
  createTodo,
  getAllTodo,
  deleteTodo,
  updateTodoById,
} from "../controllers/todoContoller";
import { authenticateUser } from "../middleware/authMiddleware"; // middleware for protecting the routes

const router = express.Router();

router.post("/", authenticateUser, createTodo);
router.get("/", getAllTodo);
router.patch("/:id", authenticateUser, updateTodoById);
router.delete("/:id", authenticateUser, deleteTodo);

export default router;
