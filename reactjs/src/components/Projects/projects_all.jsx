import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";

export default function ProjectsAll() {
    const { http } = AuthUser();
    const [projects, setProjects] = useState([]);
    const [projectTypeFilter, setProjectTypeFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 9;

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

    // Logic for pagination
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-yellow-50">
            <div className="container mx-auto py-20">

                <div className="ml-2 ">
                    <select
                        id="projectType"
                        name="projectType"
                        className="ml-1 block w-4.5 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={projectTypeFilter}
                        onChange={(e) => setProjectTypeFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Crowdfund">Crowdfund</option>
                        <option value="Invest">Invest</option>
                    </select>
                </div>

                <h2 className="text-2xl font-bold mb-4">Projects</h2>
                {
                    currentProjects.length > 0 ? (
                        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                            {currentProjects.map((project) => (
                                <>
                                    <div key={project.projectID} className="rounded-lg shadow-md overflow-hidden bg-white w-full mb-4"> {/* Adjusted height */}
                                        <Link to={`/project/${project.projectID}`} className="block">
                                            <img className="w-full h-3/6" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                        </Link>
                                        <div className="p-2">
                                            <div className="">
                                                <h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                                                    {project.project_title}
                                                </h5>
                                            </div>
                                            <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-200">
                                                {project.short_description}
                                            </p>
                                            <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-200">
                                                Ending On : {project.end_date.split('T')[0]}
                                            </p>
                                            <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-200">
                                                Goal: Rs. {project.funding_goal}
                                            </p>
                                            <Link to={`/project/${project.projectID}`} className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded focus:outline-none focus:ring focus:ring-blue-500">View Project</Link>
                                        </div>
                                    </div>
                                    {/* <div key={project.projectID} className="bg-white rounded-md shadow-md p-4">
                                        <img src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" className="w-full h-40 object-cover rounded-t-md" />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold mb-2">{project.project_title}</h3>
                                            <p className="text-gray-700">{project.short_description}</p>
                                            <Link to={`/project/${project.projectID}`} className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500">View Project</Link>
                                        </div>
                                    </div> */}
                                </>
                            ))}
                        </div>
                    ) : (
                        <p>No projects available.</p>
                    )
                }

                {/* Pagination */}
                {filteredProjects.length > projectsPerPage && (
                    <nav className="mt-4" aria-label="Pagination">
                        <ul className="flex justify-center">
                            {Array(Math.ceil(filteredProjects.length / projectsPerPage)).fill().map((_, index) => (
                                <li key={index} className="cursor-pointer mx-1">
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`${currentPage === index + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-700'
                                            } px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}
