import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login)
router.get('/checkAuth', authMiddleware, userController.checkAuth)
router.get('/getSubordinatesBySupervisor', authMiddleware, userController.getSubordinatesBySupervisor)

export default router;