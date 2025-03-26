import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <>
            <div className="bg-yellow-50 py-20">
                <div className="w-full max-w-lg mx-auto px-6 py-10 bg-white rounded-lg border ">
                    {userData && (
                        <>
                            <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h1>
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-start">Name</label>
                                    <input
                                        id="name"
                                        className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onChange={(e) => setName(e.target.value)} type="text" defaultValue={userData.name} />
                                </div>

                                {/* Email Field */}
                                <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-start">
                                        Email ({userData.email_verified_at !== null ? 'Verified' : 'Not Verified'})
                                    </label>
                                    <input
                                        id="email"
                                        className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onChange={(e) => setEmail(e.target.value)} type="text" defaultValue={userData.email} />
                                </div>

                                {/* Location Field */}
                                <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-start">Location</label>
                                    <input
                                        id="location"
                                        className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onChange={(e) => setLocation(e.target.value)} type="text" defaultValue={userData.location} />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center space-x-4">
                                <button onClick={handleInformationChanges} className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
                                    Update Information
                                </button>
                                <Link to="/" className="w-full px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 focus:ring-4 focus:ring-gray-300">
                                    Back
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className=" p-6 bg-yellow-50 dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Actions</h2>
                <div className="flex justify-center">
                    <button onClick={handleEmailVerification} className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300">
                        Verify Email
                    </button>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}
