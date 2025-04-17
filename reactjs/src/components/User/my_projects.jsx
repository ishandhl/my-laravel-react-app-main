import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';
import ProjectChatbot from '../Projects/ProjectChatbot';

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

    // Calculate progress percentage for funding 
    const calculateProgress = (project) => {
        // Check all possible field names that might contain the collected amount
        const collectedAmount = 
            parseFloat(project.collected_amount || 0) || 
            parseFloat(project.current_amount || 0) || 
            parseFloat(project.raised_amount || 0) || 
            parseFloat(project.funded_amount || 0) || 
            parseFloat(project.total_amount_raised || 0) ||
            parseFloat(project.current_funding || 0) ||
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
            parseFloat(project.total_amount_raised || 0) ||
            parseFloat(project.current_funding || 0) ||
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
               parseFloat(project.total_amount_raised || 0) ||
               parseFloat(project.current_funding || 0) ||
               0;
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">My Projects</h2>
                    <button 
                        onClick={handleNewProjectClick} 
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span>New Project</span>
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProjects.length > 0 ? (
                        sortedProjects.map((project) => {
                            const expired = isProjectExpired(project.end_date);
                            const goalReached = isGoalReached(project);
                            const progress = calculateProgress(project);
                            const collectedAmount = getCollectedAmount(project);
                            
                            return (
                                <div key={project.projectID} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                                    <div className="relative">
                                        <img 
                                            className="w-full h-48 object-cover" 
                                            src={`http://localhost:8000/${project.cover_image}`} 
                                            alt={project.project_title}
                                        />
                                        
                                        {/* Status tags */}
                                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                                            {expired && (
                                                <span className="bg-red-500 text-white text-xs font-bold py-2 px-4 rounded-full">
                                                    Expired
                                                </span>
                                            )}
                                            {goalReached && (
                                                <span className="bg-green-500 text-white text-xs font-bold py-2 px-4 rounded-full">
                                                    Goal Reached
                                                </span>
                                            )}
                                            <span className="bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-full">
                                                {project.type || 'Crowdfund'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-3 text-center">{project.project_title}</h3>
                                        <p className="text-gray-700 mb-6 text-center line-clamp-2">{project.short_description}</p>
                                        
                                        {/* Progress bar */}
                                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                            <div 
                                                className={`h-3 rounded-full ${goalReached ? 'bg-green-500' : 'bg-blue-500'}`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <div className="font-bold text-gray-800">
                                                    Rs. {collectedAmount.toLocaleString()}
                                                </div>
                                                <div className="text-gray-500 text-sm">of Rs. {parseFloat(project.funding_goal).toLocaleString()}</div>
                                                <div className="text-sm">{progress}% Funded</div>
                                            </div>
                                            <div className="text-right">
                                                {expired ? (
                                                    <div className="font-bold text-red-500">Campaign Ended</div>
                                                ) : (
                                                    <>
                                                        <div className="font-bold text-gray-800">{daysRemaining(project.end_date)}</div>
                                                        <div className="text-sm">Days Left</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <Link 
                                                to={`/project/${project.projectID}/edit`} 
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all text-center"
                                            >
                                                Edit Project
                                            </Link>
                                            <Link 
                                                to={`/project/${project.projectID}`} 
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all text-center"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-gray-700 text-center col-span-full py-12">No projects available</div>
                    )}
                </div>
                <ProjectChatbot />

            </div>
            
            {showVerifyEmailModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Verify Your Email</h2>
                        <p className="mb-4">Please verify your email to start creating projects.</p>
                        <button 
                            onClick={() => setShowVerifyEmailModal(false)} 
                            className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg px-5 py-2.5 w-full"
                        >
                            Close
                        </button>
                    </div>
                    
                </div>
            )}
        </div>
        
    );
}