import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function Project_Creation() {
    const navigate = useNavigate();
    const { user, http, httpForm } = AuthUser();
    const [genreList, setGenreList] = useState([]);
    const [projectTitle, setProjectTitle] = useState('');
    const [description, setDescription] = useState('');
    const [short_description, setShortDescription] = useState('');
    const [endDate, setEndDate] = useState('');
    const [goal, setGoal] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [type, setType] = useState('');
    const [genre, setGenre] = useState('');
    const [otherImages, setOtherImages] = useState([]);
    const [showRewards, setShowRewards] = useState(false);
    const [rewards, setRewards] = useState([]);
    const [rewardImages, setRewardImages] = useState([]);
    const [rewardTitle, setRewardTitle] = useState('');
    const [rewardDescription, setRewardDescription] = useState('');
    const [rewardAmount, setRewardAmount] = useState('');
    const [rewardDelivery, setRewardDelivery] = useState('');
    const [status, setStatus] = useState('pending');

    const types = ["Crowdfund", "Invest"];

    const handleTypeChange = (event) => {
        setType(event.target.value);
        setShowRewards(event.target.value === "Invest");
    };

    const GetGenre = () => {
        http.get('/projects/genre')
            .then((response) => {
                setGenreList(response.data[0]);
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleRewards = (e) => {
        e.preventDefault();
        const newReward = {
            title: rewardTitle,
            description: rewardDescription,
            amount: rewardAmount,
            delivery: rewardDelivery,
            images: rewardImages,
        };
        setRewards([...rewards, newReward]);
        setRewardTitle('');
        setRewardDescription('');
        setRewardAmount('');
        setRewardDelivery('');
        setRewardImages([]); // Reset rewardImages state
    };

    const handleRemoveReward = (index) => {
        const updatedRewards = [...rewards];
        updatedRewards.splice(index, 1);
        setRewards(updatedRewards);
    };
    const handleSubmit = (e) => {

        e.preventDefault();

        // Prepare project data
        const projectData = {
            projectTitle,
            description,
            short_description,
            startDate: new Date().toISOString().slice(0, 10),
            endDate,
            goal,
            type,
            genre,
            user: user.id,
            coverImage,
            otherImages,
        };

        // Include rewards in project data if project type is "Invest"
        if (type === "Invest") {
            projectData.rewards = rewards;
        }

        // Submit project data to the backend
        httpForm.post('/user/projects/create', projectData)
            .then((response) => {
                console.log(response.data['message']);
                navigate('/');
            }).catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        GetGenre();
    }
        , []);

    return (
        <div className=" px-4 py-8 bg-yellow-50">
            <div className='container mx-auto flex  gap-3'>
                <div className=" p-4 gap-2">
                    <div className='flex justify-center'>
                        <form className="w-[700px] pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                            {/* Left column with text-related input fields */}
                            <div className='border p-3 m-3 rounded-lg bg-white'>

                                <div className="mb-4">
                                    <label htmlFor="project_title" className="block text-start text-gray-700 text-sm font-bold mb-2">Project Title</label>
                                    <input onChange={(e) => setProjectTitle(e.target.value)} type="text" id="project_title" placeholder="Project Title" className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-start text-gray-700 text-sm font-bold mb-2">Short Description</label>
                                    <textarea onChange={(e) => setShortDescription(e.target.value)} id="short_description" placeholder="Short Description" className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-start text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-start text-gray-700 text-sm font-bold mb-2">Type</label>
                                    <select
                                        id="type"
                                        onChange={handleTypeChange}
                                        className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    >
                                        <option value="">Select Type</option>
                                        {types.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-start text-gray-700 text-sm font-bold mb-2">End Date</label>
                                    <input onChange={(e) => setEndDate(e.target.value)} type="date" id="end_date" placeholder="End Date" className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-start text-gray-700 text-sm font-bold mb-2">Goal</label>
                                    <input onChange={(e) => setGoal(e.target.value)} type="number" id="goal" placeholder="Goal" className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-start text-gray-700 text-sm font-bold mb-2">Genre</label>
                                    <select
                                        id="genre"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                        className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required
                                    >
                                        <option value="">Select Genre</option>
                                        {genreList.map((genre) => (
                                            <option key={genre.genreID} value={genre.genreID}>
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-start text-gray-700 text-sm font-bold mb-2">Cover Image</label>
                                    <input onChange={(e) => setCoverImage(e.target.files)} type="file" id="cover_image" className="form-control bg-white appearance-none border-2 border-gray-200 rounded w-full  px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-start text-gray-700 text-sm font-bold mb-2">Project Images</label>
                                    <input
                                        onChange={(e) => setOtherImages(Array.from(e.target.files))}
                                        type="file"
                                        id="other_images"
                                        className="form-control bg-white appearance-none border-2 border-gray-200 rounded w-full  px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        multiple // Allow multiple file selection
                                        accept="image/*" // Accept only image files
                                    // required
                                    />
                                </div>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  w-full rounded focus:outline-none focus:shadow-outline">Submit</button>
                            </div>
                            <div>
                                
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    {showRewards && (
                        <div className="grid p-4 gap-2">
                            <h2 className="text-xl font-bold mb-4">Add Rewards</h2>
                            <form className=" border rounded-lg px-8 pt-6 pb-8 mb-4 bg-white" onSubmit={handleRewards}>
                                {/* Form inputs for rewards */}
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                    <input type="text" id="title" value={rewardTitle} onChange={(e) => setRewardTitle(e.target.value)} className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <textarea id="description" value={rewardDescription} onChange={(e) => setRewardDescription(e.target.value)} className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                                    <input type="number" id="amount" value={rewardAmount} onChange={(e) => setRewardAmount(e.target.value)} className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="delivery" className="block text-gray-700 text-sm font-bold mb-2">Estimated Delivery</label>
                                    <input type="date" id="delivery" value={rewardDelivery} onChange={(e) => setRewardDelivery(e.target.value)} className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">Images</label>
                                    <input type="file" id="images" onChange={(e) => setRewardImages(Array.from(e.target.files))} className="peer h-full w-full rounded-[7px] border border-gray-300 bg-white px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" accept="image/*" />
                                </div>
                                <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Reward</button>
                            </form>
                            {/* Display added rewards */}
                            <div className="mt-4 grid grid-cols-3 gap-4 justify-center">
                                <div className="col-span-3 md:col-span-1">
                                    <div className="bg-white p-4 rounded-lg border">
                                        <h3 className="text-lg font-bold mb-2 text-center">Added Rewards</h3>
                                        {rewards.length > 0 ? (
                                            <ul>
                                                {rewards.map((reward, index) => (
                                                    <li key={index} className="mb-4">
                                                        <div className="text-center">
                                                            <p>
                                                                <span className="font-bold">Title:</span> {reward.title}
                                                            </p>
                                                            <p>
                                                                <span className="font-bold">Description:</span>{" "}
                                                                {reward.description}
                                                            </p>
                                                            <p>
                                                                <span className="font-bold">Amount:</span> {reward.amount}
                                                            </p>
                                                            <p>
                                                                <span className="font-bold">Estimated Delivery:</span>{" "}
                                                                {reward.delivery}
                                                            </p>
                                                            {/* Display reward images */}
                                                            {reward.images && (
                                                                <div className="flex justify-center">
                                                                    {Array.from(reward.images).map((image, imgIndex) => (
                                                                        <img
                                                                            key={imgIndex}
                                                                            src={URL.createObjectURL(image)}
                                                                            alt={`Reward Image ${imgIndex + 1}`}
                                                                            className="w-32 h-32 object-cover rounded mr-2 mb-2"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <button
                                                                onClick={() => handleRemoveReward(index)}
                                                                className="remove bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full mt-2"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-center">No rewards added yet.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
