import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from '../Authentication/home';
import Login from '../Authentication/login';
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
import PrivacyPolicy from '../Projects/PrivacyPolicy';
import TermsOfService from '../Projects/TermOfService';
import Footer from './footer';
import { AiOutlineUser, AiOutlineProject, AiOutlineTeam, AiOutlineLogout } from 'react-icons/ai';
import Cookies from 'js-cookie';

export default function UserNav() {
    const { user, token, logout } = AuthUser();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const logoutUser = () => {
        if (token !== undefined) {
            Cookies.remove('token');
            Cookies.remove('user');
            logout();
            navigate("/login");
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

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

                            <div className="relative" ref={dropdownRef}>
                                <button onClick={toggleDropdown} className="flex items-center space-x-1 text-gray-700 hover:text-[#3A3478] p-1 rounded-full focus:outline-none">
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
                                            <Link to={`/${user.name}/my_projects`} onClick={closeDropdown} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <AiOutlineProject className="mr-2 text-[#3A3478]" /> My Projects
                                            </Link>
                                            <Link to={`/${user.name}/involved_projects`} onClick={closeDropdown} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <AiOutlineTeam className="mr-2 text-[#3A3478]" /> Involved Projects
                                            </Link>
                                            <Link to={`/profile/${user.id}`} onClick={closeDropdown} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <AiOutlineUser className="mr-2 text-[#3A3478]" /> Profile
                                            </Link>
                                        </div>

                                        <div className="py-1 border-t border-gray-100">
                                            <button onClick={() => { logoutUser(); closeDropdown(); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <AiOutlineLogout className="mr-2 text-red-500" /> Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}
