import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ServiceResponse } from "../types/ServiceResponse.js";
import { LoginResponseData, UserData } from "../types/Auth.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.js";

const registerUserService = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<ServiceResponse<UserData>> => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Validate email format
  if (typeof email !== "string" || !emailRegex.test(email)) {
    return new ErrorResponse("Invalid email format");
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new ErrorResponse("Email already exists");
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    return new SuccessResponse("User registered successfully", user)
  } catch (error: any) {
    return new ErrorResponse("Error registering user", error.message);
  }
};

const loginService = async (email: string, password: string): Promise<ServiceResponse<LoginResponseData>> => {
  try {
      const user = await User.findOne({ email });
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!user || !isPasswordValid) {
        return new ErrorResponse("Invalid credentials");
      }
      
    const expiresIn = 60 * 60; // 1 hour
  
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn }
    );
    
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
    
    const data = {
      token,
      expiresAt,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    }
  
      return new SuccessResponse("Successfully logged in", data);
    } catch (error: any) {
      return new ErrorResponse("Error logging in", error.message);
    }
}

export { registerUserService, loginService };