import React, { useEffect, useState } from "react";
import AuthUser from "../Authentication/AuthUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectChatbot from '../Projects/ProjectChatbot';


export default function Project_Edit_View() {
  const { http, httpForm } = AuthUser();
  const project_id = window.location.pathname.split("/")[2];
  const [project, setProject] = useState({});
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedShortDescription, setEditedShortDescription] = useState("");
  const [editedImages, setEditedImages] = useState([]);
  const [editedCoverImage, setEditedCoverImage] = useState(null);
  const [editedImageFiles, setEditedImageFiles] = useState([]);
  const [originalCoverImage, setOriginalCoverImage] = useState("");
  const [rewards, setRewards] = useState([]);
  const [newRewardTitle, setNewRewardTitle] = useState("");
  const [newRewardDescription, setNewRewardDescription] = useState("");
  const [newRewardAmount, setNewRewardAmount] = useState("");
  const [newRewardDeliveryDate, setNewRewardDeliveryDate] = useState("");
  const [newRewardImage, setNewRewardImage] = useState("");
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newUpdates, setNewUpdates] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
        setRewards([...projectData.rewards]);
        if (projectData.cover_image) {
          const coverImageParts = projectData.cover_image.split("/");
          setOriginalCoverImage(coverImageParts[1]);
        }
        toast.success("Project details fetched successfully!");
      } catch (error) {
        console.error(error);
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

    toast.success("Project details saved successfully!");

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleSaveDetails = () => {
    const formData = new FormData();
    formData.append("project_title", editedTitle);
    formData.append("short_description", editedShortDescription);
    formData.append("description", editedDescription);

    http
      .put(`/user/project/${project_id}/details`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating project details:", error);
      });
  };

  const handleNewUpdateCreate = () => {
    http
      .post("/user/project/updates", { project_id, newUpdates })
      .then((response) => {
        setShowUpdateModal(false);
        toast.success("Update created successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      })
      .catch((error) => {
        toast.error("Error creating new update. Please try again later.");
      });
  };

  const handleSaveImages = () => {
    const formData = new FormData();

    // Append _method field to simulate PUT request
    formData.append("_method", "PUT");

    // Append cover image if changed
    if (editedCoverImage && editedCoverImage !== originalCoverImage) {
      formData.append("cover_image", editedCoverImage, editedCoverImage.name);
    }

    // Append other images
    editedImageFiles.forEach((imageFile, index) => {
      if (editedImageFiles[index] !== editedImages[index]) {
        formData.append(`otherImages[${index}]`, imageFile, imageFile.name);
      }
    });

    // Use the POST method instead
    httpForm
      .post(`/user/project/${project_id}/images`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating project images:", error);
      });
  };

  const handleChangeCoverImage = (e) => {
    // Update editedCoverImage only when the cover image is changed
    setEditedCoverImage(URL.createObjectURL(e.target.files[0]));
    setEditedCoverImage(e.target.files[0]);
  };

  const handleDeleteImage = (index, imageId) => {
    // Make an API call to delete the image

    http
      .delete(`/user/project/${project_id}/image/${imageId}`)
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
    http
      .delete(`/user/project/${project_id}/reward/delete`, {
        data: { rewardID },
      })
      .then((response) => {
        // If the deletion is successful, update the rewards state by removing the deleted reward
        const updatedRewards = [...rewards];
        updatedRewards.splice(index, 1);
        setRewards(updatedRewards);
      })
      .catch((error) => {
        console.error("Error deleting reward:", error);
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
  };

  // Function to handle saving a new reward
  const handleSaveNewReward = () => {
    const formData = new FormData();
    formData.append("title", newRewardTitle);
    formData.append("description", newRewardDescription);
    formData.append("minimumamount", newRewardAmount);
    formData.append("estimated_delivery", newRewardDeliveryDate);
    formData.append("projectID", project_id);
    formData.append("reward_image", newRewardImage);

    // Make an API call to add the new reward
    httpForm
      .post(`/user/project/${project_id}/reward/add`, formData)
      .then((response) => {
        // If the addition is successful, update the rewards state with the new reward
        const newReward = response.data.reward;
        // Reset the new reward fields
        setNewRewardTitle("");
        setNewRewardDescription("");
        setNewRewardAmount("");
        setNewRewardDeliveryDate("");
        setNewRewardImage("");
        // Close the add reward modal
        setShowAddRewardModal(false);
        // Refresh the page after a few seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding new reward:", error);
      });
  };

  const handleUpdateDelete = async (updateID) => {
    try {
      await http.delete(`/user/project/${project_id}/update/${updateID}`);
      // If the deletion is successful, update the updates state by removing the deleted update
      const updatedUpdates = updates.filter(
        (update) => update.updateID !== updateID
      );
      setUpdates(updatedUpdates);
      toast.success("Update deleted successfully");
    } catch (error) {
      toast.error("Error deleting update. Please try again later.");
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
    const backersWithProducts = project.backers.map((backer) => {
      // For each backer, create an object containing their details and the project details
      return {
        backer: backer,
        project: project,
        status: "TBD", // Set a fixed status
      };
    });

    // Paginate the array after every 5 items
    for (let i = 0; i < backersWithProducts.length; i += 5) {
      paginatedBackersWithProducts.push(backersWithProducts.slice(i, i + 5));
    }
  }

  const handleMarkCompletion = () => {
    // Send a request to mark the project as complete
    http
      .put(`/user/project/${project_id}/complete`)
      .then((response) => {
        toast.success("Project marked as complete!");
      })
      .catch((error) => {
        toast.error(
          "Error marking project as complete. Please try again later."
        );
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
          <div className="bg-blue-500 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Edit Project</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                  Project Details
                </h2>

                {/* Project Title */}
                <div className="mb-4">
                  <label
                    htmlFor="editedTitle"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="editedTitle"
                    value={editedTitle}
                    onChange={handleChangeTitle}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                {/* Short Description */}
                <div className="mb-4">
                  <label
                    htmlFor="editedShortDescription"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Short Description
                  </label>
                  <textarea
                    id="editedShortDescription"
                    value={editedShortDescription}
                    onChange={handleChangeShortDescription}
                    rows="2"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                {/* Project Description */}
                <div className="mb-4">
                  <label
                    htmlFor="editedDescription"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Full Description
                  </label>
                  <textarea
                    id="editedDescription"
                    value={editedDescription}
                    onChange={handleChangeDescription}
                    rows="5"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                {/* Project Info Cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-medium text-blue-800">Project Type</p>
                    <p className="text-lg">{project.type}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-medium text-green-800">Status</p>
                    <p className="text-lg">{project.status}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-medium text-purple-800">Goal</p>
                    <p className="text-lg">Rs. {project.funding_goal}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="font-medium text-amber-800">Raised</p>
                    <p className="text-lg">Rs. {project.total_amount_raised}</p>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Cover Image
                </h2>
                <div className="relative overflow-hidden rounded-lg bg-gray-100 group">
                  {project.cover_image && (
                    <img
                      src={`http://localhost:8000/${project.cover_image}`}
                      alt="Cover Image"
                      className="w-full h-56 object-cover group-hover:opacity-75 transition-opacity"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md cursor-pointer transition-all">
                      Change Image
                      <input
                        type="file"
                        onChange={(e) => handleChangeCoverImage(e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Click on the image to upload a new cover photo
                </p>
              </div>

              {/* Mark Completion Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleMarkCompletion}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
                >
                  Mark Project as Complete
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Project Images */}
              <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {editedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={`http://localhost:8000/${image.image}`}
                        alt="Project Image"
                        className="w-full h-32 object-cover rounded-lg group-hover:opacity-75 transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <div className="flex space-x-2">
                          <label className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                              />
                            </svg>
                            <input
                              type="file"
                              onChange={(e) => handleChangeImage(index, e)}
                              className="hidden"
                            />
                          </label>
                          <button
                            onClick={() => handleDeleteImage(index, image.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards Section */}
              {project.type === "Invest" && (
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Rewards</h2>
                    <button
                      onClick={handleAddReward}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Reward
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.map((reward, index) => (
                      <div
                        key={index}
                        className="relative group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() =>
                              handleDeleteReward(index, reward.rewardID)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="h-32 bg-gray-100">
                          <img
                            src={`http://localhost:8000/${reward.reward_image}`}
                            alt="Reward"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1">
                            {reward.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {reward.description}
                          </p>
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-blue-600">
                              Rs. {reward.amount}
                            </span>
                            <span className="text-gray-500">
                              Delivery: {reward.estimated_delivery}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save/Cancel Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-2 rounded-lg shadow transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress and Updates Section */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
          <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Project Updates</h2>
            <button
              onClick={addUpdates}
              className="bg-white text-blue-500 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg flex items-center transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Update
            </button>
          </div>

          <div className="p-6">
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((update, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm relative hover:shadow-md transition-all"
                  >
                    <button
                      onClick={() => handleUpdateDelete(update.updateID)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <p className="text-gray-700 mb-4">{update.content}</p>
                    <div className="text-xs text-gray-500 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {update.created_at.split("T")[0]}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No updates yet. Add your first project update!
                </p>
              </div>
            )}

            {/* Pagination */}
            {updates.length > itemsPerPage && (
              <div className="flex justify-center mt-6">
                {Array.from(
                  { length: Math.ceil(updates.length / itemsPerPage) },
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      } transition-all`}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Backers Section */}
        {project.type === "Invest" &&
          paginatedBackersWithProducts.length > 0 && (
            <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
              <div className="bg-blue-500 text-white px-6 py-4">
                <h2 className="text-xl font-bold">Project Backers</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedBackersWithProducts.map(
                    (backersGroup, groupIndex) => (
                      <div key={groupIndex} className="space-y-4">
                        {backersGroup.map((backerData, innerIndex) => (
                          <div
                            key={innerIndex}
                            className="bg-blue-50 p-5 rounded-lg border border-blue-100"
                          >
                            <div className="flex items-center mb-3">
                              <div className="bg-blue-500 text-white rounded-full p-2 mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <h3 className="font-medium">
                                {backerData.backer.name}
                              </h3>
                            </div>
                            <div className="space-y-1 text-sm">
                              <p className="flex items-center text-gray-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  />
                                </svg>
                                {backerData.backer.email}
                              </p>
                              <p className="flex items-center text-gray-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Status:{" "}
                                <span className="font-medium ml-1">
                                  {backerData.status}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

        {/* Add Reward Modal */}
        {showAddRewardModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 m-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Add New Reward
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="newRewardTitle"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Reward Title
                  </label>
                  <input
                    type="text"
                    id="newRewardTitle"
                    value={newRewardTitle}
                    onChange={(e) => setNewRewardTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newRewardDescription"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="newRewardDescription"
                    value={newRewardDescription}
                    onChange={(e) => setNewRewardDescription(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newRewardAmount"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Minimum Amount (Rs.)
                  </label>
                  <input
                    type="number"
                    id="newRewardAmount"
                    value={newRewardAmount}
                    onChange={(e) => setNewRewardAmount(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newRewardDeliveryDate"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Estimated Delivery Date
                  </label>
                  <input
                    type="date"
                    id="newRewardDeliveryDate"
                    value={newRewardDeliveryDate}
                    onChange={(e) => setNewRewardDeliveryDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newRewardImage"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Reward Image
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-all">
                    <input
                      type="file"
                      id="newRewardImage"
                      onChange={(e) => setNewRewardImage(e.target.files[0])}
                      className="hidden"
                    />
                    <label
                      htmlFor="newRewardImage"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-500">
                        Click to upload reward image
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        {newRewardImage
                          ? newRewardImage.name
                          : "No file selected"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCloseAddRewardModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewReward}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-all"
                >
                  Add Reward
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Update Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 m-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Post Project Update
              </h2>

              <div>
                <label
                  htmlFor="updates"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Update Content
                </label>
                <textarea
                  id="updates"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  rows="6"
                  placeholder="Share your progress, milestones achieved, or any news about your project..."
                  onChange={(e) => setNewUpdates(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewUpdateCreate}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-all"
                >
                  Post Update
                </button>
              </div>
            </div>
            <ProjectChatbot />
          </div>
        )}

        {/* Toast Notification Container */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}
