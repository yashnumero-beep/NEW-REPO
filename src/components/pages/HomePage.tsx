import { ArrowRight, Leaf, Recycle, Calendar, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { ProductCard } from "../ProductCard";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const featuredProducts = [
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
];

const highlights = [
  {
    icon: ShoppingBag,
    title: "Sustainable Shopping",
    description: "Discover eco-friendly products from verified sustainable brands",
    color: "#2E8B57",
  },
  {
    icon: Recycle,
    title: "Recycling Hub",
    description: "Learn how to recycle and reduce waste in your community",
    color: "#66CDAA",
  },
  {
    icon: Calendar,
    title: "Eco Events Near You",
    description: "Join local events and connect with eco-conscious people",
    color: "#3CB371",
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758487406655-d724ea2ee1b6?w=1920"
            alt="Eco-friendly products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Leaf className="w-4 h-4 text-[#66CDAA]" />
              <span className="text-white">Certified Sustainable Marketplace</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              Shop Green. Live Clean.
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands making a difference with sustainable choices. Every purchase plants a tree.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg" className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl px-8">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-xl px-8">
                  Join Community
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#2E8B57] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-8 h-8" />
                <h3>50K+</h3>
              </div>
              <p className="text-white/80">Active Members</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Leaf className="w-8 h-8" />
                <h3>100K+</h3>
              </div>
              <p className="text-white/80">Trees Planted</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-8 h-8" />
                <h3>5M+</h3>
              </div>
              <p className="text-white/80">CO₂ Saved (kg)</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-[#f5f5dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Why Choose EcoBazaarX</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just a marketplace. We're a community dedicated to sustainable living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border text-center group"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${highlight.color}20` }}
                >
                  <highlight.icon className="w-8 h-8" style={{ color: highlight.color }} />
                </div>
                <h3 className="text-foreground mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-foreground mb-2">Featured Eco-Products</h2>
              <p className="text-muted-foreground">Handpicked sustainable products for conscious consumers</p>
            </div>
            <Link to="/marketplace">
              <Button variant="outline" className="border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white rounded-xl">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2E8B57] to-[#3CB371]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-white/90 mb-8 text-lg">
              Join our community of eco-warriors and start your sustainable journey today.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-white text-[#2E8B57] hover:bg-white/90 rounded-xl px-8">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
