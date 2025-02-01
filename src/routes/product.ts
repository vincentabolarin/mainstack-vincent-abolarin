import express from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.js";
import { validateProductCreationOrUpdate } from "../middlewares/productInputValidation.js";

const router = express.Router();

// Create a product
router.post("/", authenticate, validateProductCreationOrUpdate, createProductController);

// Get all products
router.get("/", authenticate, getAllProductsController);

// Get a product by ID
router.get('/:id', authenticate, getProductByIdController);

// Update a product
router.put('/:id', authenticate, validateProductCreationOrUpdate, updateProductController);

// Delete a product
router.delete('/:id', authenticate, deleteProductController);

export default router;