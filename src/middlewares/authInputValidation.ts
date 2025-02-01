import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ErrorResponse } from "../utils/response.js";

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

const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    res.status(400).json(new ErrorResponse(error.details[0].message));
    return;
  };
  next();
};

const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json(new ErrorResponse(error.details[0].message));
    return;
  };
  next();
};

export {
  validateRegistration,
  validateLogin
}