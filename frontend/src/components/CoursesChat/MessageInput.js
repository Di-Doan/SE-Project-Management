// MessageInput.js
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
	const [messageText, setMessageText] = useState('');

	const handleSendMessage = async () => {
		if (messageText.trim() !== '') {
			onSendMessage(messageText);
			setMessageText('');
		}
	};

	return (
		<div className='message-input'>
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
