import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Joi from "joi";
import { ErrorResponse } from "../utils/response.js";

// Joi schemas
const registrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Middleware to sanitize inputs
const sanitizeRegistration = [
  body("firstName").trim().escape(),
  body("lastName").trim().escape(),
  body("email").trim().normalizeEmail(),
  body("password").trim(),
];

const sanitizeLogin = [
  body("email").trim().normalizeEmail(),
  body("password").trim(),
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

// Combined middlewares
const validateRegistration = [
  ...sanitizeRegistration,
  validateWithJoi(registrationSchema),
];

const validateLogin = [...sanitizeLogin, validateWithJoi(loginSchema)];

export { validateRegistration, validateLogin };
