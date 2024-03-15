import React, { useState, useEffect } from 'react';
import './chat-list.css';
import ChatListItems from "./chat-list-items";
import ChatContent from "./chat-content";
import axios from 'axios';

const ChatList = () => {
    const [allChats, setAllChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);

    useEffect(() => {
      
        axios.get('/api/messages/getmsg')
            .then(response => {
                setAllChats(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    const handleChatItemClick = (chatId) => {
        setSelectedChatId(chatId);
    };

    const selectedChat = allChats.find(chat => chat.id === selectedChatId);

    return (
        <div className='chat-list-container'>
            <div className='chat-list'>
                {allChats.map(chat => (
                    <ChatListItems 
                        key={chat.id} 
                        chat={chat} 
                        onItemClick={handleChatItemClick} 
                    />
                ))}
            </div>
            <div className='chat-content'>
                {selectedChat && <ChatContent messages={selectedChat.messages} />}
            </div>
        </div>
    );
}

export default ChatList;
