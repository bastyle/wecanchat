import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { allUsersRoute, userRoute } from '../../utils/APIRoutes';
import { getToken } from '../../utils/UserUtils';
import "../css/UsersMaitainer.css";
import Navbar from '../Navbar';
import { MdEditSquare, MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { successToastOptions } from '../../utils/Globals';

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

    /* const handleInputChange = (event) => {
         setSelectedUser({
             ...selectedUser,
             [event.target.name]: event.target.value
         });
     };*/

    const handleInputChange = (property, value) => {
        setSelectedUser({
            ...selectedUser,
            [property]: value
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


    // ...

    const handleUserDelete = (userDel) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: `Are you sure you want to delete ${userDel.username} ?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(userRoute + `/${userDel._id}`, {
                            headers: {
                                Authorization: "Bearer " + getToken()
                            }
                        })
                            .then(response => {
                                setUsers(users.filter(user => user._id !== userDel._id));
                                setSelectedUser(null);
                                toast.success("User deleted successfully", successToastOptions);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    return (
        <div className="users-container">
            <div>
                <Navbar />
            </div>
            <div className="sub-container">
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
                            <tr key={user._id}>
                                {selectedUser && selectedUser._id === user._id ? (
                                    <>
                                        <td><input type="text" className="users-input" value={selectedUser.username} onChange={(e) => handleInputChange('username', e)} /></td>
                                        <td><input type="text" className="users-input" value={selectedUser.firstName} onChange={(e) => handleInputChange('firstName', e)} /></td>
                                        <td><input type="text" className="users-input" value={selectedUser.lastName} onChange={(e) => handleInputChange('lastName', e)} /></td>
                                        <td className="email-column">
                                            <input type="text" className="users-input" value={selectedUser.email} onChange={(e) => handleInputChange('email', e)} />
                                        </td>
                                        <td><input type="checkbox" className="users-input" checked={selectedUser.profileId === 1} onChange={(e) => handleInputChange('profileId', e.target.checked ? 1 : 0)} /></td>
                                    </>
                                ) : (
                                    <>
                                        <td>{user.username}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td className="email-column">{user.email}</td>
                                        <td className='checkbox'><input type="checkbox" checked={user.profileId === 1} disabled /></td>
                                    </>
                                )}
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '.2rem' }}>
                                        <MdEditSquare style={{ color: 'blue' }} onClick={() => handleUserSelect(user)} />
                                        <MdDelete style={{ color: 'red' }} onClick={() => handleUserDelete(user)} />
                                        {selectedUser && selectedUser._id === user._id ? (
                                            <>
                                                <FaSave style={{ color: 'green' }} onClick={() => handleUserUpdate} />
                                            </>
                                        ) : (
                                            <>
                                                <td><span>-</span></td>
                                            </>
                                        )}
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