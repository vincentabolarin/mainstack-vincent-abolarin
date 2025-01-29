import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { createProductController, getAllProductsController, getProductByIdController } from "../controllers/product.js";

const router = express.Router();

// Create a product
router.post("/", authenticate, createProductController);

// Get all products
router.get("/", authenticate, getAllProductsController);

// Get a product by ID
router.get('/:id', authenticate, getProductByIdController);

export default router;