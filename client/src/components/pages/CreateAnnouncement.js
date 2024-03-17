import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { announcementRoute } from '../../utils/APIRoutes';
import Navbar from '../Navbar';
import '../css/CreateAnnouncement.css';
import { getUser, isUserLogged } from '../../utils/UserUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { genericToastOptions } from '../../utils/Globals';

function CreateAnnouncement() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        content: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

    console.log("CreateAnnouncement");
    console.log("isLoggedIn", isUserLogged());

    useEffect(() => {
        if (isUserLogged()) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                author: getUser().username,
              }));
        }
        console.log('formData:', formData);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const reader = new FileReader();
            reader.onloadend = async function () {
                console.log('RESULT', reader.result);
                const imageData = reader.result; // imageData is the base64-encoded image data
                console.log('imageData:', imageData);
                console.log('formData:', formData);
                formData.image = imageData;
                formData.author = getUser().username;
                console.log('formData:', formData);
                axios.post(announcementRoute, formData)
                    .then((response) => {
                        console.log('respStatus:', response.data.status);
                        if (response.data.status === false) {
                            toast.error("Failed to create announcement! " + response.data.msg, genericToastOptions);
                        } else {
                            toast.success("Announcement created successfully!", genericToastOptions);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error.message);
                        toast.error("Error", genericToastOptions);
                    });
            }
            reader.readAsDataURL(image); // Read the image file as a data URL            
        } catch (error) {
            console.error(error);
            toast.error("Failed to create announcement! " + error, genericToastOptions);
        }
    };
    return (
        <div> <Navbar />
            <div className="create-announcement">
                <div className="profile-header">
                    <h2>Create Announcement</h2>
                </div>
                <form onSubmit={handleSubmit} className="announcement-form">
                    <div className="form-field">
                        <label>Author:</label>
                        <input type="text" name='author' disabled value={formData.author} required />
                    </div>
                    <div className="form-field">
                        <label> Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                        <label>Image URL:</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
                    </div>
                    <div className="form-field">
                        <label>Content:</label>
                        <textarea name="content" value={formData.content} onChange={handleChange} required />
                    </div>
                    <button type="button" className="cancel-button">
                        Cancel
                    </button>
                    <button type="submit" className="confirm-button">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateAnnouncement;