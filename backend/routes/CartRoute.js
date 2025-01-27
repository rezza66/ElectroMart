import express from "express";
import { getCart, updateCart, createCart, deleteCart } from "../controllers/CartController.js";

const router = express.Router();

router.get("/cart/:userId", getCart);
router.post("/cart/add", createCart);
router.put("/cart/update/:cartItemId", updateCart);
router.delete("/cart/delete/:cartItemId", deleteCart);

export default router;
