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
import Footer from './footer';

export default function GuestNav() {
  return (
    <div className="App">
      <nav className="bg-yellow-500 shadow-lg py-1 ">
        <div className="flex justify-between items-center py-3 container mx-auto">
          <div>
            <Link to="/">
              <img src={require('./logo.png')} className="w-20 h-auto absolute mb-0 -mt-10" alt="DIYO Logo" />
            </Link>
          </div>
          <Link to="/" className="text-3xl text-white block ml-20 mr-4">DIYO</Link>
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link to="/login" className="text-white text-1xl hover:text-gray-300 mx-2">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/project/:id`} element={<Project_View />} />
          <Route path='/projects/all' element={<ProjectsAll />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/about_us' element={<AboutUs />} />
          <Route path='/password_reset' element={<PasswordReset />} />
        </Routes>
      </div>

      <Footer />

    </div>
  );
}
