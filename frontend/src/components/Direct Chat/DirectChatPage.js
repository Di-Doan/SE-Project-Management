import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import axiosInstance from '../../ultilities/axiosInstance';

import ava1 from '../../assets/avatar2.jpg';
import DirectChatSidebar from './DirectChatSidebar';
import Message from '../CoursesChat/Message';
import MessageInput from '../CoursesChat/MessageInput';
import classes from '../CoursesChat/CoursesChat.module.css';
import './DirectChatPage.css';

const DirectChatPage = ({ loggedInUserId, otherUserId }) => {
	const { user } = useOutletContext();
	const { chat_id } = useParams();
	const [friends, setFriends] = useState([]);
	const [messages, setMessages] = useState([]);

	const fetchFriends = async () => {
		try {
			const response = await axiosInstance.get(`/friends`);
			setFriends(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const getChat = async () => {
		try {
			const response = await axiosInstance.get(`/chats/${chat_id}`);
			setMessages(response.data.chatLog);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchFriends();
	}, []);

	useEffect(() => {
		getChat(chat_id);
	}, [friends, chat_id]);

	const addMessage = (text) => {
		const newMessage = {
			id: messages.length + 1,
			sender: {
				id: user.id,
				fullname: user.fullname,
			},
			message: text,
		};
		setMessages([...messages, newMessage]);
		axiosInstance.post(`/chats/${chat_id}`, { message: text });
	};

	const handleSendMessage = (text) => {
		if (text.trim() !== '') {
			addMessage(text);
		}
	};

	const getCurrentVietnamTime = () => {
		const options = { timeZone: 'Asia/Ho_Chi_Minh', hour: 'numeric', minute: 'numeric' };
		return new Date().toLocaleString('en-US', options);
	};

	return (
		<div className='direct-chat-container'>
			<DirectChatSidebar friends={friends} />
			<div className={classes.chat}>
				<div className={`${classes['chat-messages']} d-flex flex-column-reverse h-100`}>
					{messages.map((message) => (
						<Message key={message.id} user={message.sender.fullname} text={message.message} />
					))}
				</div>
				<MessageInput onSendMessage={handleSendMessage} />
			</div>
			<div className='right-sidebar'>
				<div className='right-sender-info'>
					<div className='right-sender-avatar'>
						<img src={ava1} alt='Sender Avatar' />
					</div>
					<div className='right-sender-details'>
						<div className='right-sender-name'>{user.fullname}</div>
						<div className='right-user-profile'>
							<Link to='/profile'>
								<button className='profile-button'>View profile</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DirectChatPage;
