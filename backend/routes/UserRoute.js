import express  from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUser, getUserById, getUsers, saveUser, updateUser } from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers)
router.get('/user/:id', verifyToken, getUserById)
router.post('/users',  saveUser)
router.patch('/user/:id', verifyToken, updateUser)
router.delete('/user/:id', verifyToken, deleteUser)

export default router;