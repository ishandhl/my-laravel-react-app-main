import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function User_Projects() {
    const { user, http } = AuthUser();
    const [projects, setProjects] = useState([]);
    const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);

    useEffect(() => {
        http.get(`/user/my_projects/${user.id}`).then((response) => {
            setProjects(response.data.projects);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleNewProjectClick = () => {
        if (user.email_verified_at !== null) {
            window.location.href = '/create_project';
        } else {
            setShowVerifyEmailModal(true);
        }
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
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.projectID} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                <img className="w-full h-48 object-cover" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2 truncate">{project.project_title}</h2>
                                    <p className="text-gray-700 mb-4 line-clamp-2">{project.short_description}</p>
                                    <Link to={`/project/${project.projectID}/edit`} className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all">
                                        Edit Project
                                    </Link>
                                </div>
                            </div>
                        ))
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
