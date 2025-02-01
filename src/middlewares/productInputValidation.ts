import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ErrorResponse } from "../utils/response.js";

const productCreationOrUpdateSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().strict().required(),
  category: Joi.string().required(),
});

const validateProductCreationOrUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = productCreationOrUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json(new ErrorResponse(error.details[0].message));
    return;
  }
  next();
};

export { validateProductCreationOrUpdate };
