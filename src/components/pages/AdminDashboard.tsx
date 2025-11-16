import { useState, useEffect } from "react";
import { StatCard } from "../StatCard";
import {
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  Package,
  Calendar,
  BarChart3,
  Settings,
  Loader2,
  Trash2,
  Edit,
  Plus,
  X
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Product } from "../../types/product";
import * as productService from "../../api/productService";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { ImageWithFallback } from "../figma/ImageWithFallback"; // Import ImageWithFallback

// --- Mock Data (can be replaced by API calls) ---
const salesData = [
  { month: "Jan", sales: 4500, users: 240 },
  { month: "Feb", sales: 5200, users: 320 },
  { month: "Mar", sales: 6100, users: 380 },
  { month: "Apr", sales: 5800, users: 420 },
  { month: "May", sales: 7200, users: 510 },
  { month: "Jun", sales: 8500, users: 620 },
];

const recentOrders = [
  { id: "#ECO-1234", customer: "Emma Green", product: "Bamboo Toothbrush Set", amount: 12.99, status: "Delivered" },
  { id: "#ECO-1235", customer: "John Doe", product: "Reusable Water Bottle", amount: 24.99, status: "Shipped" },
  { id: "#ECO-1236", customer: "Sarah Climate", product: "Organic Cotton Bag", amount: 18.99, status: "Processing" },
  { id: "#ECO-1237", customer: "Mike Sustain", product: "Eco Cleaning Kit", amount: 29.99, status: "Delivered" },
];

// --- Categories from Backend ---
const categories = [
  "Electronics", "Clothing", "Food", "Books", "Toys",
  "Furniture", "Beauty", "Sports", "Home & Garden", "Automotive"
];

// --- Form Data Type ---
type ProductFormData = {
  id?: number;
  name: string;
  description: string;
  price: string;
  stockQuantity: string;
  category: string; // FIX: Use string here, can be "" for placeholder
  brand: string;
  weightKg: string;
  carbonImpact: string;
  manufacturingLocation: string;
  ecoCertified: boolean;
  recyclable: boolean;
  biodegradable: boolean;
  renewableEnergyUsed: boolean;
  shippingCarbonOffset: boolean;
  imageBase64?: string | null; // For previewing existing image
};

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: "",
  stockQuantity: "0",
  category: "", // FIX: Default to empty string
  brand: "",
  weightKg: "",
  carbonImpact: "", // Will be auto-calculated if empty
  manufacturingLocation: "",
  ecoCertified: false,
  recyclable: false,
  biodegradable: false,
  renewableEnergyUsed: false,
  shippingCarbonOffset: false,
  imageBase64: null,
};

// --- Reusable Form Modal Component ---
function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData, file?: File) => Promise<void>; // Make async
  initialData: ProductFormData;
}) {
  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(initialData.imageBase64 || undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset form when initialData or isOpen changes
    setFormData(initialData);
    setPreview(initialData.imageBase64 || undefined);
    setSelectedFile(undefined);
    setError(null);
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create a blob URL for preview
      setPreview(URL.createObjectURL(file));
    } else {
      // If file is removed, clear preview
      setSelectedFile(undefined);
      setPreview(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      setError("Please select a category.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(formData, selectedFile);
      onClose(); // Close modal on success
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to save product. Please check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {formData.id ? "Edit Product" : "Add New Product"}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name */}
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          {/* Row 2: Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          {/* Row 3: Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input id="stockQuantity" name="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 4: Category & Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              {/* FIX: Bind value to `formData.category`. 
                If `formData.category` is "", the placeholder will show.
              */}
              <Select 
                name="category" 
                value={formData.category || undefined} // Pass undefined for empty string to show placeholder
                onValueChange={(val) => handleSelectChange('category', val)}
              >
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} />
            </div>
          </div>
          
          {/* Row 5: Weight & Carbon */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weightKg">Weight (kg)</Label>
              <Input id="weightKg" name="weightKg" type="number" step="0.001" value={formData.weightKg} onChange={handleChange} placeholder="e.g., 0.5" />
            </div>
            <div>
              <Label htmlFor="carbonImpact">Carbon Impact (kg CO₂e)</Label>
              <Input id="carbonImpact" name="carbonImpact" type="number" step="0.001" value={formData.carbonImpact} onChange={handleChange} placeholder="Auto-calculated if blank" />
            </div>
          </div>

          {/* Row 6: Location & Image */}
          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <Label htmlFor="manufacturingLocation">Manufacturing Location</Label>
              <Input id="manufacturingLocation" name="manufacturingLocation" value={formData.manufacturingLocation} onChange={handleChange} placeholder="e.g., India, China" />
            </div>
             <div>
              <Label htmlFor="file">Product Image</Label>
              <Input id="file" type="file" accept="image/*" onChange={handleFileChange} className="pt-1.5" />
            </div>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="w-24 h-24 rounded-lg border border-border p-1">
              <ImageWithFallback
                src={preview.startsWith('blob:') ? preview : `data:image/jpeg;base64,${preview}`} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-md" 
              />
            </div>
          )}
          
          {/* Row 7: Eco Features */}
          <div>
            <Label className="mb-2 block">Eco Features</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: 'ecoCertified', label: 'Eco-Certified' },
                { key: 'recyclable', label: 'Recyclable' },
                { key: 'biodegradable', label: 'Biodegradable' },
                { key: 'renewableEnergyUsed', label: 'Renewable Energy' },
                { key: 'shippingCarbonOffset', label: 'Shipping Offset' },
              ].map(item => (
                <div key={item.key} className="flex items-center gap-2">
                  <Checkbox 
                    id={item.key} 
                    name={item.key} 
                    checked={formData[item.key as keyof ProductFormData] as boolean} 
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, [item.key]: checked }))}
                  />
                  <Label htmlFor={item.key} className="font-normal text-muted-foreground">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : (formData.id ? 'Update Product' : 'Create Product')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- Login Component ---
