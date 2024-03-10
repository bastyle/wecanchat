import React from 'react';
import './chat-list.css';
import './chat-list-items.css';

const ChatListItems = ({ chat, onItemClick }) => {
    const handleItemClick = () => {
        onItemClick(chat.id); // Call the onItemClick function with chat id
    };

    return (
        <div className="chat-list-item" onClick={handleItemClick}>
            <div className={`status-dot ${chat.isOnline ? 'online' : 'offline'}`}></div>
            <div className="user-info">
                <div className="user-name">{chat.name}</div>
                <div className={`user-status ${chat.active ? 'active' : 'inactive'}`}>
                    {chat.active ? 'Active' : 'Inactive'}
                </div>
            </div>
        </div>
    );
}

export default ChatListItems;
