import Board from "../models/board.model.js"
import Task from "../models/task.model.js";


export async function createTask(req, res, next) {
  try {
    const { title, description, priority, board: boardId } = req.body
    console.log("🔍 Looking for existing task with title:", title);

    const isTaskExist = await Task.findOne({ title })
    if (isTaskExist) {
      return res
        .status(401)
        .json({ message: "Task with that title already exists" });
    }

    const board = await Board.findById(boardId);
    if (!board) return res.status(401).json({ message: "Board not found" });

    const newTask = await Task.create({
      title,
      description,
      priority,
      board: boardId
    })
    board.tasks.push(newTask._id);
    await board.save()
    res.status(201).json(newTask)
  } catch (error) {
    next(error)
  }
}

export async function updateTask(req, res) {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  // console.log(req.params.id)
  res.json(updated);
}

export async function deleteTask(req, res) {
  const { id } = req.params

  const task = await Task.findByIdAndDelete(id)
  if (!task) {
  return res.status(404).json({ message: 'Task not found' });
  }

  // await Board.findByIdAndUpdate(task.board, {
  // $pull: { tasks: id }
  // });
  return res.status(200).json({ message: 'Task deleted' });

}
