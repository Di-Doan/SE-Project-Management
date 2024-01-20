// Message.js
import React from 'react';

const Message = ({ sender, message }) => {
  return (
    <div className="message">
      <div className="message-content">
        <div className='message-user'>{sender}</div>
        <div className="message-text">{message}</div>
      </div>
    </div>
  );
};

export default Message;
