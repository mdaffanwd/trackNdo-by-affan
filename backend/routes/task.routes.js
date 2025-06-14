import { Router } from 'express'
import { createTask, deleteTask, updateTask } from '../controllers/task.controllers.js'


const router = Router()

router.post("/", createTask)
// router.get('/', getTasks);
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)


const taskRoutes = router
export default taskRoutes;