import { Router } from 'express'
import { createBoard, deleteBoard, getBoards, updateBoard } from '../controllers/board.controllers.js';

const router = Router()

router.get("/", getBoards)
router.post("/", createBoard)
router.patch("/:id", updateBoard)
router.delete("/:id", deleteBoard)

const boardRoutes = router
export default boardRoutes