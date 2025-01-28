import { Request, Response } from "express";

import { createProductService } from "../services/product.js";

const createProductController = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;

  const result = await createProductService(name, description, price, category);

  if (!result.success) {
    res.status(500).json(result);
  } else {
    res.status(201).json(result);
  }
};

export { createProductController };
