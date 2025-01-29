import Product from "../models/Product.js";
import { ServiceResponse } from "../types/ServiceResponse.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.js";

const createProductService = async (name: string, description: string, price: number, category: string): Promise<ServiceResponse<any>> => {
  try {
    const product = new Product({ name, description, price, category });
    await product.save();

    return new SuccessResponse("Product created successfully", product);
  } catch (error: any) {
    return new ErrorResponse("Error creating product", error.message);
  }
}

const getAllProductsService = async (): Promise<ServiceResponse<any>> => {
  try {
    const products = await Product.find();

    const data = {
      count: products.length,
      products,
    };

    if (products.length === 0) {
      return new SuccessResponse("No product found", data);
    }

    return new SuccessResponse("Products fetched successfully", data);
  } catch (error: any) {
    return new ErrorResponse("Error fetching products", error.message);
  }
};

const getProductByIdService = async (
  id: string
): Promise<ServiceResponse<any>> => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return new ErrorResponse("Product not found");
    }

    return new SuccessResponse("Product details fetched successfully", product);
  } catch (error: any) {
    return new ErrorResponse("Error fetching product details", error.message);
  }
};

const updateProductService = async (
  id: string,
  name: string,
  description: string,
  price: number,
  category: string
): Promise<ServiceResponse<any>> => {
  try {
    const product = await Product.findByIdAndUpdate(id, { name, description, price, category }, {
      new: true,
    });

    if (!product) {
      return new ErrorResponse("Product not found");
    }

    return new SuccessResponse("Product updated successfully", product);
  } catch (error: any) {
    return new ErrorResponse("Error updating product", error.message);
  }
};

export {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService
}