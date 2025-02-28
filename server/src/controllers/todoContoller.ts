import { Request } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/authMiddleware";
import Todo from "../models/Todo";

export const createTodo = async (req: AuthRequest, res: any) => {
  try {
    // Check if token is getting passed
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { title, description, deadline } = req.body;
    // decode userId in token
    const userId = req.user.userId;

    //create new todo & save in db
    const newTodo = new Todo({ userId, title, description, deadline });
    await newTodo.save();

    //todo is successfully created 201 status
    res.status(201).json({ message: "Created successfully", data: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Error creating", error });
  }
};

export const getAllTodo = async (req: Request, res: any) => {
  try {
    // Check if token is getting passed
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //decode userId in token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    //userId send to find all todos of this user
    const todos = await Todo.find({ userId: decoded.userId });

    //todo is successfully Get 200 status
    res.status(200).json({ message: "Get successfully", data: todos });
  } catch (error) {
    res.status(500).json({ message: "Error fetching ", error });
  }
};

export const updateTodoById = async (req: Request, res: any) => {
  try {
    // Check if token is getting passed
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //decode userId in token and jwt.verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    // get single id in params and find todo
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.userId !== decoded.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // send new body to update todo
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({ message: "Update successfully", data: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

export const deleteTodo = async (req: AuthRequest, res: any) => {
  try {
    // get single id in params and find todo
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo || todo.userId !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete Todo" });
    }

    // send single todo id to delete todo
    await Todo.findByIdAndDelete({ _id: id });
    res.json({ message: "Delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
