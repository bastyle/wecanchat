import axios from "axios";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import { getUser } from "../../utils/UserUtils";
import Contacts from "./Contacts";
import io from 'socket.io-client';
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ChatView.css";
import ChatContainer from "./ChatContainer";
import Navbar from "../Navbar";
import Welcome from "./Welcome";

const ChatView = () => {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        if (!getUser()) {
            navigate("/login");
        } else {
            setCurrentUser(getUser())
        }
    }, []);
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit('user_connected', currentUser._id);
            console.log('user_connected:', currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchData = async () => {
            console.log('currentUser:', currentUser);
            if (currentUser) {
                try {
                    const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(response.data);
                } catch (error) {
                    console.error('Error fetching contacts:', error);
                }
            }
        };
        // Call the async function
        fetchData();
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <div>
            <Navbar />

            <div className="main-container">
          
                <div className="container">
                
                    <Contacts
                        contacts={contacts}
                        changeChat={handleChatChange}
                    />
                    <div className="col-8">
                        {currentChat === undefined ? (
                            <Welcome />
                        ) : (
                            <ChatContainer currentChat={currentChat} socket={socket} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatView;