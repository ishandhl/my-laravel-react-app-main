import { useState, useEffect, React } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";

export default function UserEDIT() {

    const { http } = AuthUser();
    const userid = window.location.pathname.split('/').pop();

    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_location, setLocation] = useState('');

    const roles = ["user", "admin"];
    const [selectedRole, setSelectedRole] = useState('');

    const [isActive, setIsActive] = useState(userData ? userData.status === "active" : false);
    const newStatus = isActive ? "inactive" : "active";

    useEffect(() => {
        // Fetch user data when the component mounts
        http.get(`admin/user/${userid}`)
            .then((response) => {
                setUserData(response.data[0]);
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setSelectedRole(response.data[0].role);
                setLocation(response.data[0].location);
                setIsActive(response.data[0].status === "active");
            })
            .catch((error) => {
                console.error(error);
                // Handle error
            });
    }, []);


    const handleInformationChanges = () => {
        // Update the user information when the button is clicked
        http.put(`admin/user/edit/${userid}`, {
            name: name,
            email: email,
            role: selectedRole,
            location: user_location,
            status: newStatus

        }).then((response) => {
            console.log(response.data);
            window.location.href = '/admin/users';
            // popup for successful update
        }).catch((error) => {
            console.error(error);
            // popup for error
        });
    };


    // Function to handle status toggle
    const handleToggleStatus = () => {
        updateUserStatus(newStatus);
        setIsActive(!isActive);
    };

    // Function to update user status
    const updateUserStatus = (newStatus) => {
        http.put(`admin/user/edit/${userid}/status`, { status: newStatus })
            .then((response) => {
                console.log(response.data);
                // popup for sucess
            })
            .catch((error) => {
                console.error(error);
                // popup for error
            });
    };

    useEffect(() => {

    });

    return (
        <>
            <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                <span class="bg-gray-100 text-gray-800 text-3xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">Users</span>
                <div class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData != null ? (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => setName(e.target.value)} type="text" defaultValue={userData.name} />
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => setEmail(e.target.value)} type="text" defaultValue={userData.email} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={selectedRole}
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {roles.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => setLocation(e.target.value)} type="text" defaultValue={userData.location} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <label className="inline-flex items-center me-5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={isActive}
                                                onChange={handleToggleStatus}
                                            />
                                            <div
                                                className={`relative w-11 h-6 ${isActive ? "bg-green-600" : "bg-gray-200"
                                                    } rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
                                            >
                                                <div
                                                    className={`absolute inset-y-0 right-0 w-1/2 ${isActive ? "bg-white" : "bg-gray-200"
                                                        } rounded-full`}
                                                ></div>
                                            </div>
                                            <span className={`ms-3 text-sm font-medium text-gray-900 dark:text-gray-300`}>
                                                {isActive ? "Active" : "Inactive"}
                                            </span>
                                        </label>
                                    </td>
                                </tr>
                            )
                                : (

                                    <tr>
                                        <td colSpan="5" className="text-center">No Data Found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="mt-3 mb-96">
                    <button onClick={handleInformationChanges} className="inline-block text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Update Information
                    </button>
                    <Link to="/admin/users" className="inline-block text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Back
                    </Link>
                </div>
                <br/><br/><br/><br /><br /><br />
                <div>{/*For spacing*/}
                </div>
            </div>

        </>
    )
}