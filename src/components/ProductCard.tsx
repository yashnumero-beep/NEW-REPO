import { ShoppingCart, Star, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../types/product"; // Import the Product type

interface ProductCardProps {
  product: Product; // Use the Product type as a prop
}

export function ProductCard({ product }: ProductCardProps) {
  const { 
    id, name, price, ecoRating, imageBase64, ecoLabel, ecoBadgeColor, category 
  } = product;

  // Construct the image URL from base64 data
  const imageUrl = imageBase64 
    ? `data:image/jpeg;base64,${imageBase64}` 
    : ""; // Fallback will be handled by ImageWithFallback

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
      <Link to={`/product/${id}`} className="block relative overflow-hidden aspect-square">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Use backend-driven ecoLabel and ecoBadgeColor */}
        <Badge 
          className="absolute top-3 left-3 text-white" 
          style={{ backgroundColor: ecoBadgeColor || '#2E8B57' }} // Fallback color
        >
          <Leaf className="w-3 h-3 mr-1" />
          {ecoLabel || 'Eco-Friendly'} {/* Fallback text */}
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
                i < Math.floor(ecoRating) // Use numeric ecoRating for stars
                  ? "fill-[#FFD700] text-[#FFD700]"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-muted-foreground">({ecoRating.toFixed(1)})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-medium text-[#2E8B57]">${price.toFixed(2)}</span>
          <Button
            size="sm"
            className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl"
            onClick={(e) => {
              e.preventDefault(); // Prevent link navigation
              // Add to cart logic would go here
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