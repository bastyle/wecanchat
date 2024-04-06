import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { allUsersRoute } from '../../utils/APIRoutes';
import { getToken } from '../../utils/UserUtils';
import "../css/UsersMaitainer.css";
import Navbar from '../Navbar';
import { FaEdit } from "react-icons/fa";
import { MdEditSquare, MdDelete } from "react-icons/md";

const UserMaintainer = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`${allUsersRoute}`, {
                    headers: {
                        Authorization: "Bearer " + getToken()
                    }
                });
                console.log("response", response.data)
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }

        };

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        setSelectedUser({
            ...selectedUser,
            [event.target.name]: event.target.value
        });
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleUserUpdate = () => {
        // Replace with your API endpoint
        axios.put(`/api/users/${selectedUser._id}`, selectedUser)
            .then(response => {
                // Update the user in the users array
                setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
                setSelectedUser(null);
            });
    };

    const handleUserDelete = () => {
        // Replace with your API endpoint
        axios.delete(`/api/users/${selectedUser.id}`)
            .then(response => {
                // Remove the user from the users array
                setUsers(users.filter(user => user.id !== selectedUser.id));
                setSelectedUser(null);
            });
    };

    return (
        <div className="users-container">
            <div>
                <Navbar />
            </div>
            <div className="sub-container">
                {selectedUser && (
                    <div>
                        <input className="users-input" name="username" value={selectedUser.username} onChange={handleInputChange} />
                        <input className="users-input" name="name" value={selectedUser.name} onChange={handleInputChange} />
                        <input className="users-input" name="lastname" value={selectedUser.lastname} onChange={handleInputChange} />
                        <input className="users-input" name="profileId" value={selectedUser.profileId} onChange={handleInputChange} />
                        <button className="users-button" onClick={handleUserUpdate}>Submit</button>
                    </div>
                )}
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.profileId}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '.2rem' }}>
                                        <MdEditSquare style={{ color: 'blue' }} onClick={() => handleUserSelect(user)} />
                                        <MdDelete style={{ color: 'red' }} onClick={() => handleUserDelete(user)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserMaintainer;