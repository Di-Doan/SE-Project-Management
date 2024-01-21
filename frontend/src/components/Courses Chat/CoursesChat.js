import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Message from './Message';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import axiosInstance from '../../ultilities/axiosInstance.js';
import axios from 'axios';
import './CoursesChat.css';

const CoursesChat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [courseUsers, setCourseUsers] = useState([]);
  const [user, setUser] = useState({});
  const { course_id } = useParams();

  const handleRoomChange = (group) => {
    setSelectedGroup(group);
    setMessages([]); // Reset messages when changing rooms
  };

  // Function to add a new message
  const addMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      user: user.fullname,
      text: text
    };
    setMessages([...messages, newMessage]);
  };

  const fetchCourseUsers = async () => {
    try {
      const response = await axiosInstance.get(`/courses/${course_id}/students`);
      setCourseUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getChat = async () => {
    try {
      const response = await axiosInstance.get(`/courses/${chat_id}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/profile');
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
      <div className="chat">
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
