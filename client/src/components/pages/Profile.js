import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { userRoute } from "../../utils/APIRoutes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { genericToastOptions } from "../../utils/Globals";
import Navbar from "../Navbar";
import { getToken, getUser, login, loginUpdate } from "../../utils/UserUtils";

function Profile() {
  const [profileData, setProfileData] = useState({
    name: "Default",
    email: "default@example.com",
  });

  const [updatePassword, setUpdatePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const fetchProfileData = async () => {
    console.log("fetchProfileData" + userId);
    try {
      const response = await axios.get(userRoute + "/" + getUser()._id, {
        headers: {
          Authorization: "Bearer " + getToken()      
        },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error(`Failed to load profile data: ${error.response ? error.response.data.message : error.message}`, genericToastOptions);
    }
  };

  useEffect(() => {
    if (!userId) {
      toast.error("No user ID found. Please log in again.", genericToastOptions);
      return;
    }
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


  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Retrieve the userId again for updating the profile
    if (!userId) {
      toast.error("No user ID found. Please log in again.", genericToastOptions);
      return;
    }
    if (updatePassword && (currentPassword === newPassword)) {
      toast.error("New Password must be different than current password.", genericToastOptions);
      return;
    }
    const updateData = {
      ...profileData,
      ...(newPassword && { newPassword: newPassword }),
      ...(currentPassword && { currentPassword: currentPassword }),
    };
    console.log("updateData:", updateData);
    try {
      const response = await axios.put(`${userRoute}/${userId}`, updateData, {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      });
      console.log("response:", response);
      //toast.success('Profile updated successfully.');
      if (response.data.status) {
        console.log("Profile updated successfully:", response.data);
        toast.success("Profile updated successfully.", genericToastOptions);
      }else{
        toast.error("Error updating profile: "+response.data.msg, genericToastOptions);
      }
      loginUpdate(response.data);
      goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile.", genericToastOptions);
    }
  };

  const handleCheckboxChange = (e) => {
    console.log("handleCheckboxChange");
    setUpdatePassword(e.target.checked);
    const { checked } = e.target;
    console.log("checked:", checked);
    setCurrentPassword("");
    setNewPassword("");

  };

  function goBack() {
    navigate("/chat");     
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <h2>Customize your Profile</h2>
          <img
            src={`data:image/svg+xml;base64,${profileData.avatarImage || "default-avatar.png"}`}
            alt="Profile Avatar"
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />{" "}
          {/*<button className="profile-avatar-upload-btn">Change</button>*/}
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              required
              value={profileData.username}              
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>First Name</label>
            <input
              type="text"
              required
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Last Name</label>
            <input
              type="text"
              required
              name="lastName"
              value={profileData.lastName}
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
          <br></br>
          <div >
            <input
              label="Update Password"
              type="checkbox"
              name="updPassword"
              checked={updatePassword}
              onChange={handleCheckboxChange}
            ></input>
            <label>Update Password</label>
          </div>
          <br></br>

          <div className="form-field">
            <label>Current Password</label>
            <input
              disabled={!updatePassword}
              required={updatePassword}
              min={8}
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </div>
          <div className="form-field">
            <label>New Password</label>
            <input
              disabled={!updatePassword}
              required={updatePassword}
              min={8}
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={goBack}>
              Cancel
            </button>
            <button type="submit" className="confirm-button">
              Confirm
            </button>
          </div>
          {/*<Link to="/chat" className="Back-Btn">
            Go Back
  </Link>*/}
        </form>
      </div>
    </div>
  );
}

export default Profile;
