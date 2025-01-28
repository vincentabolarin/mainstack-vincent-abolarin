import mongoose, { Schema, Document, Types } from "mongoose";

// Regular expression for validating email format
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [emailRegex, "Invalid email format"],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.path('email').validate(async function(value) {
  const existingUser = await mongoose.models.User.findOne({ email: value });
  if (existingUser) {
    throw new Error('Email already exists');
  }
}, 'Email already exists');


export default mongoose.model<IUser>("User", UserSchema);
