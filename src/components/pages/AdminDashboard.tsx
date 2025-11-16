// import { StatCard } from "../StatCard";
// import {
//   DollarSign,
//   Users,
//   ShoppingBag,
//   TrendingUp,
//   Package,
//   Calendar,
//   BarChart3,
//   Settings,
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const salesData = [
//   { month: "Jan", sales: 4500, users: 240 },
//   { month: "Feb", sales: 5200, users: 320 },
//   { month: "Mar", sales: 6100, users: 380 },
//   { month: "Apr", sales: 5800, users: 420 },
//   { month: "May", sales: 7200, users: 510 },
//   { month: "Jun", sales: 8500, users: 620 },
// ];

// const topProducts = [
//   { name: "Bamboo Toothbrush", sales: 1250, revenue: 16237.5 },
//   { name: "Reusable Water Bottle", sales: 980, revenue: 24475.2 },
//   { name: "Organic Cotton Bag", sales: 876, revenue: 16632.24 },
//   { name: "Eco Cleaning Kit", sales: 654, revenue: 19603.46 },
//   { name: "Sustainable Cutlery", sales: 543, revenue: 8682.57 },
// ];

// const recentOrders = [
//   {
//     id: "#ECO-1234",
//     customer: "Emma Green",
//     product: "Bamboo Toothbrush Set",
//     amount: 12.99,
//     status: "Delivered",
//   },
//   {
//     id: "#ECO-1235",
//     customer: "John Doe",
//     product: "Reusable Water Bottle",
//     amount: 24.99,
//     status: "Shipped",
//   },
//   {
//     id: "#ECO-1236",
//     customer: "Sarah Climate",
//     product: "Organic Cotton Bag",
//     amount: 18.99,
//     status: "Processing",
//   },
//   {
//     id: "#ECO-1237",
//     customer: "Mike Sustain",
//     product: "Eco Cleaning Kit",
//     amount: 29.99,
//     status: "Delivered",
//   },
// ];

// export function AdminDashboard() {
//   return (
//     <div className="min-h-screen bg-[#f5f5dc]/30">
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="hidden lg:block w-64 bg-white border-r border-border min-h-screen sticky top-16">
//           <div className="p-6">
//             <h3 className="text-foreground mb-4">Admin Panel</h3>
//             <nav className="space-y-2">
//               {[
//                 { icon: BarChart3, label: "Dashboard", active: true },
//                 { icon: Users, label: "Users" },
//                 { icon: Package, label: "Products" },
//                 { icon: ShoppingBag, label: "Orders" },
//                 { icon: Calendar, label: "Events" },
//                 { icon: TrendingUp, label: "Analytics" },
//                 { icon: Settings, label: "Settings" },
//               ].map((item) => (
//                 <button
//                   key={item.label}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
//                     item.active
//                       ? "bg-[#2E8B57] text-white"
//                       : "text-muted-foreground hover:bg-[#f5f5dc]"
//                   }`}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   <span>{item.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="mb-8">
//               <h1 className="text-foreground mb-2">Dashboard Overview</h1>
//               <p className="text-muted-foreground">Welcome back! Here's what's happening with EcoBazaarX today.</p>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <StatCard
//                 title="Total Revenue"
//                 value="$85,420"
//                 icon={DollarSign}
//                 trend="+12.5%"
//                 trendUp={true}
//               />
//               <StatCard
//                 title="Active Users"
//                 value="50,234"
//                 icon={Users}
//                 trend="+8.2%"
//                 trendUp={true}
//               />
//               <StatCard
//                 title="Total Orders"
//                 value="4,302"
//                 icon={ShoppingBag}
//                 trend="+23.1%"
//                 trendUp={true}
//               />
//               <StatCard
//                 title="Products Sold"
//                 value="12,567"
//                 icon={Package}
//                 trend="+15.3%"
//                 trendUp={true}
//               />
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
//                 <h3 className="text-foreground mb-4">Sales Overview</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={salesData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                     <XAxis dataKey="month" stroke="#666666" />
//                     <YAxis stroke="#666666" />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="sales"
//                       stroke="#2E8B57"
//                       strokeWidth={2}
//                       dot={{ fill: "#2E8B57" }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
//                 <h3 className="text-foreground mb-4">User Growth</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={salesData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                     <XAxis dataKey="month" stroke="#666666" />
//                     <YAxis stroke="#666666" />
//                     <Tooltip />
//                     <Bar dataKey="users" fill="#2E8B57" radius={[8, 8, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Tables */}
//             <Tabs defaultValue="products" className="mb-8">
//               <TabsList className="mb-6">
//                 <TabsTrigger value="products">Top Products</TabsTrigger>
//                 <TabsTrigger value="orders">Recent Orders</TabsTrigger>
//               </TabsList>

//               <TabsContent value="products">
//                 <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-[#f5f5dc] border-b border-border">
//                         <tr>
//                           <th className="px-6 py-4 text-left text-foreground">Product Name</th>
//                           <th className="px-6 py-4 text-left text-foreground">Sales</th>
//                           <th className="px-6 py-4 text-left text-foreground">Revenue</th>
//                           <th className="px-6 py-4 text-left text-foreground">Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {topProducts.map((product, index) => (
//                           <tr key={index} className="border-b border-border hover:bg-[#f5f5dc]/30 transition-colors">
//                             <td className="px-6 py-4 text-foreground">{product.name}</td>
//                             <td className="px-6 py-4 text-muted-foreground">{product.sales}</td>
//                             <td className="px-6 py-4 text-[#2E8B57]">
//                               ${product.revenue.toFixed(2)}
//                             </td>
//                             <td className="px-6 py-4">
//                               <span className="px-3 py-1 bg-[#2E8B57]/10 text-[#2E8B57] rounded-full">
//                                 In Stock
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="orders">
//                 <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-[#f5f5dc] border-b border-border">
//                         <tr>
//                           <th className="px-6 py-4 text-left text-foreground">Order ID</th>
//                           <th className="px-6 py-4 text-left text-foreground">Customer</th>
//                           <th className="px-6 py-4 text-left text-foreground">Product</th>
//                           <th className="px-6 py-4 text-left text-foreground">Amount</th>
//                           <th className="px-6 py-4 text-left text-foreground">Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {recentOrders.map((order, index) => (
//                           <tr key={index} className="border-b border-border hover:bg-[#f5f5dc]/30 transition-colors">
//                             <td className="px-6 py-4 text-foreground">{order.id}</td>
//                             <td className="px-6 py-4 text-muted-foreground">{order.customer}</td>
//                             <td className="px-6 py-4 text-muted-foreground">{order.product}</td>
//                             <td className="px-6 py-4 text-[#2E8B57]">${order.amount}</td>
//                             <td className="px-6 py-4">
//                               <span
//                                 className={`px-3 py-1 rounded-full ${
//                                   order.status === "Delivered"
//                                     ? "bg-[#2E8B57]/10 text-[#2E8B57]"
//                                     : order.status === "Shipped"
//                                     ? "bg-blue-100 text-blue-600"
//                                     : "bg-yellow-100 text-yellow-600"
//                                 }`}
//                               >
//                                 {order.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
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
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const salesData = [
  { month: "Jan", sales: 4500, users: 240 },
  { month: "Feb", sales: 5200, users: 320 },
  { month: "Mar", sales: 6100, users: 380 },
  { month: "Apr", sales: 5800, users: 420 },
  { month: "May", sales: 7200, users: 510 },
  { month: "Jun", sales: 8500, users: 620 },
];

const topProducts = [
  { name: "Bamboo Toothbrush", sales: 1250, revenue: 16237.5 },
  { name: "Reusable Water Bottle", sales: 980, revenue: 24475.2 },
  { name: "Organic Cotton Bag", sales: 876, revenue: 16632.24 },
  { name: "Eco Cleaning Kit", sales: 654, revenue: 19603.46 },
  { name: "Sustainable Cutlery", sales: 543, revenue: 8682.57 },
];

const recentOrders = [
  {
    id: "#ECO-1234",
    customer: "Emma Green",
    product: "Bamboo Toothbrush Set",
    amount: 12.99,
    status: "Delivered",
  },
  {
    id: "#ECO-1235",
    customer: "John Doe",
    product: "Reusable Water Bottle",
    amount: 24.99,
    status: "Shipped",
  },
  {
    id: "#ECO-1236",
    customer: "Sarah Climate",
    product: "Organic Cotton Bag",
    amount: 18.99,
    status: "Processing",
  },
  {
    id: "#ECO-1237",
    customer: "Mike Sustain",
    product: "Eco Cleaning Kit",
    amount: 29.99,
    status: "Delivered",
  },
];

// Login Component
function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(username, password)) {
      setError("");
    } else {
      setError("Invalid credentials");
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
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
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
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
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
          
          <button
            type="submit"
            className="w-full bg-[#2E8B57] text-white py-3 rounded-xl hover:bg-[#267349] transition-colors font-medium"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Demo credentials: admin / admin123</p>
        </div>
      </div>
    </div>
  );
}

