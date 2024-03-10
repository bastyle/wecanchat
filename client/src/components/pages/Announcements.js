import React from "react";
import "../css/Announcement.css";
import thumbnail from "../../assets/default_thumbnail.png";
import { Link } from "react-router-dom";

function Announcements() {
  return (
    <div>
      <div className="Announcements-Container">
        <div className="Announcements-Header-Box">
          <h1>Announcements</h1>
        </div>
        <div className="Announcements-Box">
          <Link to="/announcements/article">
            <div className="Announcement">
              <img
                className="thumbnail"
                src={thumbnail}
                alt="thumbnail"
                onerror="this.src=`../assets/default_thumbnail.png`;"
              />
              <h3>Announcement Test #1</h3>
            </div>
          </Link>
          <Link to="/announcements/article">
            <div className="Announcement">
              <img
                className="thumbnail"
                src={thumbnail}
                alt="thumbnail"
                onerror="this.src=`../assets/default_thumbnail.png`;"
              />
              <h3>Announcement Test #2</h3>
            </div>
          </Link>
          <Link to="/announcements/article">
            <div className="Announcement">
              <img
                className="thumbnail"
                src={thumbnail}
                alt="thumbnail"
                onerror="this.src=`../assets/default_thumbnail.png`;"
              />
              <h3>Announcement Test #3</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Announcements;
