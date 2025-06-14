import { model, Schema, SchemaTypes } from "mongoose";

const taskSchema = new Schema({
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
    type: String,
    enum: ['low', 'medium', 'high'],
      default: 'low'
  },
  board: {
    type: SchemaTypes.ObjectId,
    ref: "Board"
  },
}, { timestamps: true })

const Task = model("Task", taskSchema);
export default Task
