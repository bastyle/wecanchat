import React, { useState } from 'react';
import './profile.css';
import profilePicture from './Images/profile-picture.jpg';

function Profile() {
  const initialProfileData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: '',
    address: '123 Example St, Example City, Example Country',
    phone: '+1234567890',
    // Add more profile data as needed
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [formData, setFormData] = useState(initialProfileData);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData({
      ...formData,
      bio: Object.values(formData).join(' ')
    });
    setSaveMessage('Profile data saved successfully!');
    console.log("Profile data saved:", profileData);
  };

  const handleCancel = () => {
    setFormData(initialProfileData);
    setSaveMessage('');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profilePicture} alt="Profile Picture" className="profile-picture" />
        <h1>{profileData.name}</h1>
        <p>{profileData.bio}</p>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-info">
          <h2>Contact Information</h2>
          <h3> Name </h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <br></br>
          <h3> Email Address </h3>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <br></br>
          <h3> Phone Number </h3>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
            <h3>Address</h3>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
        </div>
        
          
        
        <div className="button-container">
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
        {saveMessage && <p className="save-message">{saveMessage}</p>}
      </form>
    </div>
  );
}

export default Profile;
