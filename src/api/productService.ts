import { Product, ProductFilter } from "../types/product";

// Get the API base URL from environment variables, with a fallback
const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080') + '/api/products';

/**
 * Type guard to check for a fetch error response.
 */
interface ErrorResponse {
  message: string;
  errors?: Record<string, string>; // For validation errors
  [key: string]: any;
}
function isErrorResponse(res: any): res is ErrorResponse {
  return typeof res === 'object' && res !== null && ('message' in res || 'errors' in res);
}

/**
 * Parses a JSON error response from the backend into a single string.
 */
async function getErrorString(response: Response): Promise<string> {
  try {
    const errorData = await response.json();
    if (isErrorResponse(errorData)) {
      if (errorData.errors) {
        // Handle validation errors
        return Object.values(errorData.errors).join(', ');
      }
      return errorData.message;
    }
  } catch (e) {
    // Not a JSON error, just return status text
  }
  return response.statusText;
}


/**
 * Fetches all active products from the backend.
 * @returns A promise that resolves to an array of products.
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Fetches a single product by its ID.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to the product.
 */
export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Fetches eco-friendly alternatives for a given product.
 * @param id The ID of the product.
 * @returns A promise that resolves to an array of alternative products.
 */
export const getEcoAlternatives = async (id: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/${id}/alternatives`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

/**
 * Searches for products by a keyword.
 * @param keyword The search term.
 * @returns A promise that resolves to an array of matching products.
 */
export const searchProducts = async (keyword: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

/**
 * Filters products based on multiple criteria.
 * @param filter The filter object.
 * @returns A promise that resolves to an array of matching products.
 */
export const filterProducts = async (filter: ProductFilter): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/filter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filter)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

/**
 * This DTO matches the backend's `ProductRequestDTO`.
 * We must send this in the JSON part.
 */
type ProductCreateApiDTO = {
  name: string;
  description: string;
  price: number;
  sellerId: number;
  sellerName: string;
  category: string;
  stockQuantity: number;
  brand?: string;
  weightKg?: number;
  carbonImpact?: number;
  manufacturingLocation?: string;
  ecoCertified: boolean;
  recyclable: boolean;
  biodegradable: boolean;
  renewableEnergyUsed: boolean;
  shippingCarbonOffset: boolean;
};

/**
 * Creates a new product.
 * Handles multipart/form-data upload as required by the backend.
 * @param productData The product data (matching ProductCreateApiDTO).
 * @param file The optional image file.
 * @returns A promise that resolves to the newly created product.
 */
export const createProduct = async (productData: ProductCreateApiDTO, file?: File): Promise<Product> => {
  const formData = new FormData();
  
  // 1. Append the product data as a JSON blob, as required by the @RequestPart("product")
  formData.append('product', new Blob([JSON.stringify(productData)], {
    type: "application/json"
  }));

  // 2. Append the file if it exists, as required by @RequestParam("file")
  if (file) {
    formData.append('file', file);
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type; the browser auto-sets it for multipart/form-data with the correct boundary
  });

  if (!response.ok) {
    const errorMsg = await getErrorString(response);
    throw new Error(errorMsg);
  }

  return response.json();
};

/**
 * This DTO matches the backend's `ProductUpdateDTO` (which is all-partial).
 */
type ProductUpdateApiDTO = Partial<Omit<ProductCreateApiDTO, 'sellerId' | 'sellerName'>>;

/**
 * Updates an existing product.
 * Handles multipart/form-data upload for partial updates.
 * @param id The ID of the product to update.
 * @param productData The partial product data to update (matching ProductUpdateApiDTO).
 * @param file The optional new image file.
 * @returns A promise that resolves to the updated product.
 */
export const updateProduct = async (id: number, productData: ProductUpdateApiDTO, file?: File): Promise<Product> => {
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
    const errorMsg = await getErrorString(response);
    throw new Error(errorMsg);
  }

  return response.json();
};

/**
 * Deletes a product by its ID (soft delete).
 * @param id The ID of the product to delete.
 * @returns A promise that resolves when the deletion is successful.
 */
export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorMsg = await getErrorString(response);
    throw new Error(errorMsg);
  }
};