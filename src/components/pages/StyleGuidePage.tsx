import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ProductCard } from "../ProductCard";
import { EventCard } from "../EventCard";
import { StatCard } from "../StatCard";
import { Leaf, ShoppingBag, Users, TrendingUp } from "lucide-react";

export function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-foreground mb-2">EcoBazaarX Design System</h1>
          <p className="text-muted-foreground">
            Color palette, typography, and component library for the sustainable marketplace
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-foreground mb-6">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Colors */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="text-foreground mb-4">Primary Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#2E8B57] shadow-sm"></div>
                  <div>
                    <p className="text-foreground">Eco Green</p>
                    <p className="text-muted-foreground">#2E8B57</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#66CDAA] shadow-sm"></div>
                  <div>
                    <p className="text-foreground">Eco Green Light</p>
                    <p className="text-muted-foreground">#66CDAA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#1F5E3E] shadow-sm"></div>
                  <div>
                    <p className="text-foreground">Eco Green Dark</p>
                    <p className="text-muted-foreground">#1F5E3E</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="text-foreground mb-4">Secondary Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#f5f5dc] shadow-sm border border-border"></div>
                  <div>
                    <p className="text-foreground">Eco Beige</p>
                    <p className="text-muted-foreground">#F5F5DC</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white shadow-sm border border-border"></div>
                  <div>
                    <p className="text-foreground">White</p>
                    <p className="text-muted-foreground">#FFFFFF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="text-foreground mb-4">Accent Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#3CB371] shadow-sm"></div>
                  <div>
                    <p className="text-foreground">Medium Sea Green</p>
                    <p className="text-muted-foreground">#3CB371</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#90EE90] shadow-sm"></div>
                  <div>
                    <p className="text-foreground">Light Green</p>
                    <p className="text-muted-foreground">#90EE90</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-foreground mb-6">Typography</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-2">Font Family: Inter</p>
                <h1>Heading 1 - The quick brown fox jumps</h1>
              </div>
              <div>
                <h2>Heading 2 - The quick brown fox jumps</h2>
              </div>
              <div>
                <h3>Heading 3 - The quick brown fox jumps</h3>
              </div>
              <div>
                <h4>Heading 4 - The quick brown fox jumps</h4>
              </div>
              <div>
                <p className="text-foreground">
                  Body Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Muted Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-foreground mb-6">Buttons</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                Primary Button
              </Button>
              <Button variant="outline" className="border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white rounded-xl">
                Outline Button
              </Button>
              <Button variant="ghost" className="rounded-xl">
                Ghost Button
              </Button>
              <Button variant="secondary" className="rounded-xl">
                Secondary Button
              </Button>
              <Button size="sm" className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                Small Button
              </Button>
              <Button size="lg" className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                Large Button
              </Button>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <h2 className="text-foreground mb-6">Badges</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-[#2E8B57] hover:bg-[#2E8B57]">
                <Leaf className="w-3 h-3 mr-1" />
                Eco A
              </Badge>
              <Badge variant="secondary">Category</Badge>
              <Badge variant="outline">Outlined</Badge>
              <Badge className="bg-[#2E8B57]/10 text-[#2E8B57] hover:bg-[#2E8B57]/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-foreground mb-6">Card Components</h2>
          
          <h3 className="text-foreground mb-4">Product Cards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ProductCard
              id="1"
              name="Bamboo Toothbrush Set"
              price={12.99}
              rating={4.8}
              image="https://images.unsplash.com/photo-1605615016732-03add3ee505d?w=400"
              ecoRating="A"
              category="Personal Care"
            />
            <ProductCard
              id="2"
              name="Reusable Water Bottle"
              price={24.99}
              rating={4.9}
              image="https://images.unsplash.com/photo-1623684194967-48075185a58c?w=400"
              ecoRating="A"
              category="Lifestyle"
            />
          </div>

          <h3 className="text-foreground mb-4">Event Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <EventCard
              title="Community Beach Cleanup"
              date="November 20, 2025"
              location="Santa Monica Beach, CA"
              attendees={124}
              image="https://images.unsplash.com/photo-1513906029980-32d13afe6d8c?w=600"
              category="Cleanup"
            />
            <EventCard
              title="Urban Gardening Workshop"
              date="November 22, 2025"
              location="Green Community Center, NY"
              attendees={56}
              image="https://images.unsplash.com/photo-1513906029980-32d13afe6d8c?w=600"
              category="Workshop"
            />
          </div>

          <h3 className="text-foreground mb-4">Stat Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Sales"
              value="$85,420"
              icon={ShoppingBag}
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
          </div>
        </section>

        {/* Border Radius & Shadows */}
        <section className="mb-16">
          <h2 className="text-foreground mb-6">Border Radius & Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h4 className="text-foreground mb-2">Small Radius (12px)</h4>
              <p className="text-muted-foreground">rounded-xl</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h4 className="text-foreground mb-2">Medium Radius (16px)</h4>
              <p className="text-muted-foreground">rounded-2xl</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
              <h4 className="text-foreground mb-2">With Shadow</h4>
              <p className="text-muted-foreground">shadow-lg</p>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section>
          <h2 className="text-foreground mb-6">Design Principles</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-foreground mb-3">✨ Clean & Minimal</h3>
                <p className="text-muted-foreground">
                  Uncluttered interfaces with ample white space for better user focus and readability.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-3">🌱 Nature-Inspired</h3>
                <p className="text-muted-foreground">
                  Color palette and imagery reflect our commitment to sustainability and the environment.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-3">🎨 Consistent Branding</h3>
                <p className="text-muted-foreground">
                  Unified design language across all pages with the eco-green (#2E8B57) as the primary brand color.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-3">📱 Responsive Design</h3>
                <p className="text-muted-foreground">
                  Desktop-first layout (1440px) with mobile-responsive components for all screen sizes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
