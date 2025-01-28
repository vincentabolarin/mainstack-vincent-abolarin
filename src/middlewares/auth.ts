import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/response.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check token presence and validity
  if (!authHeader) {
    res.status(401).json(new ErrorResponse("No token found"));
    return;
  }

  if (!authHeader.startsWith("Bearer ")) {
    res.status(401).json(new ErrorResponse("Invalid token"));
    return;
  }

  const token = authHeader.split(" ")[1];
  
  if (!token) {
    res.status(401).json(new ErrorResponse("No token found"));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json(new ErrorResponse("Invalid token"));
  }
};
