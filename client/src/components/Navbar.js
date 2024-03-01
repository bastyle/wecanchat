import React, { useState } from "react";
import "./Navbar.css";
import avatar from "../assets/default_avatar.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <nav>
      <p>
        <img
          className="avatar_icon"
          src={avatar}
          alt="avatar_icon"
          onerror="this.src=`../assets/default_avatar.png`;"
        />
        Welcome, Guest
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
          <Link to="/announcements">Announcements</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
