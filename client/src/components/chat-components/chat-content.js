import React, { useState } from 'react';
import './chat-content.css';
import axios from 'axios';

const ChatContent = ({ messages }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleMessageSend = () => {
        if (newMessage.trim() !== '') {
            // Send message to the backend
            axios.post('/api/messages/addmsg', {
                message: newMessage,
            })
            .then(response => {
                // Message added successfully, update component state or perform any additional actions
                console.log('Message sent successfully:', response.data);
                // You can update the component state or perform any additional actions here
                // For example, clear the input field after sending the message
                setNewMessage('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
        }
    };

    return (
        <div className='chat-content'>
            {/* Display chat messages here */}
            {messages.map((message, index) => (
                <div key={index} className="message">
                    <div className="sender">{message.sender}</div>
                    <div className="text">{message.text}</div>
                </div>
            ))}
            
            {/* Text box for inputting messages */}
            <div className="message-input">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleMessageSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatContent;
