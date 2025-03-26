import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-yellow-400 py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-3xl ">DIYO</h3>
            <p className="text-sm ">&copy; 2025 DIYO. All rights reserved.</p>
            <p className="text-sm ">Your trusted source for DIY projects and ideas.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about_us" className="hover:text-yellow-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-yellow-300 transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Follow Us</h4>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer (Privacy, Terms, etc.) */}
        <div className="mt-8 border-t border-white pt-4 text-center">
          <ul className="flex justify-center space-x-6 text-sm text-white">
            <li>
              <Link to="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-gray-900 transition-colors">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
