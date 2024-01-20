// Group1.js
import React, { useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import RightSidebar from './RightSidebar';

const Group1 = ({ initialMessages }) => {
  const [group1Messages, setGroup1Messages] = useState(initialMessages);

  const addMessage = (text) => {
    const newUser = 'John Doe'; // Replace with the actual user's name
    setGroup1Messages([...group1Messages, { id: group1Messages.length + 1, user: newUser, text }]);
  };

  const group1Users = [
    { id: 1, name: 'Group1User1', avatar: 'url-to-avatar1' },
    { id: 2, name: 'Group1User2', avatar: 'url-to-avatar2' },
    // Add more group users as needed
  ];

  return (
    <div className='chat-container'>
      {group1Messages.map((message) => (
        <Message key={message.id} user={message.user} text={message.text} />
      ))}
      <MessageInput onSendMessage={addMessage} />
      <RightSidebar users={group1Users} /> {/* Pass the list of group users */}
    </div>
  );
};

export default Group1;
