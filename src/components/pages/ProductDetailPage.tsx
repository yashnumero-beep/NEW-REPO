import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import { Star, ShoppingCart, Heart, Leaf, Package, RefreshCw, Shield, Loader2, PackageCheck, Zap, Droplet } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProductCard } from "../ProductCard";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import * as productService from "../../api/productService";
import { Product } from "../../types/product";

// Define type for parsed carbon breakdown
interface CarbonBreakdown {
  manufacturing?: number;
  shipping?: number;
  packaging?: number;
  total?: number;
}

export function ProductDetailPage() {
  // CRITICAL FIX: Alias the 'id' param to 'productId' to avoid scope conflict
  const { id: productId } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0); // Only one image, but keeping for structure

  useEffect(() => {
    if (!productId) {
      setError("No product ID provided.");
      setIsLoading(false);
      return;
    }

    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch main product and related products in parallel
        const [productData, alternativesData] = await Promise.all([
          productService.getProductById(productId),
          productService.getEcoAlternatives(productId)
        ]);
        
        setProduct(productData);
        setRelatedProducts(alternativesData);

      } catch (err) {
        console.error(err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId]); // Depend on the aliased productId

  // Helper to render eco features
  const renderEcoFeatures = () => {
    if (!product) return null;
    const features = [];
    if (product.recyclable) features.push({ icon: RefreshCw, text: "Recyclable" });
    if (product.biodegradable) features.push({ icon: Droplet, text: "Biodegradable" });
    if (product.renewableEnergyUsed) features.push({ icon: Zap, text: "Made with Renewable Energy" });
    if (product.shippingCarbonOffset) features.push({ icon: PackageCheck, text: "Carbon Offset Shipping" });
    if (product.ecoCertified) features.push({ icon: Shield, text: `Eco-Certified: ${product.ecoCertificationDetails || 'Yes'}` });

    if (features.length === 0) {
      return <p className="text-muted-foreground">No specific eco-features listed.</p>;
    }

    return (
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-muted-foreground">
            <feature.icon className="w-5 h-5 text-[#2E8B57]" />
            {feature.text}
          </li>
        ))}
      </ul>
    );
  };

  // Helper to render carbon breakdown
  const renderCarbonBreakdown = () => {
    if (!product || !product.carbonBreakdown) return null;
    try {
      const breakdown: CarbonBreakdown = JSON.parse(product.carbonBreakdown);
      return (
        <div className="grid grid-cols-3 gap-4">
          {breakdown.manufacturing && (
            <div className="text-center">
              <p className="text-muted-foreground">Manufacturing</p>
              <p className="text-[#2E8B57]">{breakdown.manufacturing.toFixed(2)} kg</p>
            </div>
          )}
          {breakdown.shipping && (
            <div className="text-center">
              <p className="text-muted-foreground">Shipping</p>
              <p className="text-[#2E8B57]">{breakdown.shipping.toFixed(2)} kg</p>
            </div>
          )}
          {breakdown.packaging && (
             <div className="text-center">
              <p className="text-muted-foreground">Packaging</p>
              <p className="text-[#2E8B57]">{breakdown.packaging.toFixed(2)} kg</p>
            </div>
          )}
        </div>
      );
    } catch (e) {
      console.error("Failed to parse carbon breakdown:", e);
      return (
        <p className="text-muted-foreground">
          Total Impact: {product.carbonImpact.toFixed(2)} kg CO₂e
        </p>
      );
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5dc]/30 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-[#2E8B57]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f5f5dc]/30 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-border text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-muted-foreground">{error || "Product not found."}</p>
          <Link to="/marketplace">
            <Button className="mt-6 bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = product.imageBase64
    ? `data:image/jpeg;base64,${product.imageBase64}`
    : ""; // Fallback will be handled by ImageWithFallback

  // Mock images for gallery (since backend only provides one)
  const productImages = [
    imageUrl,
    "https://images.unsplash.com/photo-1760992004120-19b7a726d2c6?w=800",
    "https://images.unsplash.com/photo-1753370241639-e8596ccbfe0c?w=800",
    "https://images.unsplash.com/photo-1605615016732-03add3ee505d?w=800"
  ].filter(img => !!img); // Filter out empty string if no base64 image

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
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
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
                <Badge 
                  className="text-white"
                  style={{ backgroundColor: product.ecoBadgeColor || '#2E8B57' }}
                >
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco Rating: {product.ecoLabel}
                </Badge>
                {product.ecoCertified && <Badge variant="secondary">Certified</Badge>}
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.ecoRating)
                          ? "fill-[#FFD700] text-[#FFD700]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.ecoRating.toFixed(1)} Eco Rating
                </span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-[#2E8B57]">${product.price.toFixed(2)}</span>
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Eco Impact */}
              <div className="bg-[#f5f5dc] rounded-xl p-4 mb-6">
                <h4 className="text-foreground mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-[#2E8B57]" />
                  Carbon Footprint: {product.carbonImpact.toFixed(2)} kg CO₂e
                </h4>
                {renderCarbonBreakdown()}
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-[#f5f5dc] transition-colors rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-[#f5f5dc] transition-colors rounded-r-xl"
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

              {/* Static Features */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Package className="w-6 h-6 text-[#2E8B57]" />
                  <span className="text-muted-foreground text-sm">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-6 h-6 text-[#2E8B57]" />
                  <span className="text-muted-foreground text-sm">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield className="w-6 h-6 text-[#2E8B57]" />
                  <span className="text-muted-foreground text-sm">Eco-Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-border p-8">
            <Tabs defaultValue="eco-features" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="eco-features">Eco-Features</TabsTrigger>
                <TabsTrigger value="description">Full Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="eco-features">
                {renderEcoFeatures()}
              </TabsContent>
              <TabsContent value="description">
                <p className="text-muted-foreground">{product.description}</p>
                {/* Additional details from product object */}
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  {product.brand && <li><strong>Brand:</strong> {product.brand}</li>}
                  {product.weightKg && <li><strong>Weight:</strong> {product.weightKg} kg</li>}
                  {product.dimensions && <li><strong>Dimensions:</strong> {product.dimensions}</li>}
                  {product.manufacturingLocation && <li><strong>Made in:</strong> {product.manufacturingLocation}</li>}
                </ul>
              </TabsContent>
              <TabsContent value="reviews">
                <p className="text-muted-foreground">Customer reviews coming soon...</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-foreground mb-6">Eco-Friendly Alternatives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}