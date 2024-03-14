import React, { useEffect, useState } from "react";
import "../css/Announcement_Article.css";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

import { announcementRoute } from "../../utils/APIRoutes";
function Announcement_Article() {
  const { id } = useParams(); // Get the article ID from the URL params
  const [article, setArticle] = useState(null);
  console.log("Announcement_Article.js: id:", id);

  useEffect(() => {
    // Fetch the specific article details using the article ID
    fetch(`${announcementRoute}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log("Article details:", data);
        setArticle(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching article details:", error);
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <h1>Article ID: {id}</h1>
      <h3>{article.title}</h3>
      {/* Display the details of the specific article */}
    </div>
  );
}
export default Announcement_Article;