// Add Product Component
function AddProductForm({ onAddProduct }: { onAddProduct: (product: any) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      stock: parseInt(formData.stock),
      id: Date.now().toString(),
    };
    onAddProduct(newProduct);
    setFormData({ name: "", price: "", category: "", description: "", stock: "" });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#2E8B57] text-white px-6 py-3 rounded-xl hover:bg-[#267349] transition-colors"
      >
        Add Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-foreground mb-4 text-lg font-semibold">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#2E8B57] text-white py-2 rounded-lg hover:bg-[#267349] transition-colors"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState(topProducts);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem("adminAuthenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, password: string): boolean => {
    // Simple authentication - in real app, this would be an API call
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

  const handleAddProduct = (newProduct: any) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const navigationItems = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "users", icon: Users, label: "Users" },
    { id: "products", icon: Package, label: "Products" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "analytics", icon: TrendingUp, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Render different content based on active tab
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
              <StatCard
                title="Total Revenue"
                value="$85,420"
                icon={DollarSign}
                trend="+12.5%"
                trendUp={true}
              />
              <StatCard
                title="Active Users"
                value="50,234"
                icon={Users}
                trend="+8.2%"
                trendUp={true}
              />
              <StatCard
                title="Total Orders"
                value="4,302"
                icon={ShoppingBag}
                trend="+23.1%"
                trendUp={true}
              />
              <StatCard
                title="Products Sold"
                value="12,567"
                icon={Package}
                trend="+15.3%"
                trendUp={true}
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
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#2E8B57"
                      strokeWidth={2}
                      dot={{ fill: "#2E8B57" }}
                    />
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

            {/* Tables */}
            <Tabs defaultValue="products" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Top Products</TabsTrigger>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#f5f5dc] border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left text-foreground">Product Name</th>
                          <th className="px-6 py-4 text-left text-foreground">Sales</th>
                          <th className="px-6 py-4 text-left text-foreground">Revenue</th>
                          <th className="px-6 py-4 text-left text-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={index} className="border-b border-border hover:bg-[#f5f5dc]/30 transition-colors">
                            <td className="px-6 py-4 text-foreground">{product.name}</td>
                            <td className="px-6 py-4 text-muted-foreground">{product.sales}</td>
                            <td className="px-6 py-4 text-[#2E8B57]">
                              ${product.revenue.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-[#2E8B57]/10 text-[#2E8B57] rounded-full">
                                In Stock
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders">
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
                                className={`px-3 py-1 rounded-full ${
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
              </TabsContent>
            </Tabs>
          </>
        );

      case "products":
        return (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-foreground mb-2">Product Management</h1>
                <p className="text-muted-foreground">Manage your product catalog and inventory</p>
              </div>
              <AddProductForm onAddProduct={handleAddProduct} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f5f5dc] border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-foreground">Product Name</th>
                      <th className="px-6 py-4 text-left text-foreground">Category</th>
                      <th className="px-6 py-4 text-left text-foreground">Price</th>
                      <th className="px-6 py-4 text-left text-foreground">Stock</th>
                      <th className="px-6 py-4 text-left text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index} className="border-b border-border hover:bg-[#f5f5dc]/30 transition-colors">
                        <td className="px-6 py-4 text-foreground">{product.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">Eco Friendly</td>
                        <td className="px-6 py-4 text-[#2E8B57]">
                          ${(product.revenue / product.sales).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{product.sales}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-[#2E8B57]/10 text-[#2E8B57] rounded-full">
                            In Stock
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div>
            <h1 className="text-foreground mb-2">User Management</h1>
            <p className="text-muted-foreground mb-8">Manage your customers and their accounts</p>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <p className="text-muted-foreground">User management interface coming soon...</p>
            </div>
          </div>
        );

      case "orders":
        return (
          <div>
            <h1 className="text-foreground mb-2">Order Management</h1>
            <p className="text-muted-foreground mb-8">View and manage customer orders</p>
            {/* Orders table from dashboard can be moved here */}
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
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-foreground">Admin Panel</h3>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
            <nav className="space-y-2">
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}