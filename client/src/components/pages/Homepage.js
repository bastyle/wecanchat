import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Homepage.css';

function Homepage() {
    return (
        <div className="homepage">
            <h1 className="title">WeCanChat!</h1>
            <div className="logo-container">
                <div className="logo"></div>
            </div>
            <div className="options-container">
                <Link to="/login" className="option">Login</Link>
                <Link to="/signup" className="option">Sign Up</Link>
                <Link to="/announcements" className="option">Announcements</Link>
                {/*<Link to="/guest" className="option">Continue as Guest</Link>*/}
            </div>
        </div>
    );
}

export default Homepage;