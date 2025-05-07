import express from "express";
import { getCart, updateCart, createCart, deleteCart, deleteCartAfterPayment } from "../controllers/CartController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/cart", protect, authorize('read', 'cart'), getCart);
router.post("/cart/add", protect, authorize('create', 'cart'), createCart);
router.put("/cart/update/:cartItemId", protect, authorize('update', 'cart'), updateCart);
router.delete("/cart/delete/:cartItemId", protect, authorize('delete', 'cart'), deleteCart);
router.delete("/cart/delete-after-payment", protect, authorize('delete', 'cart'), deleteCartAfterPayment);

export default router;
