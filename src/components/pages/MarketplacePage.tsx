import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Filter, X, Search, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as productService from "../../api/productService";
import { Product, ProductFilter } from "../../types/product";

// Categories available in the backend
const categories = [
  "Electronics", "Clothing", "Food", "Books", "Toys", 
  "Furniture", "Beauty", "Sports", "Home & Garden", "Automotive"
];

export function MarketplacePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 100]); // Note: Backend does not support price filter yet. This is UI-only for now.
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxCarbon, setMaxCarbon] = useState("");
  const [minRating, setMinRating] = useState("");
  const [isEcoCertified, setIsEcoCertified] = useState(false);
  const [isRecyclable, setIsRecyclable] = useState(false);
  const [sortBy, setSortBy] = useState("popular"); // Note: Backend does not support sorting yet.

  // Fetch all products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle applying all filters
  const handleApplyFilters = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Handle search query separately
      if (searchQuery.trim()) {
        const data = await productService.searchProducts(searchQuery.trim());
        setProducts(data);
        return; // Exit after search
      }

      // Handle advanced filters
      const filter: ProductFilter = {
        category: selectedCategory || null,
        ecoCertified: isEcoCertified || null,
        maxCarbonImpact: maxCarbon ? parseFloat(maxCarbon) : null,
        minEcoRating: minRating ? parseFloat(minRating) : null,
        recyclable: isRecyclable || null,
      };

      // Check if any filter is active
      const isFilterActive = Object.values(filter).some(val => val !== null && val !== false);

      if (isFilterActive) {
        const data = await productService.filterProducts(filter);
        setProducts(data);
      } else {
        // If no filters are active (and no search), fetch all products
        const data = await productService.getAllProducts();
        setProducts(data);
      }

    } catch (err) {
      setError("Failed to apply filters. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
      if (showFilters) setShowFilters(false); // Close mobile filter pane
    }
  };

  // Reset all filters and fetch all products
  const handleResetFilters = async () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMaxCarbon("");
    setMinRating("");
    setIsEcoCertified(false);
    setIsRecyclable(false);
    
    // Refetch all products
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center col-span-1 sm:col-span-2 lg:col-span-3 min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-[#2E8B57]" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-red-600 bg-red-50 border border-red-200 rounded-2xl p-8">
          <h3 className="text-lg font-semibold mb-2">An Error Occurred</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-muted-foreground bg-white rounded-2xl p-12 shadow-sm border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">No Products Found</h3>
          <p>Try adjusting your filters or resetting them to see all products.</p>
        </div>
      );
    }

    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };


  return (
    <div className="min-h-screen bg-[#f5f5dc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Eco Marketplace</h1>
          <p className="text-muted-foreground">Discover sustainable products from verified eco-friendly brands</p>
        </div>

        {/* Filters & Sort Bar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {showFilters && <X className="w-4 h-4 ml-2" />}
          </Button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs hidden sm:block">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
              className="pl-10 rounded-xl"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-muted-foreground hidden sm:block">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded-xl border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Mobile Search */}
         <div className="relative flex-1 w-full mb-6 sm:hidden">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
              className="pl-10 rounded-xl"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-72 flex-shrink-0`}
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-foreground">Filters</h3>
                <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-[#2E8B57]">Reset</Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="mb-3 block">Price Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500} // Increased max price
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <Label className="mb-3 block">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Max Carbon */}
              <div className="mb-6">
                <Label htmlFor="maxCarbon" className="mb-3 block">Max Carbon (kg CO₂e)</Label>
                <Input
                  id="maxCarbon"
                  type="number"
                  placeholder="e.g., 10"
                  value={maxCarbon}
                  onChange={(e) => setMaxCarbon(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* Min Eco Rating */}
              <div className="mb-6">
                <Label htmlFor="minRating" className="mb-3 block">Min Eco Rating (0-5)</Label>
                <Input
                  id="minRating"
                  type="number"
                  placeholder="e.g., 3.5"
                  step="0.1"
                  min="0"
                  max="5"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* Eco Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="ecoCertifiedFilter"
                    checked={isEcoCertified}
                    onCheckedChange={(checked) => setIsEcoCertified(checked as boolean)}
                  />
                  <label
                    htmlFor="ecoCertifiedFilter"
                    className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    Eco-Certified
                  </label>
                </div>
                 <div className="flex items-center gap-2">
                  <Checkbox
                    id="recyclableFilter"
                    checked={isRecyclable}
                    onCheckedChange={(checked) => setIsRecyclable(checked as boolean)}
                  />
                  <label
                    htmlFor="recyclableFilter"
                    className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    Recyclable
                  </label>
                </div>
              </div>

              {/* Apply Button */}
              <Button
                className="w-full mt-6 bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl"
                onClick={handleApplyFilters}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Filter className="w-4 h-4 mr-2" />}
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderContent()}
            </div>

            {/* Load More (Pagination placeholder) */}
            {!isLoading && products.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white rounded-xl"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}