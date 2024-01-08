// CoursesChat.js
import React, { useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import Group1 from './Group1';
import RightSidebar from './RightSidebar';
import './CoursesChat.css';

const CoursesChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Bill Jay', text: 'Hello, welcome to the Courses Chat!' },
    { id: 2, user: 'Alice Smith', text: 'Hi there!' },
    // Add more initial messages as needed
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleRoomChange = (group) => {
    setSelectedGroup(group);
    // You may fetch messages for the selected room here
    // For simplicity, I'm setting messages to an empty array
    setMessages([]);
  };

  const addMessage = (text) => {
    const newUser = 'John Doe'; // Replace with the actual user's name
    setMessages([...messages, { id: messages.length + 1, user: newUser, text }]);
  };

  const initialGroup1Messages = [
    { id: 1, user: 'Group1User1', text: 'Welcome to Group 1 Chat!' },
    { id: 2, user: 'Group1User2', text: 'This is an initial message.' },
    // Add more initial messages for Group 1 as needed
  ];

  const courseUsers = [
    { id: 1, name: 'Alice Smith', avatar: 'url-to-avatar1' },
    { id: 2, name: 'Bill Jay', avatar: 'url-to-avatar2' },
    { id: 3, name: 'John Doe', avatar: 'url-to-avatar3' },
    // Add more course users as needed
  ];

  return (
    <div className="chat-container">
      <Sidebar onSelectGroup={handleRoomChange} />
      <div className='chat'>
        <div className="chat-messages">
          {selectedGroup === 'group1' ? (
            <Group1 initialMessages={initialGroup1Messages} />
          ) : (
            messages.map((message) => (
              <Message key={message.id} user={message.user} text={message.text} />
            ))
          )}
          {/* Add similar conditions for other groups if needed */}
        </div>
        <MessageInput onSendMessage={addMessage} />
      </div>
      <RightSidebar users={courseUsers} /> {/* Pass the list of course users */}
    </div>
  );
};

export default CoursesChat;
