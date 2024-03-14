import React, { useState, useEffect } from "react";
import "../css/Announcement.css";
import thumbnail from "../../assets/default_thumbnail.png";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { announcementRoute } from "../../utils/APIRoutes";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

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
      <div className="Announcements-Container">
        <div className="Announcements-Header-Box">
          <h1>Announcements</h1>
        </div>

        <div className="Announcements-Box">
          {announcements.map((announcement) => (
            <Link to={`/announcements/article/${announcement._id}`} key={announcement._id}>
              <div className="Announcement">
                <img
                  className="thumbnail"                  
                  src={`data:image/svg+xml;base64,${announcement.image}`}
                  alt="thumbnail"
                  onError={(e) => {
                    e.target.src = thumbnail;
                  }}
                />
                <h3>{announcement.title}</h3>                
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Announcements;
