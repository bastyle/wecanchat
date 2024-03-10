import React from 'react';
import './chat-content.css';

const ChatContent = ({ messages }) => {
    // Provide a default value for messages if it's undefined
    const messagesToDisplay = messages || [];

    return (
        <div className='chat-content'>
            {/* Display chat messages here */}
            {messagesToDisplay.map((message, index) => (
                <div key={index} className="message">
                    <div className="sender">{message.sender}</div>
                    <div className="text">{message.text}</div>
                </div>
            ))}
        </div>
    );
}

export default ChatContent;
