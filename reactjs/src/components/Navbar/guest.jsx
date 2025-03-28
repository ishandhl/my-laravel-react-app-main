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
      <nav className="bg-white-500 shadow-lg py-1 ">
        <div className="flex justify-between items-center py-3 container mx-auto">
          <div>
            <Link to="/">
              <img src={require('./logo.png')} className="w-20 h-auto absolute mb-0 -mt-10" alt="Ujyalo Logo" />
            </Link>
          </div>
          <Link to="/" className="text-transparent bg-gradient-to-r from-[#49D8D4] via-[#3A3478] to-[#7B5BF5] bg-clip-text text-3xl font-extrabold block ml-20 mr-1">Ujyalo</Link>
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link to="/login" className="bg-blue-500 text-white text-1xl px-4 py-2 rounded hover:bg-blue-600 transition font-bold">Login</Link>
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
