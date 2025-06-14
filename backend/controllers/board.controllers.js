import Board from '../models/board.model.js';
import Task from '../models/task.model.js';

export const createBoard = async (req, res, next) => {
  try {
    const { title } = req.body;
    // const isBoardExist = Board.findOne({ title })
    // if (isBoardExist) return res.json({ message: "Board already found" });

    const board = await Board.create({ title })
    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
}

export const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({}).populate('tasks').lean()
    res.json(boards);
  } catch (error) {
    next(error)
  }
}

// TODO: make h2 a input to edit it there on the go.
export const updateBoard = async (req, res, next) => {
  try {
    const { title } = req.body;
    const board = await Board.findOneAndUpdate({ _id: req.params.id }, { title }, { new: true }
    )
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.json(board);
  } catch (err) {
    next(err);
  }
}

export const deleteBoard = async (req, res, next) => {
  try {
    const board = await Board.findOneAndDelete({ _id: req.params.id })
    if (!board) return res.status(404).json({ message: 'Board not found' });
    await Task.deleteMany({ board: req.params.id });
    res.json({ message: 'Board and its tasks deleted' });
  } catch (err) {
    next(err);
  }
}