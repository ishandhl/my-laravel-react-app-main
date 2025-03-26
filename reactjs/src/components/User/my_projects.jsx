import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function User_Projects() {
    const { user, http } = AuthUser();
    const [projects, setProjects] = useState([]);
    const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);

    useEffect(() => {
        http.get(`/user/my_projects/${user.id}`).then((response) => {
            console.log(response.data.projects);
            setProjects(response.data.projects);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleNewProjectClick = () => {
        if (user.email_verified_at !== null) {
            window.location.href = '/create_project';
        } else {
            // Show verify email modal
            setShowVerifyEmailModal(true);
        }
    };

    return (
        <div className="bg-yellow-50 flex items-center justify-center min-h-screen py-20">
            <div className="w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 backdrop-blur-sm bg-white/40">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">My Projects</h2>
                    <button onClick={handleNewProjectClick} className="flex items-center bg-yellow-400 border border-fuchsia-00 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                        <svg className="w-4 h-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span>New Project</span>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.projectID} className="bg-white rounded-lg shadow-md border border-gray-200">
                                <img className="w-full h-3/4 object-cover" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                <div className="p-3">
                                    <h2 className="text-xl font-semibold mb-2">{project.project_title}</h2>
                                    <p className="text-gray-700 mb-4">{project.short_description}</p>
                                    <Link to={`/project/${project.projectID}/edit`} className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                                        Edit Project
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-700">No projects available</div>
                    )}
                </div>
            </div>
            {showVerifyEmailModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Verify Your Email</h2>
                        <p className="mb-4">Please verify your email to start creating projects.</p>
                        <button onClick={() => setShowVerifyEmailModal(false)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
