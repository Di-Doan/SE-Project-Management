// Sidebar.js
import React, { useState, useEffect } from 'react';
import './Sidebar.css'; // Import the corresponding CSS file
import axiosInstance from '../../ultilities/axiosInstance.js';
import axios from "axios";
import ava1 from "../../assets/avatar2.jpg";

const Sidebar = ({ onSelectGroup }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);

  if (auth) {
    window.location = "/login";
  }
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
  }, []);

  return (
    <div className="sidebar">
      <div className='announcement-room'>Announcement room</div>
      <div className="BuildingITSystem">
        <div
          className='course'
          onClick={() => onSelectGroup('Tutorial 1')}
        >
          {user && user.courses && user.courses[0] ? user.courses[0].name : "empty"}
        </div>
        <div className='sub-groups'>
          <div
            className='sub-group'
            onClick={() => onSelectGroup('Tutorial 1')}
          >
            Tutorial 1
          </div>
          <div
            className='sub-group'
            onClick={() => onSelectGroup('Tutorial 2')}
          >
            Tutorial 2
          </div>
        </div>
      </div>
      
      {/* User's avatar and name at the bottom */}
      <div className="user-details">
        <div className="user-avatar">
          <img src={ava1} alt="User Avatar" />
        </div>
        <div className="user-name">
          {user.fullname ? user.fullname : "Full Name"}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
