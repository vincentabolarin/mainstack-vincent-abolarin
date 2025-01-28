import Product from "../models/Product.js";
import { ServiceResponse } from "../types/ServiceResponse.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.js";

const createProductService = async (name: string, description: string, price: number, category: string): Promise<ServiceResponse<any>> => {
  try {
    const product = new Product({ name, description, price, category });
    await product.save();

    const data = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category
    }

    return new SuccessResponse("Product created successfully", data);
  } catch (error: any) {
    return new ErrorResponse("Error creating product", error.message);
  }
}

export {
  createProductService
}