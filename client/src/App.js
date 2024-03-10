import React from "react";
import "./App.css";
import Signup from "./components/pages/Signup";
import Announcements from "./components/pages/Announcements";
import Announcement_Article from "./components/pages/Announcement_Article";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login"; // This is the Homepage/Startpage
import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";
import AppRouter from "./Router";

// Navbar, should overlay over every components except login & signup
function App() {
  return (
    <div>
      <div>
        
        <AppRouter/>
      </div>
    </div>
  );
}

export default App;
