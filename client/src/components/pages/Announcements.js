import React, { useState, useEffect } from "react";
import "../css/Announcement.css";
import thumbnail from "../../assets/default_thumbnail.png";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { announcementRoute } from "../../utils/APIRoutes";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const isLoggedIn = JSON.parse(localStorage.getItem("user")) ? true : false;
  const isAdminUser = isLoggedIn && JSON.parse(localStorage.getItem("user")).profileId == 1 ? true : false;

  useEffect(() => {
    // Fetch the list of announcements from the API
    fetch(announcementRoute)
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="Announcements-Header-Box">
          <h1>Announcements</h1>         
        </div>

        <div className="Announcements">
          {announcements.map((announcement) => (
            <Link to={`/announcements/article/${announcement._id}`} key={announcement._id}>
              <div className="Announcement">
              <div className="">
                <img
                  className="thumbnail"
                  src={announcement.image}
                  alt="thumbnail"
                  onError={(e) => {
                    e.target.src = thumbnail;
                  }}
                />
                </div>
                <div className="">
                  <h3>{announcement.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Announcements;
