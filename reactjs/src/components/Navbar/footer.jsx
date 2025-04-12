import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-blue-100 shadow-lg">
      <div className="container mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-3xl text-blue-600">Ujyalo</h3>
            </div>
            <p className="text-black">&copy; 2025 Ujyalo. All rights reserved.</p>
            <p className="text-black flex items-center">
              Your trusted source for Ujyalo projects and ideas.
            </p>
          </div>
          
          {/* Social Media Icons */}
          <div className="space-y-4 md:text-right">
            <h4 className="font-semibold text-xl text-blue-600 flex md:justify-end items-center">
              <span className="mr-2">🌐</span> Connect With Us
            </h4>
            <div className="flex md:justify-end space-x-6">
              <a href="#" className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110 hover:rotate-3">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110 hover:-rotate-3">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110 hover:rotate-3">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t-2 border-blue-200"></div>
          <div className="mx-4 text-blue-400 text-2xl"></div>
          <div className="flex-1 border-t-2 border-blue-200"></div>
        </div>
        
        {/* Bottom Footer (Privacy, Terms, etc.)*/}
        <div className="text-center">
          <ul className="inline-flex flex-wrap justify-center bg-blue-50 px-6 py-4 rounded-full shadow-md">
            <li>
              <Link to="/blog" className="px-4 py-2 mx-1 text-black font-medium hover:text-blue-500 transition-colors">Blog 📝</Link>
            </li>
            <li>
              <Link to="/PrivacyPolicy" className="px-4 py-2 mx-1 text-black font-medium hover:text-blue-500 transition-colors">Privacy 🔒</Link>
            </li>
            <li>
              <Link to="/TermOfService" className="px-4 py-2 mx-1 text-black font-medium hover:text-blue-500 transition-colors">Terms 📋</Link>
            </li>
          </ul>
        </div>
        
        {/* Footer note */}
        <div className="mt-6 text-center text-black text-sm">
          Made with by the Ujyalo team.
        </div>
      </div>
    </footer>
  );
}