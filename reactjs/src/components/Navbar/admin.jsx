import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';
import UserCRUD from "../Admin/userCRUD";
import AdminDashboard from '../Dashboard/admin_dashboard';
import ProjectCRUD from '../Admin/projectCRUD';
import UserEDIT from '../Admin/userEDIT';
import ProjectView from '../Admin/project_view';

export default function AdminNav() {
    const { token, logout, user } = AuthUser();
    const navigate = useNavigate();

    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
        navigate("/login");
    }

    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="p-2 bg-gray-800 text-white">
                <div className="my-6">
                    <h1 className="px-4 text-3xl font-bold">{`Welcome, ${user.name}`}</h1>
                </div>
                <ul className="grid gap-2">
                    <NavItem to="/dashboard" icon="dashboard">Dashboard</NavItem>
                    <NavItem to="/admin/users" icon="users">Users</NavItem>
                    <NavItem to="/admin/projects" icon="projects">Projects</NavItem>
                    <NavItem to="https://test-admin.khalti.com/#/transaction?search_type&search_value&state=DhvMj9hdRufLqkP8ZY4d8g&type&start_date=2024-04-14&end_date=2024-04-17&live=true&page=1" icon="notifications">Transactions</NavItem>
                    <NavItem onClick={logoutUser} icon="logout">Logout</NavItem>
                </ul>
            </div>
            {/* Main Content */}
            <div className="w-full px-4 py-2 bg-gray-200">
                <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<UserCRUD />} />
                    <Route path="/admin/projects" element={<ProjectCRUD />} />
                    <Route path={`/admin/users/edit/:id`} element={<UserEDIT />} />
                    <Route path={`/admin/project/:id`} element={<ProjectView />} />
                </Routes>
            </div>
        </div>
    );
}

// NavItem component
const NavItem = ({ to, icon, children, onClick }) => {
    return (
        <li className="mb-2 rounded hover:bg-gray-700">
            {to ? (
                <Link to={to} className="inline-block w-full h-full px-4 py-3 flex items-center space-x-2">
                    <Icon name={icon} />
                    <span>{children}</span>
                </Link>
            ) : (
                <button onClick={onClick} className="inline-block w-full h-full px-4 py-3 flex items-center space-x-2 cursor-pointer focus:outline-none">
                    <Icon name={icon} />
                    <span>{children}</span>
                </button>
            )}
        </li>
    );
};

// Icon component
const Icon = ({ name }) => {
    const icons = {
        dashboard: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        ),
        users: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" clipRule="evenodd" />
            </svg>
        ),
        projects: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.5 11.5 13.5 13.5M4 10h5m11 0h-1.5M12 7V4M7 7V4m10 3V4m-7 13H8v-2l5.2-5.3a1.5 1.5 0 0 1 2 2L10 17Zm-5 3h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z" clipRule="evenodd" />
            </svg>
        ),
        notifications: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11.5 11.5 2 2M4 6h16M4 12h16M4 18h16" />
            </svg>
        ),
        profile: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" clipRule="evenodd" />
            </svg>
        ),
        logout: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
            </svg>
        )
    };

    return icons[name] || null;
};
