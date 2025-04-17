import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectChatbot from '../Projects/ProjectChatbot';


export default function Profile() {

    const { http } = AuthUser();
    const userid = window.location.pathname.split('/').pop();

    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_location, setLocation] = useState('');

    useEffect(() => {
        // Fetch user data when the component mounts
        http.get(`/user/${userid}`)
            .then((response) => {
                setUserData(response.data[0]);
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setLocation(response.data[0].location);
            })
            .catch((error) => {
                console.error(error);
                // Handle error
            });
    }, []);

    const handleInformationChanges = async () => {
        try {
            const response = await http.put(`/user/${userid}/update`, {
                name: name,
                email: email,
                location: user_location,
                role: userData.role,
                status: userData.status
            });
            console.log(response.data);
            window.location.reload();
            toast.success("Information updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update information. Please try again.");
        }
    };

    const handleEmailVerification = async () => {
        try {
            const response = await http.post(`/email/verification-notification`);
            // Show toast for success
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to verify email. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-16">
          <div className="max-w-xl mx-auto px-4">
            {userData && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-5">
                  <h1 className="text-2xl font-bold text-white">Your Profile</h1>
                  <p className="text-blue-100 text-sm mt-1">Manage your account information</p>
                </div>
                
                {/* Profile Content */}
                <div className="p-6">
                  <div className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        id="name"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        onChange={(e) => setName(e.target.value)} 
                        type="text" 
                        defaultValue={userData.name} 
                      />
                    </div>
      
                    {/* Email Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        {userData.email_verified_at !== null ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Not Verified
                          </span>
                        )}
                      </div>
                      <input
                        id="email"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        defaultValue={userData.email} 
                      />
                    </div>
      
                    {/* Location Field */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        id="location"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        onChange={(e) => setLocation(e.target.value)} 
                        type="text" 
                        defaultValue={userData.location} 
                      />
                    </div>
                  </div>
      
                  {/* Actions */}
                  <div className="mt-8 space-y-4">
                    <button 
                      onClick={handleInformationChanges} 
                      className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                      </svg>
                      Save Changes
                    </button>
                    
                    {userData.email_verified_at === null && (
                      <button 
                        onClick={handleEmailVerification} 
                        className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Verify Email
                      </button>
                    )}
                    
                    <Link 
                      to="/" 
                      className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition-all duration-200 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                      </svg>
                      Back to Dashboard
                    </Link>
                  </div>
                </div>
                <ProjectChatbot />
              </div>
            )}
            
            <ToastContainer />
          </div>
        </div>
      );
    }