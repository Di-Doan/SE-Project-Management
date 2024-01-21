import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DirectChatSidebar from "./DirectChatSidebar";
import style from "./DirectChatPage.css";
import ava1 from "../../assets/avatar2.jpg";
import axiosInstance from '../../ultilities/axiosInstance'; // Import axiosInstance

const DirectChatPage = ({ loggedInUserId, otherUserId }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      setUser(response.data.user);
    } catch (error) {
      if (error) {
        setAuth(true);
      }
    }
  };

  useEffect(() => {
    getData();
    fetchMessages(loggedInUserId, otherUserId);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`/friends`);;
      setMessages(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMessage = (text) => {
    const newMessage = {
      user: user.fullname,
      text: text,
    };
    setMessages([...messages, newMessage]);
    sendMessage(newMessage);
  };

  const sendMessage = async (message) => {
    try {
      await axiosInstance.post("/friends", {
        sender_id: loggedInUserId,
        receiver_id: otherUserId,
        text: message.text,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      addMessage(messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const getCurrentVietnamTime = () => {
    const options = { timeZone: 'Asia/Ho_Chi_Minh', hour: 'numeric', minute: 'numeric' };
    return new Date().toLocaleString('en-US', options);
  };

  return (
    <div className="direct-chat-container">
      <DirectChatSidebar />
      <div className="main-content">
        <div className="top-bar">
          <div className="sender-info">
            <div className="sender-avatar">
              <img src={ava1} alt="Sender Avatar" />
            </div>
            <div className="sender-name">{user.fullname}</div>
          </div>
          <button className="call-button">Call</button>
        </div>
        <div className="direct-chat-page">
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.user === user.fullname ? "user-message" : "sender-message"
                }`}
              >
                <div className="message-avatar">
                  {message.user !== user.fullname && (
                    <img src={ava1} alt="Sender Avatar" />
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div
                    className={`${
                      message.user === user.fullname
                        ? "message-time-user"
                        : "message-time"
                    }`}
                  >
                    {getCurrentVietnamTime()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="message-input-container">
            <div className="message-input">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
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
            <img src={ava1} alt="Sender Avatar" />
          </div>
          <div className="right-sender-details">
            <div className="right-sender-name">{user.fullname}</div>
            <div className="right-user-profile">
              <Link to="/profile">
                <button className="profile-button">View profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectChatPage;