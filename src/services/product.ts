import Product from "../models/Product.js";
import { ServiceResponse } from "../types/ServiceResponse.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.js";

// Create a product
const createProductService = async (name: string, description: string, price: number, category: string): Promise<ServiceResponse<any>> => {
  try {
    const product = new Product({ name, description, price, category });
    await product.save();

    return new SuccessResponse("Product created successfully", product);
  } catch (error: any) {
    return new ErrorResponse("Error creating product", error.message);
  }
}

// Get all products
const getAllProductsService = async (page: number, limit: number): Promise<ServiceResponse<any>> => {
  try {
    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await Product.find().skip(skip).limit(limit);
    const productCount = await Product.countDocuments();
    const totalPages = Math.ceil(productCount / limit)

    const baseUrl = process.env.BASE_URL || "http://localhost:8000";

    
    const previousPage =
      page > 1 ? `${baseUrl}/products?page=${page - 1}&limit=${limit}` : null;
    
    const nextPage =
      page < totalPages
        ? `${baseUrl}/products?page=${page + 1}&limit=${limit}`
        : null;

    const data = {
      page,
      limit,
      totalPages,
      previous: previousPage,
      next: nextPage,
      productCount,
      products,
    };

    if (page > totalPages && productCount > 0) {
      return new ErrorResponse("Page exceeds the available data");
    }

    if (products.length === 0) {
      return new SuccessResponse("No product found", data);
    }

    return new SuccessResponse("Products fetched successfully", data);
  } catch (error: any) {
    return new ErrorResponse("Error fetching products", error.message);
  }
};

// Get a product by ID
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

// Update a product
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

// Delete a product
const deleteProductService = async (id: string): Promise<ServiceResponse<any>> => {
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return new ErrorResponse("Product not found");
    }

    return new SuccessResponse("Product deleted successfully");
  } catch (error: any) {
    return new ErrorResponse("Error deleting product", error.message);
  }
};

// Export all product services
export {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService
}