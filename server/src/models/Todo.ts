import mongoose, { Schema, Document } from "mongoose";

// Define the schema for Todo model
interface ITodo extends Document {
  userId: string;
  title: string;
  description: string;
  deadline: Date;
}

const TodoSchema = new Schema<ITodo>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
