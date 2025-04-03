import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";

export default function ProjectsAll() {
    const { http } = AuthUser();
    const [projects, setProjects] = useState([]);
    const [projectTypeFilter, setProjectTypeFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    
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

    // Function to calculate days remaining
    const daysRemaining = (endDate) => {
        const end = new Date(endDate);
        const today = new Date();
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };
    
    // Function to calculate funding percentage
    const calculateFundingPercentage = (amountRaised, fundingGoal) => {
        const percentage = (parseFloat(amountRaised) / parseFloat(fundingGoal)) * 100;
        return Math.min(percentage, 100).toFixed(2); // Cap at 100% and format to 2 decimal places
    };

    // Filter and sort projects
    const getFilteredAndSortedProjects = () => {
        // First apply type filter
        let filtered = projectTypeFilter
            ? projects.filter(project => project.type === projectTypeFilter)
            : projects;
        
        // Then apply search filter
        if (searchTerm) {
            filtered = filtered.filter(project => 
                project.project_title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Then sort
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'endingSoon':
                    return new Date(a.end_date) - new Date(b.end_date);
                case 'goalHighToLow':
                    return parseFloat(b.funding_goal) - parseFloat(a.funding_goal);
                case 'goalLowToHigh':
                    return parseFloat(a.funding_goal) - parseFloat(b.funding_goal);
                case 'alphabetical':
                    return a.project_title.localeCompare(b.project_title);
                default:
                    return 0;
            }
        });
    };

    const filteredAndSortedProjects = getFilteredAndSortedProjects();

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-20 px-4">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Discover Projects</h2>
                    
                    {/* Search and filter controls */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Search input */}
                            <div className="flex-grow">
                                <label htmlFor="search" className="sr-only">Search projects</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Search projects by name..."
                                        type="search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            {/* Type filter */}
                            <div className="w-full md:w-48">
                                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                                <select
                                    id="projectType"
                                    name="projectType"
                                    className="block w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={projectTypeFilter}
                                    onChange={(e) => setProjectTypeFilter(e.target.value)}
                                >
                                    <option value="">All Projects</option>
                                    <option value="Crowdfund">Crowdfund</option>
                                    <option value="Invest">Invest</option>
                                </select>
                            </div>
                            
                            {/* Sort selector */}
                            <div className="w-full md:w-48">
                                <label htmlFor="sortProjects" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                <select
                                    id="sortProjects"
                                    name="sortProjects"
                                    className="block w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest</option>
                                    <option value="endingSoon">Ending Soon</option>
                                    <option value="goalHighToLow">Goal: High to Low</option>
                                    <option value="goalLowToHigh">Goal: Low to High</option>
                                    <option value="alphabetical">Alphabetical</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredAndSortedProjects.length} {filteredAndSortedProjects.length === 1 ? 'project' : 'projects'}
                    </p>
                </div>

                {
                    filteredAndSortedProjects.length > 0 ? (
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                            {filteredAndSortedProjects.map((project) => {
                                // Calculate funding percentage for this project
                                const fundingPercentage = calculateFundingPercentage(
                                    project.total_amount_raised || 0, 
                                    project.funding_goal
                                );
                                
                                return (
                                    <div key={project.projectID} className="rounded-xl shadow-lg overflow-hidden bg-white flex flex-col h-full transform transition duration-300 hover:shadow-xl hover:-translate-y-1"> 
                                        <Link to={`/project/${project.projectID}`} className="block relative">
                                            <img 
                                                className="w-full h-56 object-cover" 
                                                src={`http://localhost:8000/${project.cover_image}`} 
                                                alt="Project Cover" 
                                            />
                                            <div className="absolute top-4 right-4 bg-white text-xs font-bold uppercase py-1 px-2 rounded-full shadow-md">
                                                {project.type}
                                            </div>
                                        </Link>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div>
                                                <h5 className="mb-3 text-xl font-bold leading-tight text-gray-800">
                                                    {project.project_title}
                                                </h5>
                                            </div>
                                            <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                                                {project.short_description}
                                            </p>
                                            
                                            {/* Dynamic Progress bar */}
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 mt-auto">
                                                <div 
                                                    className="bg-blue-500 h-2.5 rounded-full" 
                                                    style={{ width: `${fundingPercentage}%` }}
                                                ></div>
                                            </div>
                                            
                                            <div className="flex justify-between text-sm text-gray-600 mb-4">
                                                <div>
                                                    <span className="font-bold text-gray-800">Rs. {project.total_amount_raised || 0}</span>
                                                    <p className="text-xs">Raised of Rs. {project.funding_goal}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-gray-800">{daysRemaining(project.end_date)}</span>
                                                    <p className="text-xs">Days Left</p>
                                                </div>
                                            </div>
                                            
                                            <div className="border-t pt-4 mt-auto">
                                                <Link 
                                                    to={`/project/${project.projectID}`} 
                                                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                >
                                                    View Project
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-8">
                            <svg className="h-16 w-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-lg mb-2">No projects found</p>
                            <p className="text-gray-400 text-center">Try adjusting your search or filter criteria</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}