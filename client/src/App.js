import React from "react";
import "./App.css";
import Signup from "./components/Signup"; // This is the Homepage
import Announcements from "./components/Announcements";
import Announcement_Article from "./components/Announcement_Article";
import Profile from "./components/Profile";
import Login from "./components/Login"; // CHANGE URL TO THE REAL LOGIN PAGE
import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";

// Navbar, should overlay over every components except login & signup
function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/announcements" Component={Announcements} />
          <Route
            path="/announcement_article"
            Component={Announcement_Article}
          />
          <Route path="/profile" Component={Profile} />
          <Route path="/login" Component={Login} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
