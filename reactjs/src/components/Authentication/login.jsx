import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthUser from './AuthUser';

export default function Login() {
    const { http, setToken, logout } = AuthUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showUnauthorizedPopup, setShowUnauthorizedPopup] = useState(false);
    // const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();
        console.log('Logging in...')
        http.post("/login", {
            email: email,
            password: password
        }).then((response) => {
            const user = response.data.user;
            if (user.status === 'active') {
                console.log('User is authorized. Logging in...');
                setToken(user, response.data.access_token);
                toast.success('Login successful!');
                // Redirect to home
            } else {
                setShowUnauthorizedPopup(true);
            }
        }).catch((error) => {
            console.log(error);
            toast.error('Login failed. Please try again.');
        })
    };

    const handleGoBack = () => {
        setShowUnauthorizedPopup(false);
    };

    
    // const handleResetPassword = async () => {
    //     try {
    //         const response = await http.post("/password/reset/request", { email: resetEmail });
    //         toast.success(response.data.message);
    //         setShowPasswordResetForm(false);
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Failed to reset password. Please try again.");
    //     }
    // };

    return (
        <section className="bg-yellow-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src={require('./logo.png')} className="h-12" alt="DIYO Logo" />
                    DIYO
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                {/* <button onClick={() => setShowPasswordResetForm(true)} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</button>     */}
                                                        </div>
                            <button type="button" onClick={submitForm} className="w-full text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Password reset form
            {showPasswordResetForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
                        <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="w-full mb-4 border border-gray-300 rounded p-2" placeholder="Enter your email" />
                        <div className="flex justify-end">
                            <button onClick={handleResetPassword} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>
                        </div>
                    </div>
                </div>
            )} */}
            {/* Unauthorized popup */}
            {showUnauthorizedPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Unauthorized</h2>
                        <p className="mb-4">You are not authorized to access this platform. Please contact the administrator for assistance.</p>
                        <button onClick={handleGoBack} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Go Back</button>
                    </div>
                </div>
            )}
            {/* Toast Container */}
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </section>
    );
}
