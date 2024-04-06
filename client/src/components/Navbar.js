import React, { useEffect, useState } from "react";
import "./css/Navbar.css";
import avatar from "../assets/default_avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { getToken, isAdminUser, isUserLogged, logoutUser } from "../utils/UserUtils";


function Navbar() {
    const isLoggedIn = isUserLogged();
    const isAdmin = isAdminUser();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const navigate = useNavigate();
    const [showNotificationBtn, setShowNotificationBtn] = useState(false);
    const handleLogOut = async (event) => {
        event.preventDefault();
        try {
            logoutUser();
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    function checkNotificationPromise() {
        try {
            Notification.requestPermission().then();
        } catch (e) {
            return false;
        }
        return true;
    }

    function askNotificationPermission() {
        // function to actually ask the permissions
        function handlePermission(permission) {
            // set the button to shown or hidden, depending on what the user answers
            if (Notification.permission === 'denied' || Notification.permission === 'default') {
                setShowNotificationBtn(true);
            } else {
                setShowNotificationBtn(false);
            }
        }

        // Let's check if the browser supports notifications
        if (!('Notification' in window)) {
            console.log("This browser does not support notifications.");
        } else {
            if (checkNotificationPromise()) {
                Notification.requestPermission()
                    .then((permission) => {
                        handlePermission(permission);
                    })
            } else {
                Notification.requestPermission(function (permission) {
                    handlePermission(permission);
                });
            }
        }
    }

    useEffect(() => {
        askNotificationPermission();
        getToken();
    }, []);


    if (isLoggedIn) {
        return (
            <div >
                <div className="avatar-container">
                    <p className={`${avatar} avatar-left`}>
                        <img
                            className="avatar_icon"
                            src={`data:image/svg+xml;base64,${JSON.parse(localStorage.getItem("user")).avatarImage || avatar}`}
                            alt="avatar_icon"
                            onError={() => {
                                this.src = "../assets/default_avatar.png";
                            }}
                        />
                        {JSON.parse(localStorage.getItem("user")).username}
                    </p>
                </div>
                <div className="main-container">
                    <nav>
                        <div
                            className="mobile-nav"
                            onClick={() => {
                                setMobileNavOpen(!mobileNavOpen);
                            }}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <ul className={mobileNavOpen ? "open" : ""}>
                            <li>
                                <Link to="/chat">Chat</Link>
                            </li>
                            <li>
                                <Link to="/announcements">Announcements</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            {isAdmin && (
                                <li>
                                    <Link to="/admin">Admin</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/" onClick={handleLogOut}>Logout</Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        );
    } else {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/announcements">Announcements</Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        );
    }


}

export default Navbar;
