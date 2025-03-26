import React, { useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Project_Edit_View() {
    const { http, httpForm } = AuthUser();
    const project_id = window.location.pathname.split('/')[2];
    const [project, setProject] = useState({});
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedShortDescription, setEditedShortDescription] = useState('');
    const [editedImages, setEditedImages] = useState([]);
    const [editedCoverImage, setEditedCoverImage] = useState(null);
    const [editedImageFiles, setEditedImageFiles] = useState([]);
    const [originalCoverImage, setOriginalCoverImage] = useState('');
    const [rewards, setRewards] = useState([]);
    const [newRewardTitle, setNewRewardTitle] = useState('');
    const [newRewardDescription, setNewRewardDescription] = useState('');
    const [newRewardAmount, setNewRewardAmount] = useState('');
    const [newRewardDeliveryDate, setNewRewardDeliveryDate] = useState('');
    const [newRewardImage, setNewRewardImage] = useState('');
    const [showAddRewardModal, setShowAddRewardModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [newUpdates, setNewUpdates] = useState(false);
    const [updates, setUpdates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        // Fetch project details and updates...

        // Example of a successful response toast notification
        toast.success('Project details fetched successfully!');

        // Example of an error response toast notification
        toast.error('Error fetching project details. Please try again later.');

    }, []);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await http.get(`/user/project/${project_id}`);
                const projectData = response.data.project[0];
                setProject(projectData);
                setEditedTitle(projectData.project_title);
                setEditedDescription(projectData.description);
                setEditedShortDescription(projectData.short_description);
                setEditedImages([...projectData.images]);
                setRewards([...projectData.rewards])
                if (projectData.cover_image) {
                    const coverImageParts = projectData.cover_image.split('/');
                    setOriginalCoverImage(coverImageParts[1]);
                }
                toast.success('Project details fetched successfully!');
            } catch (error) {
                console.error(error);
                toast.error('Error fetching project details. Please try again later.');
            }
        };

        const fetchProjectUpdates = async () => {
            try {
                const response = await http.get(`/user/project/${project_id}/updates`);
                setUpdates(response.data.project_updates);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProjectDetails();
        fetchProjectUpdates();
    }, []);


    const handleSave = (e) => {
        e.preventDefault();

        handleSaveDetails();
        handleSaveImages();

        toast.success('Project details saved successfully!');
        toast.error('Error saving project details. Please try again later.');

        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const handleSaveDetails = () => {
        const formData = new FormData();
        formData.append('project_title', editedTitle);
        formData.append('short_description', editedShortDescription);
        formData.append('description', editedDescription);

        http.put(`/user/project/${project_id}/details`, formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error updating project details:', error);
            });

    };

    const handleNewUpdateCreate = () => {
        http.post('/user/project/updates', { project_id, newUpdates })
            .then((response) => {
                setShowUpdateModal(false);
                toast.success('Update created successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 3500);
            })
            .catch((error) => {
                toast.error('Error creating new update. Please try again later.');
            });
    }

    const handleSaveImages = () => {
        const formData = new FormData();

        // Append _method field to simulate PUT request
        formData.append('_method', 'PUT');

        // Append cover image if changed
        if (editedCoverImage && editedCoverImage !== originalCoverImage) {
            formData.append('cover_image', editedCoverImage, editedCoverImage.name);
        }

        // Append other images
        editedImageFiles.forEach((imageFile, index) => {
            if (editedImageFiles[index] !== editedImages[index]) {
                formData.append(`otherImages[${index}]`, imageFile, imageFile.name);
            }
        });

        // Use the POST method instead
        httpForm.post(`/user/project/${project_id}/images`, formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error updating project images:', error);
            });
    };

    const handleChangeCoverImage = (e) => {
        // Update editedCoverImage only when the cover image is changed
        setEditedCoverImage(URL.createObjectURL(e.target.files[0]));
        setEditedCoverImage(e.target.files[0]);
    };

    const handleDeleteImage = (index, imageId) => {
        // Make an API call to delete the image

        http.delete(`/user/project/${project_id}/image/${imageId}`)
            .then((response) => {
                // Remove the deleted image from state
                const updatedImages = [...editedImages];
                updatedImages.splice(index, 1);
                setEditedImages(updatedImages);
                const updatedImageFiles = [...editedImageFiles];
                updatedImageFiles.splice(index, 1);
                setEditedImageFiles(updatedImageFiles);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleChangeImage = (index, e) => {
        const updatedImageFiles = [...editedImageFiles];
        updatedImageFiles[index] = e.target.files[0];
        setEditedImageFiles(updatedImageFiles);
    };

    const handleCancel = () => {
        // Reset edited title, description, and images to original
        setEditedTitle(project.project_title);
        setEditedDescription(project.description);
        setEditedShortDescription(project.short_description);
        setEditedImages([...project.images]);
        setEditedCoverImage(null);
        setEditedImageFiles([]);
    };

    const handleChangeTitle = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleChangeShortDescription = (e) => {
        setEditedShortDescription(e.target.value);
    };

    // Function to handle reward deletion
    const handleDeleteReward = (index, rewardID) => {
        http.delete(`/user/project/${project_id}/reward/delete`, { data: { rewardID } })
            .then((response) => {
                // If the deletion is successful, update the rewards state by removing the deleted reward
                const updatedRewards = [...rewards];
                updatedRewards.splice(index, 1);
                setRewards(updatedRewards);
            })
            .catch((error) => {
                console.error('Error deleting reward:', error);
            });
    };

    // Function to handle adding a new reward
    const handleAddReward = () => {
        // Show the add reward modal
        setShowAddRewardModal(true);
    };

    // Function to handle closing the add reward modal
    const handleCloseAddRewardModal = () => {
        // Close the add reward modal
        setShowAddRewardModal(false);
    };

    const addUpdates = () => {
        setShowUpdateModal(true);
    }

    // Function to handle saving a new reward
    const handleSaveNewReward = () => {
        const formData = new FormData();
        formData.append('title', newRewardTitle);
        formData.append('description', newRewardDescription);
        formData.append('amount', newRewardAmount);
        formData.append('estimated_delivery', newRewardDeliveryDate);
        formData.append('projectID', project_id);
        formData.append('reward_image', newRewardImage);

        // Make an API call to add the new reward
        httpForm.post(`/user/project/${project_id}/reward/add`, formData)
            .then((response) => {
                // If the addition is successful, update the rewards state with the new reward
                const newReward = response.data.reward;
                // Reset the new reward fields
                setNewRewardTitle('');
                setNewRewardDescription('');
                setNewRewardAmount('');
                setNewRewardDeliveryDate('');
                setNewRewardImage('');
                // Close the add reward modal
                setShowAddRewardModal(false);
                // Refresh the page after a few seconds
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                console.error('Error adding new reward:', error);
            });
    };

    const handleUpdateDelete = async (updateID) => {
        try {
            await http.delete(`/user/project/${project_id}/update/${updateID}`);
            // If the deletion is successful, update the updates state by removing the deleted update
            const updatedUpdates = updates.filter((update) => update.updateID !== updateID);
            setUpdates(updatedUpdates);
            toast.success('Update deleted successfully');
        } catch (error) {
            toast.error('Error deleting update. Please try again later.');
        }
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = updates.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Paginate backers with products
    let paginatedBackersWithProducts = [];
    if (project.backers && project.backers.length > 0) {
        // If there are backers for the project
        const backersWithProducts = project.backers.map(backer => {
            // For each backer, create an object containing their details and the project details
            return {
                backer: backer,
                project: project,
                status: 'TBD' // Set a fixed status
            };
        });

        // Paginate the array after every 5 items
        for (let i = 0; i < backersWithProducts.length; i += 5) {
            paginatedBackersWithProducts.push(backersWithProducts.slice(i, i + 5));
        }
    }

    const handleMarkCompletion = () => {
        // Send a request to mark the project as complete
        http.put(`/user/project/${project_id}/complete`)
            .then((response) => {
                toast.success('Project marked as complete!');
            })
            .catch((error) => {
                toast.error('Error marking project as complete. Please try again later.');
            });
    };

    return (
        <div className='bg-yellow-50 '>
            <div className="grid container mx-auto">
                <div className="grid grid-cols-2 gap-3 bg-yellow-50 p-6 rounded-lg mb-4">
                    {/* Left Column */}
                    <div className="col-span-1 p-3 border rounded-lg bg-white">
                        <p className="text-gray-700 text-xl font-bold mb-4">Project Details</p>
                        {/* Project Title */}
                        <div className="mb-4">
                            <label htmlFor="editedTitle" className="block text-start text-gray-700 text-sm font-bold mb-2">Project Title:</label>
                            <input
                                type="text"
                                id="editedTitle"
                                value={editedTitle}
                                onChange={handleChangeTitle}
                                className="bg-white p-2 mb-2 rounded w-full resize-none text-sm border border-gray-300" required
                            />
                        </div>
                        {/* Project Description */}
                        <div className="mb-4">
                            <label htmlFor="editedDescription" className="block text-start text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <textarea
                                id="editedDescription"
                                value={editedDescription}
                                onChange={handleChangeDescription}
                                className="bg-white p-2 rounded mb-2 w-full resize-none text-sm border border-gray-300"
                            />
                        </div>
                        {/* Short Description */}
                        <div className="mb-4">
                            <label htmlFor="editedShortDescription" className="block text-start text-gray-700 text-sm font-bold mb-2">Short Description:</label>
                            <textarea
                                id="editedShortDescription"
                                value={editedShortDescription}
                                onChange={handleChangeShortDescription}
                                className="bg-white p-2 rounded mb-2 w-full resize-none text-sm border border-gray-300"
                            />
                        </div>
                        {/* Project Type and Cover Image */}
                        <div className="grid gap-3 grid-cols-2 items-center gap-y-1">
                            
                            <div className='border rounded-lg p-3'>
                                <p className="text-gray-700 font-bold mb-2">Cover Image:</p>
                                <div className="relative">
                                    <img
                                        src={`http://localhost:8000/${project.cover_image}`}
                                        alt="Cover Image"
                                        className="object-cover w-full h-40 rounded"
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) => handleChangeCoverImage(e)}
                                        className="absolute top-0 left-0 opacity-0 h-full w-full cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className='border rounded-lg p-3 h-full'>
                                <p className="text-start text-gray-700 font-bold mb-2">Project Type: {project.type}</p>
                                <p className="text-start text-gray-700 font-bold mb-2">Project Status: {project.status}</p>
                                <p className='text-start text-gray-700 font-bold mb-2'>Funding Goal: Rs. {project.funding_goal}</p>
                                <p className='text-start text-gray-700 font-bold mb-2'>Funding Raised: Rs. {project.total_amount_raised}</p>
                                <p className='text-start text-gray-700 font-bold mb-2'>Total Investors: {project.total_transactions} </p>
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="col-span-1">
                        <div className="bg-white p-5 rounded-lg border ">
                            {/* Image List */}
                            <h2 className="block text-gray-700 text-xl font-bold mb-2">Images:</h2>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {editedImages.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={`http://localhost:8000/${image.image}`}
                                            alt="Project Image"
                                            className="object-cover w-full h-40 rounded"
                                        />
                                        <input
                                            type="file"
                                            onChange={(e) => handleChangeImage(index, e)}
                                            className="absolute top-0 left-0 opacity-0 h-full w-full cursor-pointer"
                                        />
                                        <button
                                            onClick={() => handleDeleteImage(index, image.id)}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {/* Rewards section */}
                            {project.type === 'Invest' && (
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold mb-2"> Rewards:</h2>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        {rewards.map((reward, index) => (
                                            <div key={index} className="relative">
                                                <div className="p-4 border rounded">
                                                    <h3 className="text-lg font-semibold mb-2">{reward.title}</h3>
                                                    <img src={`http://localhost:8000/${reward.reward_image}`} alt="Reward Image" className="object-cover w-full h-24 rounded mb-2" />
                                                    <p>{reward.description}</p>
                                                    <p>Minimum Amount: {reward.amount}</p>
                                                    <p>Estimated Delivery: {reward.estimated_delivery}</p>
                                                </div>
                                                <button onClick={() => handleDeleteReward(index, reward.rewardID)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full">X</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center">
                                        <button onClick={handleAddReward} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                            Add Reward
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Buttons */}
                            <div className="flex justify-end mt-4">
                                <button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded mr-1 text-sm">
                                    Cancel
                                </button>
                                <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm">
                                    Save
                                </button>
                            </div>
                        </div>
                        <br/>
                        <div className="flex justify-end">
                        <button onClick={handleMarkCompletion} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm">
                            Mark Completion of Project
                        </button>
                    </div>
                    </div>
                </div>
                <hr />
                {/* Progress and Discussions */}
                <div className="bg-white border rounded-lg mb-4 p-2 mt-5 flex gap-3 justify-between items-center">
                    <h2 className="text-lg font-semibold mb-4 ">Progress and Discussions</h2>
                        <button onClick={addUpdates} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Add Updates
                        </button>
                </div>
                <div className=" p-4 flex gap-3">
                    {currentItems.map((update, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
                            <p className="text-gray-700">{update.content}</p>
                            <p className='text-gray-700'>Created At: {update.created_at.split('T')[0]}</p>
                            <button
                                onClick={() => handleUpdateDelete(update.updateID)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    {itemsPerPage < updates.length && (
                        <div>
                            {Array.from({ length: Math.ceil(updates.length / itemsPerPage) }, (_, i) => (
                                <button key={i} onClick={() => paginate(i + 1)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-1">
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {project.type === 'Invest' && (
                    <div className="bg-white rounded-lg mb-4 p-2">
                        <h2 className="text-lg font-semibold mb-4 text-yellow-700">Backers and Items</h2>
                        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg">
                            {paginatedBackersWithProducts.map((backersGroup, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg mb-4">
                                    <div className="grid grid-cols-1 gap-6">
                                        {backersGroup.map((backerData, innerIndex) => (
                                            <div key={innerIndex} className="bg-yellow-50 p-4 rounded-lg shadow-md relative">
                                                <p className="text-gray-700">Backer Name: {backerData.backer.name}</p>
                                                <p className="text-gray-700">Backer Email: {backerData.backer.email}</p>
                                                <p className="text-gray-700">Product Status: {backerData.status}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add Reward Modal */}
                {
                    showAddRewardModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                            <div className="bg-white p-6 rounded-lg">
                                <h2 className="text-xl text-start font-bold mb-4">Add Reward</h2>
                                <label htmlFor="newRewardTitle" className="block text-start text-gray-700 text-sm font-bold mb-2">Title:</label>
                                <input
                                    type="text"
                                    id="newRewardTitle"
                                    value={newRewardTitle}
                                    onChange={(e) => setNewRewardTitle(e.target.value)}
                                    className=" p-2 rounded mb-4 w-full resize-none"
                                />
                                <label htmlFor="newRewardDescription" className="block text-start text-gray-700 text-sm font-bold mb-2">Description:</label>
                                <textarea
                                    id="newRewardDescription"
                                    value={newRewardDescription}
                                    onChange={(e) => setNewRewardDescription(e.target.value)}
                                    className=" p-2 rounded mb-4 w-full resize-none"
                                />
                                <label htmlFor="newRewardAmount" className="block text-start text-gray-700 text-sm font-bold mb-2">Amount:</label>
                                <input
                                    type="number"
                                    id="newRewardAmount"
                                    value={newRewardAmount}
                                    onChange={(e) => setNewRewardAmount(e.target.value)}
                                    className=" p-2 rounded mb-4 w-full resize-none"
                                />
                                <label htmlFor="newRewardDeliveryDate" className="block text-start text-gray-700 text-sm font-bold mb-2">Estimated Delivery Date:</label>
                                <input
                                    type="date"
                                    id="newRewardDeliveryDate"
                                    value={newRewardDeliveryDate}
                                    onChange={(e) => setNewRewardDeliveryDate(e.target.value)}
                                    className=" p-2 rounded mb-4 w-full resize-none"
                                />
                                <label htmlFor="newRewardImage" className="block text-start text-gray-700 text-sm font-bold mb-2">Image:</label>
                                <input
                                    type="file"
                                    id="newRewardImage"
                                    onChange={(e) => setNewRewardImage(e.target.files[0])}
                                    className=" rounded mb-4 w-full resize-none border"
                                />
                                <div className="flex justify-end">
                                    <button onClick={handleCloseAddRewardModal} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 w-full">
                                        Cancel
                                    </button>
                                    <button onClick={handleSaveNewReward} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* Add Update Modal */}
                {
                    showUpdateModal &&
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">New Updates</h3>
                                    <div className="mb-4">
                                        <label htmlFor="updates" className="block text-gray-700">Updates</label>
                                        <textarea
                                            id="updates"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            rows="4"
                                            placeholder="Enter your update here..."
                                            onChange={(e) => setNewUpdates(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        onClick={handleNewUpdateCreate}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowUpdateModal(false)}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div >
        </div>
    );
}
