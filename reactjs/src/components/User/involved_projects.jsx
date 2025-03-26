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
        <div className="bg-yellow-50 pt-2 flex items-center justify-center min-h-screen">
            <div className="w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm border-violet-200 border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Involved Projects</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.projectID} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                                <img className="w-full h-48 object-cover" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{project.project_title}</h2>
                                    <p className="text-gray-700 mb-4">{project.short_description}</p>
                                    <Link to={`/project/${project.projectID}`} className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                                        View Project
                                    </Link>
                                </div>
                                {project.rewards && project.rewards.length > 0 && (
                                    <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                                        <h6 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">Rewards To Receive</h6>
                                        <ul>
                                            {project.rewards.map((reward, index) => (
                                                <li key={index} className="flex items-center mb-2 text-sm text-gray-700 dark:text-gray-400">
                                                    {reward.reward_image && <img src={`http://localhost:8000/${reward.reward_image}`} className="w-8 h-8 mr-2 rounded-full" alt="Reward Image" />}
                                                    <span className="font-bold">Reward {index + 1}:</span> {reward.title}
                                                    <span className="ms-2">Estimated Delivery: ({reward.estimated_delivery})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-700">No projects available</div>
                    )}

                </div>
            </div>
        </div>
    );
}
