import React from "react";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import AppRouter from "./Router";

// Navbar, should overlay over every components except login & signup
function App() {
  return (
    <div>
      <div>
       
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
