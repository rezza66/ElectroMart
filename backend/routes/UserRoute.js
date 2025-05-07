import express  from "express";
import { deleteUser, getUserById, getUserProfile, getUsers, saveUser, updateUser } from "../controllers/UserController.js";
import { upload } from "../configs/multer.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get('/user/me', protect, getUserProfile)
router.get('/users', protect, authorize('read', 'user'), getUsers)
router.get('/user/:id', protect, authorize('read', 'user'), getUserById)
router.post('/user', protect, upload, authorize('create', 'user'), saveUser)
router.put('/user/:id', protect, upload, authorize('update', 'user'), updateUser)
router.delete('/user/:id', protect, authorize('delete', 'user'), deleteUser)

export default router;