// components/Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Homepage';
import Announcements from "./components/pages/Announcements";
import Signup from "./components/pages/Signup";
import AnnouncementArticle from "./components/pages/Announcement_Article";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login"; // This is the Homepage/Startpage
import ChatBody from './components/chat-components/chat-body';
import CreateAnnouncement from './components/pages/CreateAnnouncement';

const AppRouter = () => {
  return (

      <Routes>
        <Route path="/announcements" element={<Announcements/>} />
        <Route path="/announcements/article/:id" element={<AnnouncementArticle/>} />
        <Route path="/add/announcement" element={<CreateAnnouncement/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/chat" element={<ChatBody/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
  );
};

export default AppRouter;
