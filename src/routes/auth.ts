import express from "express";
import { validateLogin, validateRegistration } from "../middlewares/authInputValidation.js";
import { loginController, registerController } from "../controllers/auth.js";

const router = express.Router();

// Register
router.post("/register", validateRegistration, registerController);

// Login
router.post("/login", validateLogin, loginController );

export default router;
