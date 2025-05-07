import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";
import { upload } from "../configs/multer.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/category", protect, authorize('create', 'category'), upload, createCategory);
router.get("/categories", getCategories);
router.put("/category/:id", protect, upload, authorize('update', 'category'), updateCategory);
router.delete("/category/:id", protect, authorize('delete', 'category'), deleteCategory);

export default router;
