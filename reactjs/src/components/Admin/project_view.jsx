import { React, useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';
import { Link } from 'react-router-dom';

export default function ProjectView() {
    const { user, http, httpForm } = AuthUser();
    const [genreList, setGenreList] = useState([]);
    const project_id = window.location.pathname.split('/')[3];
    const [project, setProject] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [projectType, setProjectType] = useState('Crowdfund');
    const [genre, setGenre] = useState('');
    const [projectStatus, setProjectStatus] = useState('pending');
    const [reports, setReports] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    
    useEffect(() => {
        http.get('/projects/genre')
            .then((response) => {
                setGenreList(response.data[0]);
            }).catch((error) => {
                console.log(error);
            })

        http.get(`/project/${project_id}`)
            .then((response) => {
                setProject(response.data.project[0]);
                setGenre(response.data.project[0].genre_id);
                setProjectType(response.data.project[0].type);
                setProjectStatus(response.data.project[0].status);
            }).catch((error) => {
                console.error(error);
            });

        http.get(`/reports/${project_id}`).then((response) => {
            setReports(response.data.reports);
        }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    const handleProjectTypeChange = (e) => {
        setProjectType(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleProjectStatusChange = (e) => {
        setProjectStatus(e.target.value);
    };

    const updateProject = () => {
        http.put(`/project/${project_id}/update`,
            {
                projectType: projectType,
                genre: genre,
                projectStatus: projectStatus
            }
        ).then((response) => {
            console.log(response);
            setShowPopup(true);
        }
        ).catch((error) => {
            console.log(error);
        });
    }

    // Calculate funding progress percentage
    const progressPercentage = project.funding_goal ? 
        Math.min(Math.round((project.total_amount_raised / project.funding_goal) * 100), 100) : 0;

    return (
        <div className="container mx-auto px-4 py-8 max-h-screen overflow-y-auto bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                    <h1 className="text-3xl font-bold text-white text-center">{project.project_title}</h1>
                    <p className="text-gray-200 mt-2 text-center">{project.short_description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 p-6">
                    {/* Left Column - Project Details */}
                    <div className="space-y-6">
                        {/* Cover Image */}
                        <div className="rounded-lg overflow-hidden shadow-md">
                            {project.cover_image && (
                                <img 
                                    src={`http://localhost:8000/${project.cover_image}`} 
                                    alt="Cover Image" 
                                    className="object-cover w-full h-64 rounded-t-lg"
                                />
                            )}
                            <div className="bg-white p-4">
                                {/* Funding Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm font-medium mb-1">
                                        <span>Rs. {project.total_amount_raised || 0}</span>
                                        <span>Rs. {project.funding_goal || 0}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-blue-600 h-2.5 rounded-full" 
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{progressPercentage}% funded</p>
                                </div>
                                
                                <div className="flex justify-between">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-blue-700">Rs. {project.funding_goal}</p>
                                        <p className="text-xs text-gray-500">Funding Goal</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-green-600">Rs. {project.total_amount_raised}</p>
                                        <p className="text-xs text-gray-500">Raised</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-purple-600">{project.end_date}</p>
                                        <p className="text-xs text-gray-500">Deadline</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Project Description */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Project Description</h2>
                            <p className="text-gray-700 leading-relaxed">{project.description}</p>
                        </div>
                        
                        {/* Project Gallery */}
                        {project.images && project.images.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Project Gallery</h2>
                                <div className="relative overflow-hidden rounded-lg h-64">
                                    <img 
                                        src={`http://localhost:8000/${project.images[currentImageIndex].image}`} 
                                        alt="Project Image" 
                                        className="object-contain w-full h-full" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-between px-2">
                                        <button 
                                            className="bg-gray-800 bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-90 transition"
                                            onClick={handlePrevImage}
                                        >
                                            &larr;
                                        </button>
                                        <button 
                                            className="bg-gray-800 bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-90 transition"
                                            onClick={handleNextImage}
                                        >
                                            &rarr;
                                        </button>
                                    </div>
                                    <div className="absolute bottom-2 inset-x-0 flex justify-center space-x-2">
                                        {project.images.map((_, idx) => (
                                            <span 
                                                key={idx} 
                                                className={`h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                                            ></span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Right Column - Admin Controls & Creator Info */}
                    <div className="space-y-6">
                        {/* Admin Controls */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Admin Controls</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="projectType" className="block text-gray-700 text-sm font-bold mb-2">Project Type:</label>
                                    <select 
                                        id="projectType" 
                                        name="projectType" 
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        value={projectType} 
                                        onChange={handleProjectTypeChange}
                                    >
                                        <option value="Crowdfund">Crowdfund</option>
                                        <option value="Invest">Invest</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">Project Genre:</label>
                                    <select 
                                        id="genre" 
                                        value={genre} 
                                        onChange={handleGenreChange} 
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        {genreList.map((genre) => (
                                            <option key={genre.genreID} value={genre.genreID}>
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="projectStatus" className="block text-gray-700 text-sm font-bold mb-2">Project Status:</label>
                                    <select 
                                        id="projectStatus" 
                                        name="projectStatus" 
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        value={projectStatus} 
                                        onChange={handleProjectStatusChange}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Running">Running</option>
                                        <option value="Complete">Complete</option>
                                        <option value="Canceled">Canceled</option>
                                        <option value="Unauthorized">Unauthorized</option>
                                    </select>
                                </div>
                                <button 
                                    type="submit" 
                                    onClick={updateProject} 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
                                >
                                    Update Project
                                </button>
                            </div>
                        </div>
                        
                        {/* Creator Details */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Creator Details</h2>
                            <Link to={`/admin/users/edit/${project.creator_id}`} className="block">
                                <div className="flex items-center mb-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition duration-200">
                                    <div className="bg-blue-100 rounded-full p-3 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{project.creator}</h3>
                                        <p className="text-gray-600 text-sm">{project.creator_email}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Rewards Section */}
                {project.rewards && project.rewards.length > 0 && (
                    <div className="p-6 border-t border-gray-200">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Rewards</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.rewards.map((reward, index) => (
                                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition duration-200">
                                    <div className="h-40 overflow-hidden">
                                        <img 
                                            src={`http://localhost:8000/${reward.reward_image}`} 
                                            alt="Reward" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-lg text-gray-800">{reward.title}</h3>
                                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Rs. {reward.amount}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Estimated delivery: {reward.estimated_delivery}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Reports Section */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-red-600 to-pink-700 p-4">
                    <h2 className="text-2xl font-bold text-white">Project Reports</h2>
                </div>
                
                <div className="p-6">
                    {reports.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reports.map((report, index) => (
                                <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
                                    <div className="flex items-center mb-2">
                                        <div className="bg-red-100 rounded-full p-2 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Reported by: {report.user}</h3>
                                            <p className="text-xs text-gray-500">User ID: {report.userid}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-gray-200 mb-2">
                                        <p className="text-gray-700">{report.report}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">Reported on: {report.created_at}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-600">No reports available for this project</p>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Success Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Success!</h3>
                            <p className="text-gray-600">Project status updated successfully!</p>
                            <button 
                                onClick={() => setShowPopup(false)} 
                                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}