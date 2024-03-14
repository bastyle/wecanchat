import React, { useState } from 'react';
import axios from 'axios';
import { announcementRoute } from '../../utils/APIRoutes';
import Navbar from '../Navbar';

function CreateAnnouncement() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(announcementRoute, { title, content });
            if (response.status === 200) {                
                setTitle('');
                setContent('');
            } else {
                console.error(response.data);
            }
        } catch (error) {
            // Network error or other issue
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Create Announcement</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateAnnouncement;