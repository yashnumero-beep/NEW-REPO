/**
 * Represents the Product data structure returned from the backend API.
 * This matches the ProductResponseDTO.
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sellerId: number;
  sellerName: string;
  category: string;
  subCategory?: string;
  brand?: string;
  imageBase64: string | null; // Image is Base64 encoded string
  stockQuantity: number;
  weightKg?: number;
  dimensions?: string;
  manufacturingLocation?: string;
  
  // Carbon data
  carbonImpact: number;
  carbonCalculationMethod: string;
  carbonBreakdown: string; // This is a JSON string, e.g., "{\"manufacturing\": 5.2, \"shipping\": 1.3}"

  // Eco information
  ecoCertified: boolean;
  ecoCertificationDetails?: string;
  ecoRating: number; // The 0-5 numeric rating
  ecoLabel: string; // e.g., "GOOD", "EXCELLENT"
  ecoBadgeColor: string; // e.g., "#10b981"

  // Eco features (booleans)
  recyclable: boolean;
  biodegradable: boolean;
  renewableEnergyUsed: boolean;
  shippingCarbonOffset: boolean;

  // Status
  active: boolean;
  verified: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Represents the filter object sent to the backend.
 * This matches the ProductFilterDTO.
 */
export interface ProductFilter {
  category?: string | null;
  ecoCertified?: boolean | null;
  maxCarbonImpact?: number | null;
  minEcoRating?: number | null;
  recyclable?: boolean | null;
}