import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Product>("Product", ProductSchema);
