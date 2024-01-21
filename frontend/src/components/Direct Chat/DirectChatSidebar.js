// DirectChatSidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './DirectChatSidebar.css';
import ava1 from '../../assets/avatar2.jpg';

const DirectChatSidebar = ({ friends }) => {
	return (
		<div className='direct-chat-sidebar'>
			<div className='chat-list'>
				{friends.map((chat) => (
					<NavLink
						to={`/messages/${chat.chatId}`}
						key={chat.id}
						className='chat-item text-decoration-none text-light'
					>
						<div className='chat-avatar'>
							<img src={ava1} alt='user avatar' />
						</div>
						<div className='chat-details'>
							<div className='chat-name'>{chat.friend.fullname}</div>
						</div>
						{chat.unreadCount > 0 && <div className='unread-count'>{chat.unreadCount}</div>}
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default DirectChatSidebar;
