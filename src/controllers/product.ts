import { Request, Response } from "express";

import { createProductService, getAllProductsService, getProductByIdService, updateProductService } from "../services/product.js";

const createProductController = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;

  const result = await createProductService(name, description, price, category);

  if (!result.success) {
    res.status(500).json(result);
  } else {
    res.status(201).json(result);
  }
};

const getAllProductsController = async (req: Request, res: Response) => {
  const result = await getAllProductsService();

  if (!result.success) {
    res.status(500).json(result);
  } else {
    res.status(200).json(result);
  }
};

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

export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
};
