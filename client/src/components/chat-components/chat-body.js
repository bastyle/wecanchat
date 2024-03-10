import React from 'react';
import './chat-body.css';
import ChatList from './chat-list';
import ChatContent from './chat-content';
import Navbar from '../Navbar';

const ChatBody = () => {
    return (
        <div>        
            <div>
                <Navbar />
            </div>
            <div className='chat-body'>

                <ChatList />
                <ChatContent />
            </div>
        </div>
    )
}

export default ChatBody; 