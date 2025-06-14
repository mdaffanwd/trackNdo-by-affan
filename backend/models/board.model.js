import { model, Schema, SchemaTypes } from "mongoose";

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tasks: [{
    type: SchemaTypes.ObjectId,
    ref: "Task"
  }],
  // owner: {
  //   type: SchemaTypes.ObjectId,
  //   ref: "User",
  // }
}, { timestamps: true })

const Board = model("Board", boardSchema)
export default Board