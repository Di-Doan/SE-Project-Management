// DirectChatPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DirectChatSidebar from "./DirectChatSidebar"; // Adjust the path accordingly
import style from "./DirectChatPage.css";
import ava1 from "../../assets/avatar2.jpg";
import ava2 from "../../assets/avatar3.jpg";

const DirectChatPage = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null); // Set initial state to null
  const [messageText, setMessageText] = useState("");

  // Simulated useEffect to fetch chat data
  useEffect(() => {
    // Simulating fetching chat data from an API or other source
    // For simplicity, we set some initial data directly
    const initialChatData = {
      name: "John Doe", // Replace with actual chat data
      messages: [
        { id: 1, sender: "John Doe", text: "Hello there!" },
        // Add more messages as needed
      ],
    };

    setChat(initialChatData);
  }, [id]);

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      const newMessage = {
        id: chat.messages.length + 1,
        sender: "User",
        text: messageText,
      };

      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));

      // Reset message text after sending
      setMessageText("");
    }
  };

  if (!chat) {
    return <div>Loading...</div>; // Add loading state or spinner
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="direct-chat-container">
      <DirectChatSidebar />
      <div className="main-content">
        <div className="top-bar">
          <div className="sender-info">
            <div className="sender-avatar">
              {" "}
              {/* Add sender's avatar here */}
            </div>
            <div className="sender-name">{chat.name}</div>
          </div>
          <button className="call-button">Call</button>
        </div>
        <div className="direct-chat-page">
          <div className="chat-header">
            <div className="chat-avatar"> {/* Add avatar here */}</div>
          </div>

          <div className="chat-messages">
            {/* Render chat messages here */}
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={`message-box ${
                  message.sender === "User" ? "user-message" : "sender-message"
                }`}
              >
                <div className="message-avatar">
                  {/* Add sender's avatar here */}

                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input field for typing messages */}
          <div className="message-input-container">
            <div className="message-input">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress} /* Add the onKeyPress event */
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage} className="send-button">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="right-sidebar">
        <div className="right-sender-info">
          <div className="right-sender-avatar">
            <img src="path-to-avatar-image" alt="Sender Avatar" />
          </div>
          <div className="right-sender-details">
            <div className="right-sender-name">Sender Name</div>
            <div className="right-user-profile">
              <Link to="/profile">View profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectChatPage;
