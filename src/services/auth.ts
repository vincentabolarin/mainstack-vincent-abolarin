import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { ServiceResponse } from "../types/ServiceResponse.js";
import { RegisterUserData } from "../types/Auth.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.js";

const registerUserService = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<ServiceResponse<RegisterUserData>> => {
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

    const data = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updateAt: user.updatedAt
    };

    return new SuccessResponse("User registered successfully", data)
  } catch (error: any) {
    return new ErrorResponse("Error registering user", error.message);
  }
};

export { registerUserService };