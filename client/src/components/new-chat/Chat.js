import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatApp = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const otherUserId = "65f78c4cd2ad73ad5eca86fd";

  useEffect(() => {
    const newUserId = "65d5421c8d9fae5fec125846";    
    setUserId(newUserId);
    // Connect user to socket
    
    socket.emit('user_connected', newUserId);   
    console.log('user_connected:', newUserId);

    // Handle incoming messages
    socket.on('receive_message', ({ from, message }) => {
      setReceivedMessage(`${from}: ${message}`);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', { from: userId, to: otherUserId, message });
    setMessage('');
  };

  return (
    <div>
      <h1>Chat App 1</h1>
      <p>Chat with user ID: {otherUserId}</p>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
      <p>{receivedMessage}</p>
    </div>
  );
};

export default ChatApp;
