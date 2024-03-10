import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState({
    name: "Default",
    email: "default@example.com",
  });

  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Retrieve the userId from a secure place, such as localStorage
    const userId = localStorage.getItem('userId'); // Replace 'userId' with your actual local storage key
    if (!userId) {
      setMessage('No user ID found. Please log in again.');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/user/${userId}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setMessage(
          `Failed to load profile data: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Retrieve the userId again for updating the profile
    if (!userId) {
      setMessage('No user ID found. Please log in again.');
      return;
    }

    const updateData = {
      ...profileData,
      ...(newPassword && { password: newPassword }),
    };

    try {
      await axios.put(`http://localhost:5000/api/auth/user/${userId}`, updateData);
      setMessage('Profile updated successfully.');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Customize your Profile</h2>
        <img
          src={profileData.avatarImage || "default-avatar.png"}
          alt="Profile Avatar"
          className="profile-avatar"
        />{" "}
        <button className="profile-avatar-upload-btn">Change</button>
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        {message && <div className="profile-message">{message}</div>}
        <div className="form-actions">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="confirm-button">
            Confirm
          </button>
        </div>
        <Link to="/chat" className="Back-Btn">
          Go Back
        </Link>
      </form>
    </div>
  );
}

export default Profile;
