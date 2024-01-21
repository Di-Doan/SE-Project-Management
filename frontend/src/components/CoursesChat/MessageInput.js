// MessageInput.js
import React, { useState } from 'react';
import classes from './CoursesChat.module.css';

const MessageInput = ({ onSendMessage }) => {
	const [messageText, setMessageText] = useState('');

	const handleSendMessage = async () => {
		if (messageText.trim() !== '') {
			onSendMessage(messageText);
			setMessageText('');
		}
	};

	return (
		<div className={classes['message-input']}>
			<input
				type='text'
				value={messageText}
				onChange={(e) => setMessageText(e.target.value)}
				placeholder='Type a message...'
			/>
			<button onClick={handleSendMessage}>Send</button>
		</div>
	);
};

export default MessageInput;
