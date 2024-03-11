import React, { useState } from 'react';
import './chat-list.css';
import ChatListItems from "./chat-list-items";
import ChatContent from "./chat-content";

const ChatList = () => {
    const [allChats, setAllChats] = useState([
        {
          id: 1,
          name: "Gayathri",
          active: true,
          isOnline: true,
          messages: [ // Define messages for each chat
            { sender: "Gayathri", text: "Hello!" },
            { sender: "Bastian", text: "Hi there!" }
          ]
        },
        {
          id: 2,
          name: "Bastian",
          active: false,
          isOnline: false,
          messages: []
        },
        {
            id: 3,
            name: "Tejas",
            active: false,
            isOnline: false,
            messages: []
          },
          {
            id: 4,
            name: "George",
            active: false,
            isOnline: false,
            messages: []
          },
          {
            id: 5,
            name: "Zoe",
            active: false,
            isOnline: false,
            messages: []
          }
    ]); 
    
    const [selectedChatId, setSelectedChatId] = useState(null);

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
