import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#f5f5dc] border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#2E8B57] rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-foreground">EcoBazaarX</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Your trusted marketplace for sustainable and eco-friendly products.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-[#2E8B57] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-[#2E8B57] hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-[#2E8B57] hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-[#2E8B57] hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-muted-foreground hover:text-[#2E8B57] transition-colors">Marketplace</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-[#2E8B57] transition-colors">Community</Link></li>
              <li><Link to="/events" className="text-muted-foreground hover:text-[#2E8B57] transition-colors">Events</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-[#2E8B57] transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-foreground">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-[#2E8B57] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-[#2E8B57] transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-[#2E8B57] transition-colors">Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-[#2E8B57] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">Subscribe to our newsletter for eco-tips and offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              />
              <button className="px-4 py-2 bg-[#2E8B57] text-white rounded-lg hover:bg-[#1F5E3E] transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2025 EcoBazaarX. All rights reserved. Building a sustainable future together.</p>
        </div>
      </div>
    </footer>
  );
}
