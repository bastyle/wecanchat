import '../css/Homepage.css';
import { isUserLogged } from '../../utils/UserUtils';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function Homepage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isUserLogged()) {
            console.log("User is logged in, redirecting to chat");
            navigate("/chat");
        }
    }, []);

    return (
        <div className="homepage">
            <h1 className="title">WeCanChat!</h1>
            <div className="homepage-logo-container">
                <div className="homepage-logo"></div>
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