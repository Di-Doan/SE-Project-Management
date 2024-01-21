import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import axiosInstance from '../../ultilities/axiosInstance.js';

import Message from './Message';
import MessageInput from './MessageInput';
import RightSidebar from './RightSidebar';
import './CoursesChat.css';

const CoursesChat = () => {
	const { user } = useOutletContext();
	const [messages, setMessages] = useState([]);
	const [courseUsers, setCourseUsers] = useState([]);
	const { course_id, chat_id } = useParams();

	// Function to add a new message
	const addMessage = (text) => {
		const newMessage = {
			id: messages.length + 1,
			user: user.fullname,
			text: text,
		};
		setMessages([...messages, newMessage]);
	};

	const getCourseUsers = async () => {
		try {
			const response = await axiosInstance.get(`/courses/${course_id}/students`);
			setCourseUsers(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const getChat = async () => {
		try {
			const response = await axiosInstance.get(`/chat/${chat_id}`);
			setMessages(response.data.messages);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCourseUsers();
		getChat();
	}, []);

	return (
		<>
			<div className='chat'>
				<div className='chat-messages'>
					{messages.map((message) => (
						<Message key={message.id} user={message.user} text={message.text} />
					))}
				</div>
				<MessageInput onSendMessage={addMessage} />
			</div>
			<RightSidebar users={courseUsers} />
		</>
	);
};

export default CoursesChat;
