/* -----------------------------------------------------------------------------
 * File: App.tsx
 * Purpose: Root of the React app. Wraps route and global providers.
 * Notes for backend devs: API calls live in src/api/*. Look for productService.ts
 * ---------------------------------------------------------------------------- */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/pages/HomePage";
import { MarketplacePage } from "./components/pages/MarketplacePage";
import { ProductDetailPage } from "./components/pages/ProductDetailPage";
import { CartPage } from "./components/pages/CartPage";
import { CommunityPage } from "./components/pages/CommunityPage";
import { EventsPage } from "./components/pages/EventsPage";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { AuthPage } from "./components/pages/AuthPage";
import { AboutPage } from "./components/pages/AboutPage";
import { StyleGuidePage } from "./components/pages/StyleGuidePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/style-guide" element={<StyleGuidePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}