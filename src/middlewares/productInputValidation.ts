import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Joi from "joi";
import { ErrorResponse } from "../utils/response.js";

// Joi schema
const productCreationOrUpdateSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().strict().required(),
  category: Joi.string().required(),
});

// Middleware to sanitize inputs
const sanitizeProduct = [
  body("name").trim().escape(),
  body("description").trim().escape(),
  body("category").trim().escape(),
  body("price")
    .toFloat()
    .customSanitizer((value) => parseFloat(value.toFixed(2)))
];

// Middleware to validate inputs after sanitization
const validateWithJoi = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(new ErrorResponse(errors.array()[0].msg));
      return;
    }

    // Validate sanitized input with Joi
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json(new ErrorResponse(error.details[0].message));
      return; 
    }

    next();
  };
};

// Combined middlewares for product creation/update
const validateProductCreationOrUpdate = [
  ...sanitizeProduct,
  validateWithJoi(productCreationOrUpdateSchema),
];

export { validateProductCreationOrUpdate };
