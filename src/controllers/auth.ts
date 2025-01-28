import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerUserService } from "../services/auth.js";

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

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export {
  registerController,
  loginController
}
