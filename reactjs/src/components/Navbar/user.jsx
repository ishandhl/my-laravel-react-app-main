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
import ProjectsAll from '../Projects/projects_all';
import { AiOutlineUser } from 'react-icons/ai';
import Footer from './footer';

export default function UserNav() {
    const { user, token, logout } = AuthUser();
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref for the dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const logoutUser = () => {
        if (token !== undefined) {
            logout();
            navigate("/login");
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Function to close the dropdown when clicking on a menu item
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
        <div className="App">
            <nav className="bg-white shadow-lg py-1">
                <div className="flex justify-between items-center py-4 container mx-auto">
                    <div>
                        <Link to="/">
                            <img src={require('./logo.png')} className="w-20 h-auto absolute mb-0 -mt-10" alt="Ujyalo Logo" />
                        </Link>{/* [#7B5BF5] via-[#3A3478] to-[#49D8D4] */}
                    </div>
                    <Link to="/" className="text-transparent bg-gradient-to-r from-[#49D8D4] via-[#3A3478] to-[#7B5BF5] bg-clip-text text-3xl font-extrabold block ml-20 mr-1">Ujyalo</Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Dropdown menu */}
                        <div className="relative group mx-4" ref={dropdownRef}>
                            <button onClick={toggleDropdown} className="text-gray-800 group-hover:text-blue-500 focus:outline-none flex items-center">
                                <AiOutlineUser className="text-2xl mr-1" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-10">
                                    <Link to={`/${user.name}/my_projects`} onClick={closeDropdown} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500">
                                        <span className="flex-1 ms-3 whitespace-nowrap text-start">My Projects</span>
                                    </Link>
                                    <Link to={`/${user.name}/involved_projects`} onClick={closeDropdown} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500">
                                        <span className="flex-1 ms-3 whitespace-nowrap text-start">Involved Projects</span>
                                    </Link>
                                    <Link to={`/profile/${user.id}`} onClick={closeDropdown} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500">
                                        <span className="flex-1 ms-3 whitespace-nowrap text-start">Profile</span>
                                    </Link>
                                    <Link onClick={() => { logoutUser(); closeDropdown(); }} to={'/login'} className="block px-2 py-2 text-gray-700 hover:text-blue-500 flex items-center">
                                        <span className="flex-1 ms-3 whitespace-nowrap text-start">Logout</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div>
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
                </Routes>
            </div>
            <Footer />
        </div>
    );
}
