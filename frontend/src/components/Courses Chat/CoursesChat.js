// Chat.js
import React, { useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import './CoursesChat.css';

const CoursesChat = () => {
    const [messages, setMessages] = useState([
      { id: 1, user: 'Bill Jay', text: 'Hello, welcome to the Courses Chat!' },
      { id: 2, user: 'Alice Smith', text: 'Hi there!' },
      // Add more initial messages as needed
    ]);

    const addMessage = (text) => {
        const newUser = 'John Doe'; // Replace with the actual user's name
        setMessages([...messages, { id: messages.length + 1, user: newUser, text }]);
      };

  return (
      <div className="chat-container">
        <Sidebar />
          <div className='chat'>
              <div className="chat-messages">
                  {messages.map((message) => (
                      <Message key={message.id} user={message.user} text={message.text} />
                  ))}
              </div>
              <MessageInput onSendMessage={addMessage} />
          </div>
      </div>
  );
};

export default CoursesChat;
