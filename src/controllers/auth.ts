import { Request, Response } from "express";

import { loginService, registerUserService } from "../services/auth.js";

const registerController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const result = await registerUserService(firstName, lastName, email, password);

  if (!result.success) {
    switch (result.message) {
      case "Invalid email format":
        res.status(400).json(result);
        break;
      case "Email already exists":
        res.status(409).json(result);
      default:
        res.status(500).json(result);
        break;
    }
  } else {
    res.status(201).json(result);
  }
};

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  if (!result.success) {
    switch (result.message) {
      case "Invalid credentials":
        res.status(401).json(result);
      default:
        res.status(500).json(result);
        break;
    }
  } else {
    res.status(201).json(result);
  }
};

export {
  registerController,
  loginController
}
