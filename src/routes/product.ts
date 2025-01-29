import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { createProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController } from "../controllers/product.js";

const router = express.Router();

// Create a product
router.post("/", authenticate, createProductController);

// Get all products
router.get("/", authenticate, getAllProductsController);

// Get a product by ID
router.get('/:id', authenticate, getProductByIdController);

// Update a product
router.put('/:id', authenticate, updateProductController);

// Delete a product
router.delete('/:id', authenticate, deleteProductController);

export default router;