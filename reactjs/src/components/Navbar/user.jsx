import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from '../Authentication/home';
import AuthUser from '../Authentication/AuthUser';
import Project_Creation from '../User/create_project';
import User_Projects from '../User/my_projects';
import Project_View from '../Projects/project_view';
import Project_Edit from '../User/project_edit';
import Payment_Handling from '../Projects/payment_handling';
import InvolvedProjects from '../User/involved_projects';
import Profile from '../User/user_profile';
import AboutUs from '../Projects/about_us';
import Blog from '../Projects/Blog';
import ContactUs from '../Projects/ContactUs';
import ProjectsAll from '../Projects/projects_all';
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose, AiOutlineProject, AiOutlineTeam, AiOutlineLogout } from 'react-icons/ai';
import Footer from './footer';
import PrivacyPolicy from '../Projects/PrivacyPolicy';
import TermsOfService from '../Projects/TermOfService';

export default function UserNav() {
    const { user, token, logout } = AuthUser();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutUser = () => {
        if (token !== undefined) {
            logout();
           // navigate("/login"); checking for now this might work
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    // Close the dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="App min-h-screen flex flex-col">
            <nav className="bg-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-3">
                        {/* Logo Only*/}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <img 
                                    src={require('./logo.png')} 
                                    className="w-24 h-24 object-contain -my-5" 
                                    alt="Logo" 
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/projects/all" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                Projects
                            </Link>
                            <Link to="/blog" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                Blog
                            </Link>
                            <Link to="/about_us" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                About Us
                            </Link>
                            <Link to="/ContactUs" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                Contact
                            </Link>
                            
                            {/* User Dropdown */}
                            <div className="relative group" ref={dropdownRef}>
                                <button 
                                    onClick={toggleDropdown} 
                                    className="flex items-center space-x-1 text-gray-700 hover:text-[#3A3478] p-1 rounded-full focus:outline-none"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#49D8D4] to-[#7B5BF5] flex items-center justify-center">
                                        <AiOutlineUser className="text-white text-xl" />
                                    </div>
                                </button>
                                
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">Signed in as {user.name}</p>
                                        </div>
                                        
                                        <div className="py-1">
                                            <Link 
                                                to={`/${user.name}/my_projects`} 
                                                onClick={closeDropdown} 
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <AiOutlineProject className="mr-2 text-[#3A3478]" />
                                                My Projects
                                            </Link>
                                            
                                            <Link 
                                                to={`/${user.name}/involved_projects`} 
                                                onClick={closeDropdown} 
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <AiOutlineTeam className="mr-2 text-[#3A3478]" />
                                                Involved Projects
                                            </Link>
                                            
                                            <Link 
                                                to={`/profile/${user.id}`} 
                                                onClick={closeDropdown} 
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <AiOutlineUser className="mr-2 text-[#3A3478]" />
                                                Profile
                                            </Link>
                                        </div>
                                        
                                        <div className="py-1 border-t border-gray-100">
                                            <button
                                                onClick={() => { logoutUser(); closeDropdown(); }}
                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <AiOutlineLogout className="mr-2 text-red-500" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={toggleMobileMenu}
                                className="text-gray-700 hover:text-[#3A3478] focus:outline-none"
                            >
                                {isMobileMenuOpen ? 
                                    <AiOutlineClose className="h-6 w-6" /> : 
                                    <AiOutlineMenu className="h-6 w-6" />
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-inner py-2">
                        <div className="container mx-auto px-4 space-y-1">
                            <Link 
                                to="/projects/all"
                                onClick={toggleMobileMenu}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Projects
                            </Link>
                            <Link 
                                to="/blog"
                                onClick={toggleMobileMenu}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Blog
                            </Link>
                            <Link 
                                to="/about_us"
                                onClick={toggleMobileMenu}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                            >
                                About Us
                            </Link>
                            <Link 
                                to="/ContactUs"
                                onClick={toggleMobileMenu}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Contact
                            </Link>
                            
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#49D8D4] to-[#7B5BF5] flex items-center justify-center">
                                            <AiOutlineUser className="text-white text-xl" />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    <Link 
                                        to={`/${user.name}/my_projects`}
                                        onClick={toggleMobileMenu}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        My Projects
                                    </Link>
                                    <Link 
                                        to={`/${user.name}/involved_projects`}
                                        onClick={toggleMobileMenu}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Involved Projects
                                    </Link>
                                    <Link 
                                        to={`/profile/${user.id}`}
                                        onClick={toggleMobileMenu}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => { logoutUser(); toggleMobileMenu(); }}
                                        className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/create_project" element={<Project_Creation />} />
                    <Route path="/:user/my_projects" element={<User_Projects />} />
                    <Route path='/projects/all' element={<ProjectsAll />} />
                    <Route path="/:user/involved_projects" element={<InvolvedProjects />} />
                    <Route path={`/project/:id`} element={<Project_View />} />
                    <Route path="/project/:project_id/edit" element={<Project_Edit />} />
                    <Route path="/payment" element={<Payment_Handling />} />
                    <Route path='/about_us' element={<AboutUs />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/ContactUs' element={<ContactUs />} />
                    <Route path='/TermOfService' element={<PrivacyPolicy />} />
                    <Route path='/PrivacyPolicy' element={<TermsOfService />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}