import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function User_Projects() {
    const { user, http } = AuthUser();
    const [projects, setProjects] = useState([]);
    const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);

    useEffect(() => {
        http.get(`/user/my_projects/${user.id}`).then((response) => {
            console.log("Projects data:", response.data.projects); // Debug: Log the projects data
            setProjects(response.data.projects);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    // Function to check if a project has expired
    const isProjectExpired = (endDate) => {
        const today = new Date();
        const projectEndDate = new Date(endDate);
        return today > projectEndDate;
    };

    // Function to calculate days remaining
    const daysRemaining = (endDate) => {
        const end = new Date(endDate);
        const today = new Date();
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    // Calculate progress percentage for funding - improved with better type handling
    const calculateProgress = (project) => {
        // Check all possible field names that might contain the collected amount
        const collectedAmount = 
            parseFloat(project.collected_amount || 0) || 
            parseFloat(project.current_amount || 0) || 
            parseFloat(project.raised_amount || 0) || 
            parseFloat(project.funded_amount || 0) || 
            0;
        
        const goal = parseFloat(project.funding_goal || 0);
        
        // Debug log to check values
        console.log(`Project: ${project.project_title}, Amount: ${collectedAmount}, Goal: ${goal}`);
        
        if (!goal || goal === 0) return 0;
        const progress = (collectedAmount / goal) * 100;
        return Math.min(Math.round(progress), 100); // Cap at 100% and round
    };

    // Check if funding goal has been reached
    const isGoalReached = (project) => {
        const collectedAmount = 
            parseFloat(project.collected_amount || 0) || 
            parseFloat(project.current_amount || 0) || 
            parseFloat(project.raised_amount || 0) || 
            parseFloat(project.funded_amount || 0) || 
            0;
        
        const goal = parseFloat(project.funding_goal || 0);
        
        if (!goal) return false;
        return collectedAmount >= goal;
    };

    // Sort projects to prioritize expired and goal-reached projects
    const sortedProjects = [...projects].sort((a, b) => {
        const aExpired = isProjectExpired(a.end_date);
        const bExpired = isProjectExpired(b.end_date);
        const aGoalReached = isGoalReached(a);
        const bGoalReached = isGoalReached(b);
        
        // First priority: Goal reached
        if (aGoalReached && !bGoalReached) return -1;
        if (!aGoalReached && bGoalReached) return 1;
        
        // Second priority: Expired
        if (aExpired && !bExpired) return -1;
        if (!aExpired && bExpired) return 1;
        
        // If both have same status, sort by creation date (newest first)
        return new Date(b.created_at) - new Date(a.created_at);
    });

    const handleNewProjectClick = () => {
        if (user.email_verified_at !== null) {
            window.location.href = '/create_project';
        } else {
            setShowVerifyEmailModal(true);
        }
    };

    // Function to get collected amount regardless of field name
    const getCollectedAmount = (project) => {
        return parseFloat(project.collected_amount || 0) || 
               parseFloat(project.current_amount || 0) || 
               parseFloat(project.raised_amount || 0) || 
               parseFloat(project.funded_amount || 0) || 
               0;
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center min-h-screen py-10 px-4">
            <div className="w-full max-w-7xl backdrop-blur-sm bg-white/40 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold mb-4 md:mb-0">My Projects</h2>
                    <button onClick={handleNewProjectClick} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all">
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span>New Project</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProjects.length > 0 ? (
                        sortedProjects.map((project) => {
                            const expired = isProjectExpired(project.end_date);
                            const goalReached = isGoalReached(project);
                            const progress = calculateProgress(project);
                            const collectedAmount = getCollectedAmount(project);
                            
                            return (
                                <div key={project.projectID} className={`bg-white rounded-lg shadow-md overflow-hidden border ${goalReached ? 'border-green-500' : expired ? 'border-red-500' : 'border-gray-200'}`}>
                                    <div className="relative">
                                        <img className="w-full h-48 object-cover" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                        
                                        {/* Status tags */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                                            {expired && (
                                                <span className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                                                    Expired
                                                </span>
                                            )}
                                            {goalReached && (
                                                <span className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                                                    Goal Reached
                                                </span>
                                            )}
                                            <span className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                                                {project.type || 'Crowdfund'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">{project.project_title}</h2>
                                        <p className="text-gray-700 mb-4 line-clamp-2">{project.short_description}</p>
                                        
                                        {/* Progress bar - Now Working! */}
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                            <div 
                                                className={`h-2.5 rounded-full ${goalReached ? 'bg-green-500' : 'bg-blue-500'}`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        
                                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                                            <div>
                                                <span className="font-bold text-gray-800">
                                                    Rs. {collectedAmount.toLocaleString()}
                                                </span>
                                                <span className="text-gray-500"> of Rs. {parseFloat(project.funding_goal).toLocaleString()}</span>
                                                <p className="text-xs">{progress}% Funded</p>
                                            </div>
                                            <div className="text-right">
                                                {expired ? (
                                                    <span className="font-bold text-red-500">Campaign Ended</span>
                                                ) : (
                                                    <>
                                                        <span className="font-bold text-gray-800">{daysRemaining(project.end_date)}</span>
                                                        <p className="text-xs">Days Left</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Link to={`/project/${project.projectID}/edit`} className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all flex-1 text-center">
                                                Edit Project
                                            </Link>
                                            <Link to={`/project/${project.projectID}`} className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md transition-all flex-1 text-center">
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-gray-700 text-center col-span-full">No projects available</div>
                    )}
                </div>
            </div>
            {showVerifyEmailModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Verify Your Email</h2>
                        <p className="mb-4">Please verify your email to start creating projects.</p>
                        <button onClick={() => setShowVerifyEmailModal(false)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg px-5 py-2.5">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}