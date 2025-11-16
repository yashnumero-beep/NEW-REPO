import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart, Heart, Leaf, Package, RefreshCw, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProductCard } from "../ProductCard";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const product = {
  id: "1",
  name: "Bamboo Toothbrush Set (4 Pack)",
  price: 12.99,
  rating: 4.8,
  reviews: 156,
  images: [
    "https://images.unsplash.com/photo-1605615016732-03add3ee505d?w=800",
    "https://images.unsplash.com/photo-1760992004120-19b7a726d2c6?w=800",
    "https://images.unsplash.com/photo-1753370241639-e8596ccbfe0c?w=800",
  ],
  ecoRating: "A",
  description:
    "Our bamboo toothbrushes are 100% biodegradable and made from sustainably sourced bamboo. The soft bristles are BPA-free and gentle on your gums. Each purchase plants a tree and reduces plastic waste.",
  features: [
    "100% biodegradable bamboo handle",
    "BPA-free soft bristles",
    "Ergonomic design for comfortable grip",
    "Sustainable and eco-friendly",
    "Comes in a recyclable paper box",
  ],
  ecoImpact: {
    co2Saved: "2.5 kg",
    plasticAvoided: "45 g",
    treesPlanted: 1,
  },
};

const relatedProducts = [
  {
    id: "2",
    name: "Reusable Water Bottle",
    price: 24.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1623684194967-48075185a58c?w=400",
    ecoRating: "A" as const,
    category: "Lifestyle",
  },
  {
    id: "3",
    name: "Organic Cotton Tote Bag",
    price: 18.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1712842959473-9a7235e5810c?w=400",
    ecoRating: "B" as const,
    category: "Bags",
  },
  {
    id: "4",
    name: "Eco-Friendly Cleaning Kit",
    price: 29.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1760992004120-19b7a726d2c6?w=400",
    ecoRating: "A" as const,
    category: "Home",
  },
];

export function ProductDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-[#f5f5dc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-[#f5f5dc]">
                <ImageWithFallback
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 ${
                      selectedImage === index ? "border-[#2E8B57]" : "border-border"
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-[#2E8B57] hover:bg-[#2E8B57]">
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco Rating {product.ecoRating}
                </Badge>
                <Badge variant="secondary">Best Seller</Badge>
              </div>

              <h1 className="text-foreground mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-[#FFD700] text-[#FFD700]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-[#2E8B57]">${product.price}</span>
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Eco Impact */}
              <div className="bg-[#f5f5dc] rounded-xl p-4 mb-6">
                <h4 className="text-foreground mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-[#2E8B57]" />
                  Environmental Impact
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-muted-foreground">CO₂ Saved</p>
                    <p className="text-[#2E8B57]">{product.ecoImpact.co2Saved}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Plastic Avoided</p>
                    <p className="text-[#2E8B57]">{product.ecoImpact.plasticAvoided}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Trees Planted</p>
                    <p className="text-[#2E8B57]">{product.ecoImpact.treesPlanted}</p>
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-[#f5f5dc] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-[#f5f5dc] transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button className="flex-1 bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white rounded-xl">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Package className="w-6 h-6 text-[#2E8B57]" />
                  <span className="text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-6 h-6 text-[#2E8B57]" />
                  <span className="text-muted-foreground">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield className="w-6 h-6 text-[#2E8B57]" />
                  <span className="text-muted-foreground">Eco-Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-border p-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              <TabsContent value="features">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-[#2E8B57] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews">
                <p className="text-muted-foreground">Customer reviews coming soon...</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-foreground mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
