import { Router } from "express";
import userRouter from './user.js';
import taskRouter from './task.js';
const router = new Router();

router.use('/user', userRouter);
router.use('/task', taskRouter);

export default router;
