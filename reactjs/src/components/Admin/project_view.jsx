import { React, useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';
import { Link } from 'react-router-dom';

export default function ProjectView() {
    const { user, http, httpForm } = AuthUser();
    const [genreList, setGenreList] = useState([]);
    const project_id = window.location.pathname.split('/')[3];
    const [project, setProject] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [projectType, setProjectType] = useState('Crowdfund'); // State for project type
    const [genre, setGenre] = useState(''); // State for project genre
    const [projectStatus, setProjectStatus] = useState('pending'); // State for project status
    const [reports, setReports] = useState([]);

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
                setGenre(response.data.project[0].genre_id); // Set initial genre value
                setProjectType(response.data.project[0].type); // Set initial project type value
                setProjectStatus(response.data.project[0].status); // Set initial project status value
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
        }
        ).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="container mx-auto px-4 py-8 max-h-screen overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4 text-center text-black-600">{project.project_title}</h1>
                        <h1 className="text-3xl font-bold mb-4 text-center text-black-600">Funding Goal: Rs. {project.funding_goal}</h1>
                        <h1 className="text-3xl font-bold mb-4 text-center text-black-600">Funding Raised: Rs. {project.total_amount_raised}</h1>
                        <h5 className="text-lg font-semibold mb-4 text-center text-yellow-600">Short Description: {project.short_description} </h5>
                        <h5 className="text-lg font-semibold mb-4 text-center text-yellow-600"></h5>
                        <h5 className="text-lg font-semibold mb-4 text-center text-yellow-600">Project Deadline: {project.end_date}</h5>
                        <h5 className="text-lg font-semibold mb-4 text-center text-yellow-600">Cover Image:</h5>
                        <img src={`http://localhost:8000/${project.cover_image}`} alt="Cover Image" className="object-cover w-full h-40 rounded" />
                        <div className="bg-white p-4 rounded-lg mb-4">
                            <h2 className="text-lg font-semibold mb-2 text-yellow-600">Project Description</h2>
                            <p>{project.description}</p>
                        </div>
                        <h5 className="text-lg font-semibold mb-4 text-center text-yellow-600">Other Images:</h5>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="relative overflow-hidden rounded-lg">
                                    {project.images && project.images.length > 0 && (
                                        <img src={`http://localhost:8000/${project.images[currentImageIndex].image}`} alt="Project Image" className="object-contain w-full h-auto cursor-pointer" onClick={handleNextImage} />
                                    )}
                                    <button className="absolute top-1/2 right-1 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full bg-gray-300" onClick={handleNextImage}>&rarr;</button>
                                    <button className="absolute top-1/2 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full bg-gray-300" onClick={handlePrevImage}>&larr;</button>
                                </div>
                            </div>
                        </div>
                        {project.rewards && project.rewards.length > 0 && (
                            <div className="p-4 rounded-lg mb-4 bg-gray-200">
                                <h2 className="text-lg font-semibold mb-2 text-black-600">Rewards</h2>
                                <div className='grid grid-cols-3 gap-4'>
                                    {project.rewards.map((reward, index) => (
                                        <div key={index} className="bg-white rounded-lg p-4 shadow-md mb-4">
                                            <div className="mb-4">
                                                <p className="font-semibold">Title:</p>
                                                <p>{reward.title}</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="font-semibold">Image:</p>
                                                <img src={`http://localhost:8000/${reward.reward_image}`} alt="Reward Image" className="w-40 h-40 rounded" />
                                            </div>
                                            <div className="mb-4">
                                                <p className="font-semibold">Description:</p>
                                                <p>{reward.description}</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="font-semibold">Amount:</p>
                                                <p>{reward.amount}</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="font-semibold">Delivery:</p>
                                                <p>{reward.estimated_delivery}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Right Column */}
                <div>
                    <div className="mb-4">
                        <label htmlFor="projectType" className="block text-gray-700 text-sm font-bold mb-2">Project Type:</label>
                        <select id="projectType" name="projectType" className="w-full border border-gray-300 rounded-md px-3 py-2" value={projectType} onChange={handleProjectTypeChange}>
                            <option value="Crowdfund">Crowdfund</option>
                            <option value="Invest">Invest</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">Project Genre:</label>
                        <select id="genre" value={genre} onChange={handleGenreChange} className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required>
                            {genreList.map((genre) => (
                                <option key={genre.genreID} value={genre.genreID}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="projectStatus" className="block text-gray-700 text-sm font-bold mb-2">Project Status:</label>
                        <select id="projectStatus" name="projectStatus" className="w-full border border-gray-300 rounded-md px-3 py-2" value={projectStatus} onChange={handleProjectStatusChange}>
                            <option value="Pending">Pending</option>
                            <option value="Running">Running</option>
                            <option value="Complete">Complete</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Unauthorized">Unauthorized</option>
                        </select>
                    </div>
                    <button type="submit" onClick={updateProject} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-center text-black-600">Project Creator Details</h2>
                        <Link to={`/admin/users/edit/${project.creator_id}`} className="text-blue-500">
                            <p>Name: {project.creator}</p>
                            <p>Email: {project.creator_email}</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-2 rounded-lg mb-4 bg-gray-200">
                <h2 className="text-3xl font-bold mb-4 text-center text-black-600">Project Reports</h2>
                <div className="grid grid-cols-2 gap-4">
                    {reports.length > 0 ? (
                        reports.map((report, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2 text-yellow-600">Reported By:<br />
                                    UserID: {report.userID}<br />
                                    User: {report.user}</h3>
                                <p>{report.report}</p>
                                <p>Reported On: {report.created_at}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reports available</p>
                    )}
                </div>

            </div>
        </div>
    )
}