function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(username, password)) {
      setError("");
    } else {
      setError("Invalid credentials. (Hint: admin / admin123)");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc]/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-border p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Enter your credentials to access the admin panel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              placeholder="Enter password"
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full bg-[#2E8B57] text-white py-3 rounded-xl hover:bg-[#267349] transition-colors font-medium"
          >
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Demo credentials: admin / admin123</p>
        </div>
      </div>
    </div>
  );
}


// --- Main Admin Dashboard Component ---
export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData>(emptyForm);

  // Check login status on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("adminAuthenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch products once on login for dashboard stats
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Re-fetch products ONLY when products tab is clicked
  useEffect(() => {
    if (isAuthenticated && activeTab === "products") {
      fetchProducts();
    }
  }, [isAuthenticated, activeTab]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (username: string, password: string): boolean => {
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    setActiveTab("dashboard");
  };

  const handleOpenAddModal = () => {
    setEditingProduct(emptyForm);
    setIsModalOpen(true);
  };
  
  const handleOpenEditModal = (product: Product) => {
    // Convert product to form data
    const formData: ProductFormData = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: String(product.price),
      stockQuantity: String(product.stockQuantity),
      category: product.category,
      brand: product.brand || "",
      weightKg: String(product.weightKg || ""),
      carbonImpact: String(product.carbonImpact || ""),
      manufacturingLocation: product.manufacturingLocation || "",
      ecoCertified: product.ecoCertified,
      recyclable: product.recyclable,
      biodegradable: product.biodegradable,
      renewableEnergyUsed: product.renewableEnergyUsed,
      shippingCarbonOffset: product.shippingCarbonOffset,
      imageBase64: product.imageBase64, // Pass base64 for preview
    };
    setEditingProduct(formData);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteProduct(id);
        // Optimistic UI update
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err: any) {
        alert(`Failed to delete product: ${err.message}`);
        console.error(err);
      }
    }
  };
  
  const handleFormSubmit = async (data: ProductFormData, file?: File) => {
    const commonData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stockQuantity: parseInt(data.stockQuantity),
      category: data.category, // This is now guaranteed to not be ""
      brand: data.brand || undefined,
      weightKg: data.weightKg ? parseFloat(data.weightKg) : undefined,
      carbonImpact: data.carbonImpact ? parseFloat(data.carbonImpact) : undefined,
      manufacturingLocation: data.manufacturingLocation || undefined,
      ecoCertified: data.ecoCertified,
      recyclable: data.recyclable,
      biodegradable: data.biodegradable,
      renewableEnergyUsed: data.renewableEnergyUsed,
      shippingCarbonOffset: data.shippingCarbonOffset,
    };

    if (data.id) {
      // Update Product
      await productService.updateProduct(data.id, commonData, file);
    } else {
      // Create Product
      const createData = {
        ...commonData,
        sellerId: 1, // Hardcoded sellerId as auth isn't implemented
        sellerName: "Admin Seller",
      };
      await productService.createProduct(createData, file);
    }
    
    fetchProducts(); // Refresh list
  };

  const navigationItems = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "products", icon: Package, label: "Products" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "users", icon: Users, label: "Users" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "analytics", icon: TrendingUp, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }
  
  const renderProductContent = () => {
    if (isLoading) {
      return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#2E8B57]" /></div>;
    }
    if (error) {
      return <div className="text-center text-red-600 p-8">{error}</div>
    }
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f5f5dc] border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-foreground">Product</th>
                <th className="px-6 py-4 text-left text-foreground">Category</th>
                <th className="px-6 py-4 text-left text-foreground">Price</th>
                <th className="px-6 py-4 text-left text-foreground">Stock</th>
                <th className="px-6 py-4 text-left text-foreground">Carbon (kg)</th>
                <th className="px-6 py-4 text-left text-foreground">Rating</th>
                <th className="px-6 py-4 text-left text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-[#f5f5dc]/30 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                  <td className="px-6 py-4 text-[#2E8B57]">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.stockQuantity}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.carbonImpact.toFixed(2)}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.ecoRating.toFixed(1)}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800" onClick={() => handleOpenEditModal(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="mb-8">
              <h1 className="text-foreground mb-2">Dashboard Overview</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with EcoBazaarX today.</p>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Revenue" value="$85,420" icon={DollarSign} trend="+12.5%" trendUp={true} />
              <StatCard title="Active Users" value="50,234" icon={Users} trend="+8.2%" trendUp={true} />
              <StatCard title="Total Orders" value="4,302" icon={ShoppingBag} trend="+23.1%" trendUp={true} />
              
              <StatCard 
                title="Products Listed" 
                value={products.length} 
                icon={Package} 
                trend={isLoading ? "Loading..." : `${products.length} items`} 
              />
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="text-foreground mb-4">Sales Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666666" />
                    <YAxis stroke="#666666" />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#2E8B57" strokeWidth={2} dot={{ fill: "#2E8B57" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="text-foreground mb-4">User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666666" />
                    <YAxis stroke="#666666" />
                    <Tooltip />
                    <Bar dataKey="users" fill="#2E8B57" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        );

      case "products":
        return (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-foreground mb-2">Product Management</h1>
                <p className="text-muted-foreground">Manage your product catalog ({products.length} items)</p>
              </div>
              <Button onClick={handleOpenAddModal} className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            {renderProductContent()}
          </div>
        );
      
      case "orders":
         return (
            <div>
              <h1 className="text-foreground mb-2">Order Management</h1>
              <p className="text-muted-foreground mb-8">View and manage customer orders</p>
               <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#f5f5dc] border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left text-foreground">Order ID</th>
                          <th className="px-6 py-4 text-left text-foreground">Customer</th>
                          <th className="px-6 py-4 text-left text-foreground">Product</th>
                          <th className="px-6 py-4 text-left text-foreground">Amount</th>
                          <th className="px-6 py-4 text-left text-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr key={index} className="border-b border-border hover:bg-[#f5f5dc]/30 transition-colors">
                            <td className="px-6 py-4 text-foreground">{order.id}</td>
                            <td className="px-6 py-4 text-muted-foreground">{order.customer}</td>
                            <td className="px-6 py-4 text-muted-foreground">{order.product}</td>
                            <td className="px-6 py-4 text-[#2E8B57]">${order.amount}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-[#2E8B57]/10 text-[#2E8B57]"
                                    : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-yellow-100 text-yellow-600"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
          );

      default:
        return (
          <div>
            <h1 className="text-foreground mb-2">{navigationItems.find(item => item.id === activeTab)?.label}</h1>
            <p className="text-muted-foreground mb-8">This section is under development</p>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <p className="text-muted-foreground">Content for {activeTab} will be available soon.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc]/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-border min-h-screen sticky top-0">
          <div className="p-6 flex flex-col h-screen">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-foreground">Admin Panel</h3>
            </div>
            <nav className="space-y-2 flex-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.id
                      ? "bg-[#2E8B57] text-white"
                      : "text-muted-foreground hover:bg-[#f5f5dc]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Product Form Modal (now a separate component) */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
      />
    </div>
  );
}