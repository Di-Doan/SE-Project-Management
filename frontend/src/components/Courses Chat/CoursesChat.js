// CoursesChat.js
import React, { useState, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import Group1 from './Group1';
import RightSidebar from './RightSidebar';
import axiosInstance from '../../ultilities/axiosInstance.js';
import { jwtDecode } from "jwt-decode";
import './CoursesChat.css';

const CoursesChat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [courseUsers, setCourseUsers] = useState([]);

  const handleRoomChange = (group) => {
    setSelectedGroup(group);
    setMessages([]); // Reset messages when changing rooms
  };

  const addMessage = async (text) => {
    const newUser = 'John Doe'; // Replace with the actual user's name
  
    try {
      const response = await axiosInstance.post(`/chat/${user.id}`, {
        text,
        user: newUser,
        userId: user.id, // Add the user ID to the message data
        // other necessary data
      });
  
      // Update the state with the newly added message
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchCourseUsers = async () => {
    try {
      const response = await axiosInstance.get("/courses");
      setCourseUsers(response.data); // Assuming the response contains an array of course users
    } catch (error) {
      console.error(error);
    }
  };

  const getChat = async () => {
    try {
      const response = await axiosInstance.get("/chat");
      setChat(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch course users when the component mounts
    fetchCourseUsers();
    getChat();
    addMessage();
  }, []);

  return (
    <div className="chat-container">
      <Sidebar onSelectGroup={handleRoomChange} />
      <div className='chat'>
        <div className="chat-messages">
          {messages.map((message) => (
            <Message key={message.id} user={message.user} text={message.text} />
          ))}
          {selectedGroup === 'group1' && <Group1 />}
          {/* Add similar conditions for other groups if needed */}
        </div>
        <MessageInput onSendMessage={addMessage} />
      </div>
      <RightSidebar users={courseUsers} />
    </div>
  );
};

export default CoursesChat;
