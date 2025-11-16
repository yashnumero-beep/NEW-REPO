import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Filter, X } from "lucide-react";
import { Button } from "../ui/button";

const allProducts = [
  {
    id: "1",
    name: "Bamboo Toothbrush Set",
    price: 12.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1605615016732-03add3ee505d?w=400",
    ecoRating: "A" as const,
    category: "Personal Care",
  },
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
  {
    id: "5",
    name: "Sustainable Bamboo Cutlery",
    price: 15.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1605615016732-03add3ee505d?w=400",
    ecoRating: "A" as const,
    category: "Kitchen",
  },
  {
    id: "6",
    name: "Reusable Food Wraps",
    price: 14.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1753370241639-e8596ccbfe0c?w=400",
    ecoRating: "B" as const,
    category: "Kitchen",
  },
  {
    id: "7",
    name: "Organic Soap Bar Set",
    price: 22.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1760992004120-19b7a726d2c6?w=400",
    ecoRating: "A" as const,
    category: "Personal Care",
  },
  {
    id: "8",
    name: "Eco Shopping Bag",
    price: 16.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1712842959473-9a7235e5810c?w=400",
    ecoRating: "A" as const,
    category: "Bags",
  },
];

const categories = ["Personal Care", "Lifestyle", "Bags", "Home", "Kitchen"];
const materials = ["Bamboo", "Organic Cotton", "Recycled Plastic", "Glass", "Stainless Steel"];
const ecoRatings = ["A", "B", "C"];
const regions = ["North America", "Europe", "Asia", "Australia"];

export function MarketplacePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  };

  const toggleRating = (rating: string) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border sticky top-24">
              <h3 className="text-foreground mb-4">Filters</h3>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="mb-3 block">Price Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={1}
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
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material Type */}
              <div className="mb-6">
                <Label className="mb-3 block">Material Type</Label>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center gap-2">
                      <Checkbox
                        id={`material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={() => toggleMaterial(material)}
                      />
                      <label
                        htmlFor={`material-${material}`}
                        className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eco Rating */}
              <div className="mb-6">
                <Label className="mb-3 block">Eco Rating</Label>
                <div className="space-y-2">
                  {ecoRatings.map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={() => toggleRating(rating)}
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      >
                        Rating {rating}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div>
                <Label className="mb-3 block">Region</Label>
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white rounded-xl"
              >
                Load More Products
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
