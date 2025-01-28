import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { createProductController } from "../controllers/product.js";

const router = express.Router();

// Create a product
router.post("/", authenticate, createProductController);

export default router;