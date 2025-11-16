import { Product, ProductFilter } from "../types/product";

const API_URL =
  `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/products`;

/**
 * Type guard to check for a fetch error response.
 */
interface ErrorResponse {
  message: string;
  [key: string]: any;
}
function isErrorResponse(res: any): res is ErrorResponse {
  return typeof res === 'object' && res !== null && 'message' in res;
}

/**
 * Fetches all active products from the backend.
 * @returns A promise that resolves to an array of products.
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

/**
 * Fetches a single product by its ID.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to the product.
 */
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches eco-friendly alternatives for a given product.
 * @param id The ID of the product.
 * @returns A promise that resolves to an array of alternative products.
 */
export const getEcoAlternatives = async (id: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/${id}/alternatives`);
     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching alternatives for product ${id}:`, error);
    throw error;
  }
}

/**
 * Searches for products by a keyword.
 * @param keyword The search term.
 * @returns A promise that resolves to an array of matching products.
 */
export const searchProducts = async (keyword: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`);
     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error searching products with keyword ${keyword}:`, error);
    throw error;
  }
}

/**
 * Filters products based on multiple criteria.
 * @param filter The filter object.
 * @returns A promise that resolves to an array of matching products.
 */
export const filterProducts = async (filter: ProductFilter): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filter)
    });
     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }
}

/**
 * Creates a new product.
 * Handles multipart/form-data upload as required by the backend.
 * @param productData The product data (excluding ID).
 * @param file The optional image file.
 * @returns A promise that resolves to the newly created product.
 */
export const createProduct = async (
  productData: {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;

    subCategory?: string;
    brand?: string;
    weightKg?: number;
    dimensions?: string;
    manufacturingLocation?: string;

    carbonImpact?: number;
    ecoCertified?: boolean;
    ecoCertificationDetails?: string;
    recyclable?: boolean;
    biodegradable?: boolean;
    renewableEnergyUsed?: boolean;
    shippingCarbonOffset?: boolean;

    sellerId: number;
    sellerName: string;

    // IMPORTANT: These two must be optional
    active?: boolean;
    verified?: boolean;
  },
  file?: File
): Promise<Product> => {

  try {
    const formData = new FormData();
    
    // 1. Append the product data as a JSON blob
    formData.append('product', new Blob([JSON.stringify(productData)], {
      type: "application/json"
    }));

    // 2. Append the file if it exists
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      // Do not set Content-Type header; browser will set it with boundary
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (isErrorResponse(errorData)) {
         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/**
 * Updates an existing product.
 * Handles multipart/form-data upload for partial updates.
 * @param id The ID of the product to update.
 * @param productData The partial product data to update.
 * @param file The optional new image file.
 * @returns A promise that resolves to the updated product.
 */
export const updateProduct = async (id: number | string, productData: Partial<Product>, file?: File): Promise<Product> => {
  try {
    const formData = new FormData();

    // 1. Append the partial product data as a JSON blob
    formData.append('product', new Blob([JSON.stringify(productData)], {
      type: "application/json"
    }));

    // 2. Append the file if it exists
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
       if (isErrorResponse(errorData)) {
         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a product by its ID (soft delete).
 * @param id The ID of the product to delete.
 * @returns A promise that resolves when the deletion is successful.
 */
export const deleteProduct = async (id: number | string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};