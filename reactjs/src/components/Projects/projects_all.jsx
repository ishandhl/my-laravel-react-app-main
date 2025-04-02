import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";

export default function ProjectsAll() {
    const { http } = AuthUser();
    const [projects, setProjects] = useState([]);
    const [projectTypeFilter, setProjectTypeFilter] = useState('');

    const fetchProjects = () => {
        let url = '/home';
        if (projectTypeFilter) {
            url += `?type=${projectTypeFilter}`;
        }
        http.get(url)
            .then((response) => {
                setProjects(response.data.projects);
                console.log(response.data.projects);
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
            });
    };

    useEffect(() => {
        fetchProjects();
    }, [projectTypeFilter]); 

    const filteredProjects = projectTypeFilter
        ? projects.filter(project => project.type === projectTypeFilter)
        : projects;

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-20">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Projects</h2>
                    <div>
                        <select
                            id="projectType"
                            name="projectType"
                            className="block w-40 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={projectTypeFilter}
                            onChange={(e) => setProjectTypeFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Crowdfund">Crowdfund</option>
                            <option value="Invest">Invest</option>
                        </select>
                    </div>
                </div>

                {
                    filteredProjects.length > 0 ? (
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {filteredProjects.map((project) => (
                                <div key={project.projectID} className="rounded-lg shadow-md overflow-hidden bg-white flex flex-col h-full"> 
                                    <Link to={`/project/${project.projectID}`} className="block">
                                        <img className="w-full h-48 object-cover" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                    </Link>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <div>
                                            <h5 className="mb-3 text-lg font-bold leading-tight text-neutral-800 dark:text-neutral-50 text-center">
                                                {project.project_title}
                                            </h5>
                                        </div>
                                        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-200">
                                            {project.short_description}
                                        </p>
                                        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-200 ">
                                            Ending On: {project.end_date.split('T')[0]}
                                        </p>
                                        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-200 ">
                                            Goal: Rs. {project.funding_goal}
                                        </p>
                                        <div className="mt-auto">
                                            <Link 
                                                to={`/project/${project.projectID}`} 
                                                className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                            >
                                                View Project
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No projects available.</p>
                    )
                }
            </div>
        </div>
    );
}