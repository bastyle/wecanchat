import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Signup.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const avatarFile = e.target.files[0];
    if (avatarFile) {
      const reader = new FileReader();
      reader.readAsDataURL(avatarFile);
      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: reader.result,
        }));
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if (response.data.status) {
        const { email, username } = formData;
        sendWelcomeEmail(email, username);
        navigate("/announcement");
      } else {
        setErrorMessage(response.data.msg || "Failed to register.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || "An error occurred during registration."
      );
    }
  };

  const sendWelcomeEmail = async (userEmail, userName) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sendWelcomeEmail",
        {
          userEmail,
          userName,
        }
      );

      if (response.data.status) {
        console.log("Welcome email sent successfully!");
      } else {
        console.error("Error sending welcome email:", response.data.msg);
      }
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="logo"></div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="avatar">Choose Avatar</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="login-link">
        <Link to="/">Log in here</Link>
      </div>
      <div className="contiune-link">
        <Link to="/announcements">Or continue as guest</Link>
      </div>
    </div>
  );
}

export default SignUp;
