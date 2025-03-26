import React, { useState } from 'react';
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
import { FaUserCircle } from 'react-icons/fa'; // Importing FontAwesome icon
import Footer from './footer';

export default function UserNav() {
    const { user, token, logout } = AuthUser();
    const navigate = useNavigate();

    const logoutUser = () => {
        if (token != undefined) {
            logout();
            navigate("/login");
        }
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="App">
            <nav className="bg-yellow-500 shadow-lg py-1 ">
                <div className="flex justify-between items-center py-3 container mx-auto">
                    <div className=''>
                        <Link to="/">
                            <img src={require('./logo.png')} className="w-20 h-auto absolute mb-0 -mt-10" alt="DIYO Logo" />
                        </Link>
                    </div>
                    <Link to="/" className="text-3xl text-white block ml-20 mr-1">DIYO</Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Dropdown menu */}
                        <div className="relative group mx-4">
                            <button onClick={toggleDropdown} className="text-white group-hover:text-gray-300 focus:outline-none flex items-center">
                                <FaUserCircle className="text-2xl mr-1" /> {/* Use the FontAwesome user circle icon */}
                                <svg className={`w-4 h-4 ml-1 transition-transform transform ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M10 3a2 2 0 100 4 2 2 0 000-4zm0 14a2 2 0 100-4 2 2 0 000 4zm0-9a2 2 0 100-4 2 2 0 000 4zm0 9a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-10">
                                    <Link to={`/${user.name}/my_projects`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap text-start">My Projects</span>
                                    </Link>
                                    <Link to={`/${user.name}/involved_projects`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap text-start">Involved Projects</span>
                                    </Link>
                                    <Link to={`/profile/${user.id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clipRule="evenodd" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap text-start">Profile</span>
                                    </Link>
                                    <Link onClick={logoutUser} to={'/login'} className="block px-2 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap text-start">Logout</span>
                                    </Link>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="">
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
    )
}
