import {Router} from 'express';
import taskController from '../controllers/taskController.js';
const router = new Router();

router.post('/createTask', taskController.create);
router.post('/fetchById',taskController.fetchTasksById)
router.post('/fetchByResponsible',taskController.fetchTasksByResponsible)
router.delete('/deleteTask', taskController.deleteTaskById);
router.put('/updateTask', taskController.updateTask);
router.post('/getOneTask', taskController.getOneTask);
router.put('/updateTaskStatus',taskController.updateTaskStatus);

export default router;