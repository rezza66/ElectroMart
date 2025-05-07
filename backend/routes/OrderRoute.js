import express from "express";
import {
  getOrders,
  createOrder,
  getUserOrders,
  getOrderStats,
  getOrderById,
//   updateOrderStatus,
  deleteOrder,
} from "../controllers/OrderController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/orders", protect, authorize("read", "order"), getOrders);
router.get(
  "/orders/my-orders",
  protect,
  authorize("read", "order"),
  getUserOrders
);
router.post("/order", protect, authorize("create", "order"), createOrder);
router.get("/orderbyid", protect, authorize("read", "order"), getOrderById);
// router.put("/order-status", protect, authorize('create', 'order'), updateOrderStatus);
router.delete(
  "/order/:orderId",
  protect,
  authorize("delete", "order"),
  deleteOrder
);
router.get("/stats", protect, authorize("read", "order"), getOrderStats);

export default router;
