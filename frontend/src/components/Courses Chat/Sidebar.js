// Sidebar.js
import React from 'react';
import ChannelList from './ChannelList';
import './Sidebar.css'; // Import the corresponding CSS file
import ava1 from "../../assets/avatar2.jpg";

const Sidebar = () => {
      // Dummy user data (replace with actual user data)
  const user = {
    avatar: <img src={ava1} />,
    name: 'John Doe',
  };
  return (
      <div className="sidebar">
          <div className="sidebar-item">Announcement Room</div>
          <div className="sidebar-item">Courses Room</div>
          <div className="sidebar-item sub-item">Group 1</div>
          <div className="sidebar-item sub-item">Group 2</div>
          <div className="user-info">
              <img src={user.avatar} alt="User Avatar" className="user-avatar" />
              <div className="user-name">{user.name}</div>
          </div>
      </div>
  );
};

export default Sidebar;
