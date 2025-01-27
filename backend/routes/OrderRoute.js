import express from "express";
import { getOrders, createOrder, getUserOrders } from "../controllers/OrderController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/orders", protect, authorize('read', 'order'), getOrders); 
router.get("/order", protect, authorize('read', 'order'), getUserOrders); 
router.post("/order", protect, authorize('create', 'order'), createOrder); 

export default router;
