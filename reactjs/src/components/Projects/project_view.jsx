import React, { useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Project_View() {
    const { user, http, khalti } = AuthUser();
    const project_id = window.location.pathname.split('/')[2];
    const [project, setProject] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModalDonate, setShowModalDonate] = useState(false);
    const [showModalInvest, setShowModalInvest] = useState(false);
    const [amount, setAmount] = useState(0);
    const [reportModal, setReportModal] = useState(false);
    const [report, setReport] = useState('');
    const [updates, setUpdates] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        http.get(`/project/${project_id}`).then((response) => {
            console.log(response.data.project[0]);
            setProject(response.data.project[0]);
        }).catch((error) => {
            console.error(error);
        });

        http.get(`/user/project/${project_id}/updates`).then((response) => {
            setUpdates(response.data.project_updates);
        }).catch((error) => {
            console.error(error);
        });
    }, []);


    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };
    const redirectToLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    const InitiatePaymentCrowdfund = () => {
        if (!user) {
            redirectToLogin(); // Redirect if user is not logged in
            return;
        }
        setShowModalDonate(true);
    }

    const InitiatePaymentInvest = () => {
        if (!user) {
            redirectToLogin(); // Redirect if user is not logged in
            return;
        }
        setShowModalInvest(true);
    }
    const CreateReport = () => {
        setReportModal(true)
    }
    const crowdfundPay = () => {

        khalti.post('epayment/initiate/', {
            "return_url": "http://localhost:3000/payment/",
            "website_url": "http://localhost:3000/",
            "amount": amount * 100, // Use entered amount
            "purchase_order_id": 'userid_' + user.id + '_projectid_' + project.projectID,
            "purchase_order_name": 'donation_' + project.project_title,
            "customer_info": {
                "name": user.name,
                "email": user.email,
                "phone": "9800000123"
            },
        }
        ).then((response) => {
            window.location.href = response.data.payment_url;
        }).catch((error) => {
            toast.error('Enter Valid Amount');
        });
    }


    const investPay = (reward) => {
        const rewardID = reward.rewardID;

        khalti.post('epayment/initiate/',
            {
                "return_url": "http://localhost:3000/payment/",
                "website_url": "http://localhost:3000/",
                "amount": reward.amount * 100,
                "purchase_order_id": 'userid_' + user.id + '_projectid_' + project.projectID + "_rewarded_" + rewardID,
                "purchase_order_name": 'rewarded_' + project.project_title,
                "customer_info": {
                    "name": user.name,
                    "email": user.email,
                    "phone": "9800000123"
                }
            }
        ).then((response) => {
            window.location.href = response.data.payment_url;
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleReportSubmit = () => {
        http.post('/report/add', {
            project_id: project_id,
            user_id: user.id,
            report: report,
        }).then((response) => {
            console.log(response.data);
            toast.success('Report submitted successfully');
        }).catch((error) => {
            console.error(error);
            toast.error('Failed to submit report. Please try again.');
        })
        // After submitting, you can close the modal
        setReportModal(false);
    };

    const fundingPercentage = ((parseFloat(project.total_amount_raised) / parseFloat(project.funding_goal)) * 100).toFixed(2);

    return (
        <div className=''>
            <div className="container mx-auto px-4 py-8 ">
                <div className='mb-5'>
                    <div className='flex justify-between gap-3 '>
                    
                        <div>
                            <h1 className="text-4xl font-bold pt-2">{project.project_title}</h1>
                        </div>
                        <div>
                            <button onClick={CreateReport} className="bg-red-500 hover:bg-red-600 text-white font-bold right-16 top-24 py-2 px-4 rounded">
                                <span>Report</span>
                            </button>
                        </div>
                    </div>
                    <h4 className='text-xl text-start font-italic p-2 mt-1'>{project.short_description}</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100">
                    {/* Image Column */}
                    <div className="relative h-96 md:h-auto md:max-w-3/4 md:col-span-1">
                        {/* Image Carousel */}
                        <div className="absolute inset-0">
                            {project.images && project.images.length > 0 && (
                                <img
                                    src={`http://localhost:8000/${project.images[currentImageIndex].image}`}
                                    alt="Project Image"
                                    className="object-cover w-full h-full rounded-lg"
                                    onClick={handleNextImage}
                                />
                            )}
                            {/* Next Button */}
                            <button
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full bg-gray-700 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                onClick={handleNextImage}
                            >
                                &rarr;
                            </button>
                            {/* Previous Button */}
                            <button
                                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full bg-gray-700 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                onClick={handlePrevImage}
                            >
                                &larr;
                            </button>
                        </div>
                    </div>
                    
                    {/* Details Column */}
                    <div className="md:col-span-1">
                        <div className="p-4 md:p-8">
                            <div className="bg-yellow-400 opacity-90 rounded-lg p-6 h-96">
                                <h1 className="text-4xl font-bold text-white">
                                    Rs. {project.total_amount_raised} raised of Rs. {project.funding_goal}
                                </h1>
                                <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                                    {/* Progress Bar */}
                                    <div className="h-4 bg-gray-200 rounded-md mt-2">
                                        <div className="h-full bg-green-500 rounded-md" style={{ width: `${fundingPercentage}%` }}></div>
                                    </div>
                                    <div className="mt-4 mb-8 text-xl">
                                        <p className="font-semibold">Total Backers:</p>
                                        <p>{project.total_transactions}</p>
                                    </div>
                                    <div className="mb-8">
                                        <p className="font-semibold">End Date:</p>
                                        <p>{project.end_date}</p>
                                    </div>
                                    {project.status === 'Running' ? (
                                        <>
                                            <div>
                                                {project.type === 'Invest' ? (
                                                    <button onClick={InitiatePaymentInvest} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-10 rounded w-2/4 md:mr-2">
                                                        Pick a Reward
                                                    </button>
                                                ) : (
                                                    <button onClick={InitiatePaymentCrowdfund} className="bg-yellow-400 hover:opacity-80 text-white font-bold py-2 px-10 rounded w-full md:mr-2">
                                                        Donate
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-red-500">Project is not active.<br />Status: {project.status}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <article className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-12 rounded">
                    <div className="col-span-1">
                        <div className="p-4 md:p-8 rounded-lg bg-yellow-50 opacity-90 overflow-auto h-96">
                            <h2 className="text-4xl font-bold text-yellow-400 mb-4">About Project</h2>
                            <p className="text-lg text-xl text-center">{project.description}</p>
                        </div>
                    </div>
                </article>

                {/* Updates Section */}
                {project && Object.keys(project).length > 0 ? (
                    <div className="bg-yellow-400 opacity-80 p-4 rounded-lg mt-8">
                        <h2 className="text-lg font-semibold mb-4 text-white">Progress and Discussions</h2>
                        <div className="grid gap-4">
                            <div className="bg-yellow-400 opacity-80 p-6 rounded-lg">
                                <div className="grid grid-cols-1 gap-6">
                                    {updates.map((update, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
                                            <p className="">{update.content}</p>
                                            <p className=''>Created At: {update.created_at.split('T')[0]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-400 opacity-80 p-4 rounded-lg mt-8">
                        <h2 className="text-lg font-semibold mb-4 text-white test">Progress and Discussions</h2>
                        <p className="text-white">No updates available</p>
                    </div>
                )}

                {/*Donation Modal */}
                {
                    showModalDonate && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">Payment</h3>
                                                <div className="project-section px-4 py-8">
                                                    <h1 className="project-title text-xl font-bold mb-4">{project.project_title}</h1>
                                                    <div className="project-details">
                                                        <div className="donation-entry mb-4">
                                                            <label htmlFor="donation-enter" className="block ">Enter Amount:</label>
                                                            <input onChange={(e) => setAmount(e.target.value)} type="number" id="donation-enter" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                                        </div>
                                                        <button onClick={crowdfundPay} className="donate-now bg-purple-500 text-white px-4 py-2 rounded-md mb-4">Continue With Khalti</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            onClick={() => setShowModalDonate(false)}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/*Donation Modal */}
                {
                    showModalInvest && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    {/* Rewards Section */}
                                    {project.rewards && project.rewards.length > 0 && (
                                        <div className="bg-yellow-400 opacity-80 p-4 rounded-lg mb-4">
                                            <h2 className="text-lg font-semibold mb-2 text-white-600">Rewards</h2>
                                            {project.rewards.map((reward, index) => (
                                                <div key={index} className="bg-white rounded-lg p-4 shadow-md mb-4">
                                                    <div className="mb-4">
                                                        <p className="font-semibold">Title:</p>
                                                        <p>{reward.title}</p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p className="font-semibold">Image:</p>
                                                        <img src={`http://localhost:8000/${reward.reward_image}`} alt="Reward Image" className="w-40 h-40 rounded" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <p className="font-semibold">Description:</p>
                                                        <p>{reward.description}</p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p className="font-semibold">Amount:</p>
                                                        <p>{reward.amount}</p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p className="font-semibold">Delivery:</p>
                                                        <p>{reward.estimated_delivery}</p>
                                                    </div>
                                                    <button onClick={() => investPay(reward)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded w-full mb-2 md:mb-0 md:mr-2">
                                                        Get
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            onClick={() => setShowModalInvest(false)}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    reportModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2 text-start">Create a Report</h3>
                                        <div className="mb-4">
                                            <label htmlFor="report" className="block  text-start">Report:</label>
                                            <textarea
                                                id="report"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                rows="4"
                                                placeholder="Enter your report here..."
                                                onChange={(e) => setReport(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            onClick={handleReportSubmit}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Submit Report
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setReportModal(false)}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            </div >
        </div>
    );
}
