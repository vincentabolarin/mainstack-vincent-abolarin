import mongoose, { Schema, Document } from "mongoose";

// Regular expression for validating email format
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [emailRegex, 'Please enter a valid email address'],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.path('email').validate(async function(value) {
  const existingUser = await mongoose.models.User.findOne({ email: value });
  if (existingUser) {
    throw new Error('Email already registered');
  }
}, 'Email is already taken');


export default mongoose.model<IUser>("User", UserSchema);
