import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/Signup.css";
import { avatarsRoute, registerRoute } from "../../utils/APIRoutes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from "buffer";
import { genericToastOptions } from "../../utils/Globals";

function SignUp() {

  const api = 'https://api.multiavatar.com/4645646';
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');

  useEffect(() => {
    const fetchAvatars = async () => {



      try {
        console.log("start fetching avatars");
        const data = [];
        for (let i = 0; i < 7; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        console.log("data", data);       
        setAvatars(data);
      } catch (error) {
        console.error('Error fetching avatars:', error);
        try {
          const images = await axios.get(avatarsRoute);
          //console.log("image", image.data);
          //console.log("image", image.data.length);
          const data = [];
          for (let i = 0; i < 7; i++) {
            //console.log("image[i]", image.data[i]);
            data.push(images.data[i].source);
          }
          setAvatars(data);
        } catch (error) {
          console.error('Error fetching avatars:', error);
        }
      }
    };

    fetchAvatars();
  }, []);

  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
  };


  const successToastOptions = {
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
    onClose: () => {
      //console.log("Redirecting to /announcements");
      navigate("/announcements");
    }
  };

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



  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    console.log('formData:', formData);

    //console.log('selectedAvatar:', selectedAvatar);
    formData.avatarImage = selectedAvatar;
    //console.log('formData:', formData);
    if (selectedAvatar === undefined || selectedAvatar === "") {
      console.error("Please select an avatar");
      toast.error("Please select an avatar", genericToastOptions);
      return;
    }

    axios.post(registerRoute, formData)
      .then((response) => {
        console.log('respStatus:', response.data.status);
        if (response.data.status === false) {
          console.log('false.......:' + response.data.msg);
          toast.error(response.data.msg, genericToastOptions);
        } else {
          localStorage.setItem('user',JSON.stringify(response.data.user));
          toast.success("Registered successfully!", successToastOptions);
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        toast.error("Error", genericToastOptions);
      });

  };


  return (
    <div className="signup-container">
      {/*<div className="logo"></div>*/}
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
          <label htmlFor="avatarImage">Choose Avatar</label>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                name="avatarImage"
                src={`data:image/svg+xml;base64,${avatar}`}
                alt={`Avatar ${index + 1}`}
                onClick={() => handleAvatarSelection(avatar)}
                className={`avatar ${selectedAvatar === avatar ? "selected" : ""}`}
              />
            ))}
          </div>
        </div>
        <div className="">
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <Link to="/login" className="login-link">Have an account? Login here!</Link>
          <br></br>
          <Link to="/" className="login-link">Go to Home</Link>
        </div>
      </form>

    </div>
  );
}

export default SignUp;
