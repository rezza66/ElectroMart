import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { upload } from '../middleware/uploadProduct.js';
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";


const router = express.Router();

router.get("/products", getAllProducts);  
router.get("/product/:id", getProductById);  
router.post("/product", protect, authorize('create', 'product'), upload, createProduct);  
router.put("/product/:id", protect, authorize('update', 'product'), upload, updateProduct);  
router.delete("/product/:id", protect, authorize('delete', 'product'), deleteProduct);  

export default router;


