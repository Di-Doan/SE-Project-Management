import React from 'react';

const Message = ({ user, text }) => {
  return (
    <div className="message">
      <div className="message-content">
        <div className='message-user'>{user}</div>
        <div className="message-text">{text}</div>
      </div>
    </div>
  );
};

export default Message;
