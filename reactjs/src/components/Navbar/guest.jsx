import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from '../Authentication/login';
import Register from '../Authentication/Register';
import Home from '../Authentication/home';
import Project_View from '../Projects/project_view';
import AboutUs from '../Projects/about_us';
import ProjectsAll from '../Projects/projects_all';
import PasswordReset from '../Authentication/password_reset';
import Blog from '../Projects/Blog';
import PrivacyPolicy from '../Projects/PrivacyPolicy';
import TermsOfService from '../Projects/TermOfService';
import Footer from './footer';
import ContactUs from '../Projects/ContactUs';

export default function GuestNav() {
  return (
    <div className="App min-h-screen flex flex-col">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <Link to="/" className="flex items-center">
              <img 
                src={require('./logo.png')} 
                className="w-24 h-24 object-contain -my-5" 
                alt="Logo" 
              />
            </Link>

            <div className="flex items-center space-x-8">
              <Link to="/projects/all" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Projects</Link>
              <Link to="/blog" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Blog</Link>
              <Link to="/about_us" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About Us</Link>
              <Link to="/ContactUs" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/project/:id`} element={<Project_View />} />
          <Route path='/projects/all' element={<ProjectsAll />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/about_us' element={<AboutUs />} />
          <Route path='/password_reset' element={<PasswordReset />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/TermOfService' element={<TermsOfService />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}