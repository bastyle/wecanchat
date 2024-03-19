import React, { useState } from "react";
import "./css/Navbar.css";
import avatar from "../assets/default_avatar.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

function Navbar() {
  const isLoggedIn = JSON.parse(localStorage.getItem("user")) ? true : false;
  const isAdminUser = isLoggedIn && JSON.parse(localStorage.getItem("user")).profileId == 1 ? true : false;
  //onsole.log("isAdminUser", isAdminUser)

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(logoutRoute + "/" + JSON.parse(localStorage.getItem("user"))._id);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  if (isLoggedIn) {
    return (
      <div className="main-container">
        <nav>
          <p>
            <img
              className="avatar_icon"
              src={`data:image/svg+xml;base64,${JSON.parse(localStorage.getItem("user")).avatarImage || avatar}`}
              alt="avatar_icon"
              onError={() => {
                this.src = "../assets/default_avatar.png";
              }}
            />
            {JSON.parse(localStorage.getItem("user")).username}
          </p>
          <div
            className="mobile-nav"
            onClick={() => {
              setMobileNavOpen(!mobileNavOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={mobileNavOpen ? "open" : ""}>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/announcements">Announcements</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogOut} >Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/announcements">Announcements</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    );
  }


}
export default Navbar;
