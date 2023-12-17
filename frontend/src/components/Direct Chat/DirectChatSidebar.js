// DirectChatSidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './DirectChatSidebar.css'
import ava1 from "../../assets/avatar2.jpg";

const DirectChatSidebar = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'John Doe', lastMessage: 'Hello there!', unreadCount: 0 },
    { id: 2, name: 'Alice Smith', lastMessage: 'How are you?', unreadCount: 1 },
    // Add more chat objects as needed
  ]);

  return (
    <div className="direct-chat-sidebar">
      <div className="chat-list">
        {chats.map((chat) => (
          <Link to={`/chat/${chat.id}`} key={chat.id} className="chat-item">
            <div className="chat-avatar"><img src={ava1} /></div>
            <div className="chat-details">
              <div className="chat-name">{chat.name}</div>
              <div className="last-message">{chat.lastMessage}</div>
            </div>
            {chat.unreadCount > 0 && (
              <div className="unread-count">{chat.unreadCount}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DirectChatSidebar;
