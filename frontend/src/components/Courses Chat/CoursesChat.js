// CoursesChat.js
import React, { useState, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import Group1 from './Group1';
import RightSidebar from './RightSidebar';
import axiosInstance from '../../ultilities/axiosInstance.js';
import './CoursesChat.css';

const CoursesChat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [courseUsers, setCourseUsers] = useState([]);
  const [user, setUser] = useState(null);

  const handleRoomChange = (group) => {
    setSelectedGroup(group);
    setMessages([]); // Reset messages when changing rooms
  };

  const addMessage = async (text) => {
    const newUser = 'John Doe';

    try {
      const response = await axiosInstance.post(`/chat/${user.id}`, {
        text,
        user: newUser,
        userId: user.id,
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
      setCourseUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getChat = async () => {
    try {
      const response = await axiosInstance.get("/chat");
      setMessages(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseUsers();
    getChat();
    fetchUser();
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
        </div>
        <MessageInput onSendMessage={addMessage} />
      </div>
      <RightSidebar users={courseUsers} />
    </div>
  );
};

export default CoursesChat;
