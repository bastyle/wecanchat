import axios from "axios";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import { getUser } from "../../utils/UserUtils";
import Contacts from "./Contacts";
import io from 'socket.io-client';
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Contacts
                            contacts={contacts}
                            handleChatChange={handleChatChange}
                        />
                    </div>
                    <div className="col-8">
                        {/*<ChatContent currentChat={currentChat} />*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatView;