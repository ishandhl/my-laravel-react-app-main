import React, { useState, useEffect } from "react";
import AuthUser from "../Authentication/AuthUser";
import { Link } from "react-router-dom";

export default function InvolvedProjects() {
    const { user, http } = AuthUser();
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        http.get(`/user/involved_projects/${user.id}`).then((response) => {
            setProjects(response.data.inv_projects);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    
    return (
        <div className="bg-gray-50 pt-6 flex items-center justify-center min-h-screen">
            <div className="w-11/12 backdrop-blur-sm bg-white p-8 rounded-xl shadow-lg border-blue-100 border">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Involved Projects</h2>
                    <div className="h-1 w-16 bg-blue-500 rounded"></div>
                </div>
                
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="text-gray-600 text-lg text-center">You're not involved in any projects yet.</p>
                        <p className="text-gray-500 text-center mt-2">Explore and join projects to see them here!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map((project) => (
                            <div key={project.projectID} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 flex flex-col h-full">
                                <div className="relative">
                                    <img 
                                        className="w-full h-48 object-cover" 
                                        src={`http://localhost:8000/${project.cover_image}`} 
                                        alt={project.project_title} 
                                    />
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                                        {project.rewards?.length || 0} Rewards
                                    </div>
                                </div>
                                
                                <div className="p-4 flex-grow">
                                    <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">{project.project_title}</h2>
                                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{project.short_description}</p>
                                </div>
                                
                                <div className="p-4 border-t border-gray-100 bg-gray-50">
                                    <h6 className="mb-3 text-sm font-bold text-gray-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                        Rewards
                                    </h6>
                                    
                                    <div className="space-y-2 min-h-16">
                                        {project.rewards && project.rewards.length > 0 ? (
                                            project.rewards.map((reward, index) => (
                                                <div key={index} className="flex items-center p-2 bg-white rounded-lg border border-gray-100 shadow-sm text-xs">
                                                    {reward.reward_image ? (
                                                        <img 
                                                            src={`http://localhost:8000/${reward.reward_image}`} 
                                                            className="w-6 h-6 mr-2 rounded-full object-cover border-2 border-blue-100 flex-shrink-0" 
                                                            alt={reward.title} 
                                                        />
                                                    ) : (
                                                        <div className="w-6 h-6 mr-2 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold flex-shrink-0">
                                                            {index + 1}
                                                        </div>
                                                    )}
                                                    <div className="truncate">
                                                        <div className="font-medium text-gray-800 truncate">{reward.title}</div>
                                                        <div className="text-gray-500 truncate">Due: {reward.estimated_delivery}</div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2 bg-white rounded-lg border border-gray-100 text-xs text-gray-500 flex items-center justify-center">
                                                No rewards available
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50">
                                    <Link 
                                        to={`/project/${project.projectID}`} 
                                        className="inline-block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}