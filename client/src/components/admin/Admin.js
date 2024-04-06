import React from 'react';
import Navbar from '../Navbar';
import '../css/Admin.css';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div className="container">
            <div>
                <Navbar />
            </div>
            <div className="admin-container">
                <h1 className="admin-heading">Admin Dashboard</h1>
                <ul className="admin-list">
                    <li>
                        <Link to="/add/announcement" className='admin-link' >Add new Announcement</Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className='admin-link'>Users</Link>
                    </li>
                    {/* Add more options here */}
                </ul>
            </div>
        </div>
    );
};

export default Admin;