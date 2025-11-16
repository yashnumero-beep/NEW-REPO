import React from "react";
import { ShoppingCart, Star, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../types/product"; // keep import for typing reference

// Accept partial so HomePage's mock objects don't need full backend Product shape
interface ProductCardProps {
  product: Partial<Product> | undefined | null;
}

export function ProductCard({ product }: ProductCardProps) {
  // Defensive: if there's no product, don't attempt to render
  if (!product) return null;

  // Use safe defaults for fields that may be missing in mocks
  const id = product.id ?? "";
  const name = product.name ?? "Unnamed product";
  const price = typeof product.price === "number" ? product.price : 0;
  // Ensure ecoRating is numeric; fallback to 0
  const ecoRatingNum = (() => {
    const r = product.ecoRating;
    if (typeof r === "number") return r;
    // if backend sends string (unlikely) try numeric coercion
    if (typeof (r as any) === "string") {
      const parsed = parseFloat(r as unknown as string);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  })();

  const ecoLabel = product.ecoLabel ?? "Eco-Friendly";
  const ecoBadgeColor = product.ecoBadgeColor ?? "#2E8B57";
  const category = product.category ?? "";
  const imageBase64 = product.imageBase64 ?? null;

  // Construct the image URL from base64 data, or let ImageWithFallback handle empty string
  const imageUrl = imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : "";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
      <Link to={`/product/${id}`} className="block relative overflow-hidden aspect-square">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <Badge
          className="absolute top-3 left-3 text-white"
          style={{ backgroundColor: ecoBadgeColor }}
        >
          <Leaf className="w-3 h-3 mr-1" />
          {ecoLabel}
        </Badge>

        {category && (
          <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90">
            {category}
          </Badge>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="mb-2 text-foreground group-hover:text-[#2E8B57] transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(ecoRatingNum)
                  ? "fill-[#FFD700] text-[#FFD700]"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-muted-foreground">({ecoRatingNum.toFixed(1)})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#2E8B57]">${price.toFixed(2)}</span>
          <Button
            size="sm"
            className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl"
            onClick={(e) => {
              e.preventDefault(); // Prevent link navigation
              console.log(`Added ${name} to cart`);
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;