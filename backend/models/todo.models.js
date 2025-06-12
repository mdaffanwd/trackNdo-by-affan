import { model, Schema, SchemaTypes } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    enum: ['low', 'medium', 'high']
  },
  board: {
    type: SchemaTypes.ObjectId,
    ref: "Board"
  },
}, { timestamps: true })

const Todo = model("Todo", todoSchema);
export default Todo
