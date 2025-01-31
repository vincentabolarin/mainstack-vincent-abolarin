import { Request, Response } from "express";

import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.js";

// Create a product
const createProductController = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;

  const result = await createProductService(name, description, price, category);

  if (!result.success) {
    res.status(500).json(result);
  } else {
    res.status(201).json(result);
  }
};

// Get all products
const getAllProductsController = async (req: Request, res: Response) => {
  const result = await getAllProductsService();

  if (!result.success) {
    res.status(500).json(result);
  } else {
    res.status(200).json(result);
  }
};

// Get a product by ID
const getProductByIdController = async (req: Request, res: Response) => {
  const productId = req.params.id;

  const result = await getProductByIdService(productId);

  if (!result.success) {
    switch (result.message) {
      case "Product not found":
        res.status(404).json(result);
        break;

      default:
        res.status(500).json(result);
        break;
    }
  } else {
    res.status(200).json(result);
  }
}

// Update a product
const updateProductController = async (req: Request, res: Response) => {
  const productId = req.params.id;
  
  const { name, description, price, category } = req.body;

  const result = await updateProductService(productId, name, description, price, category);

  if (!result.success) {
    switch (result.message) {
      case "Product not found":
        res.status(404).json(result);
        break;

      default:
        res.status(500).json(result);
        break;
    }
  } else {
    res.status(200).json(result);
  }
}

// Delete a product
const deleteProductController = async (req: Request, res: Response) => {
  const productId = req.params.id;

  const result = await deleteProductService(productId);

  if (!result.success) {
    switch (result.message) {
      case "Product not found":
        res.status(404).json(result);
        break;

      default:
        res.status(500).json(result);
        break;
    }
  } else {
    res.status(201).json(result);
  }
}

// Export all product controllers
export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController
};
