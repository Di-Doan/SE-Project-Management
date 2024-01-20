// RightSidebar.js
import React from 'react';
import axios from "axios";
import './RightSidebar.css';

const RightSidebar = ({ users }) => {
  return (
    <div className="right-sidebar">
      <h2>Users</h2>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (users.map((user) => (
          <li key={user.id}>
            <div className="user-avatar">
              <img src={user.avatar} alt={`Avatar of ${user.name}`} />
            </div>
            <div className="user-name">{user.name}</div>
          </li>
        ))
      ) : (
        <li>No users available</li>
      )}
      </ul>
    </div>
  );
};

export default RightSidebar;
