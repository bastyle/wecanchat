import React, { useEffect, useState } from "react";
import "../css/Announcement_Article.css";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import thumbnail from "../../assets/default_thumbnail.png";

import { announcementRoute } from "../../utils/APIRoutes";
function Announcement_Article() {
  const { id } = useParams(); // Get the article ID from the URL params
  const [article, setArticle] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("Announcement_Article.js: id:", id);

  useEffect(() => {
    console.log("Fetching article details for ID:", id);
    // Fetch the specific article details using the article ID
    fetch(`${announcementRoute}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        //console.log("Article details:", data);
        console.log("Article title:", data.title);
        setArticle(data);
        setIsLoaded(true);
        //console.log("Article title:", article.title);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching article details:", error);
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="main-container">
        {isLoaded ? (
          <div className="Article">
            <div className="Article-Container">
              <div className="Article-Header-Box">
                <h1 className="Article-Title">{article.title}</h1>
                <h3 className="Article-Subtitle">
                  {article.author.charAt(0).toUpperCase() + article.author.slice(1)} |{" "}
                  {new Date(article.createdDate).toLocaleDateString()}
                </h3>
              </div>
              <div className="image-container">
                <img
                  className="thumbnail2"
                  src={article.image}
                  onError={(e) => {
                    e.target.src = thumbnail;
                  }}
                  alt="thumbnail"
                />
              </div>
              <div className="content-container">
                <p className="article-content">{article.content}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );

}
export default Announcement_Article;
