import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = (process.env.PORT as string) || 5000;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello, MongoDB is connected!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
