import { React, useState, useEffect } from "react";
import AuthUser from "../Authentication/AuthUser";
import { Link, useNavigate } from "react-router-dom";

export default function UserCRUD() {
    const { http } = AuthUser();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(15);

    const AllData = () => {
        http.get('/admin/users', { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                setUsers(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editUser = (id) => {
        http.get(`/admin/users/edit/${id}`).then((response) => {
            navigate(`/admin/users/edit/${id}`, { state: response.data[0] });
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        AllData();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="bg-gray-200 flex-shrink-0">
                <div className="px-4 py-2">
                    <span className="bg-gray-100 text-gray-800 text-3xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">USERs</span>
                </div>
            </div>
            <div className="flex-1 overflow-x-auto">
                <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email Verified
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.location}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email_verified_at !== null ? (
                                                <span className="bg-green-100 text-green-800 text-1xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 text-1xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                                    Not Verified
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link>
                                                <a href={`admin/user/edit/${user.id}`} onClick={() => editUser(user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <span className="bg-blue-100 text-blue-800 text-1xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                                        Edit
                                                    </span>
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <br /><br /><br />
                    <div className="flex justify-center mt-4">
                        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-600 px-3 py-2 rounded-l-md text-sm font-medium">Previous</button>
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentUsers.length < usersPerPage} className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-600 px-3 py-2 rounded-r-md text-sm font-medium">Next</button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
