// Sidebar.js
import React from 'react';
import './Sidebar.css'; // Import the corresponding CSS file
import ava1 from "../../assets/avatar2.jpg";

const Sidebar = ({onSelectGroup}) => {
      // Dummy user data (replace with actual user data)
  const user = {
    avatar: <img src={ava1} />,
    name: 'John Doe',
  };
  const courses = [
    {
        name: 'Announcement Room',
        groups: [], // No sub-groups for Announcement Room
      },
    {
      name: 'Courses Room 1',
      groups: ['Group 1', 'Group 2'],
    },
    // Add more courses as needed
  ];
  
  return (
      <div className="sidebar">
      {courses.map((course) => (
        <div key={course.name} className="sidebar-item">
          {course.name}
          {course.groups && (
            <div className="sub-groups">
              {course.groups.map((group) => (
                <div key={group} className="sidebar-item sub-item" onClick={() => onSelectGroup(group)}>
                  {group}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
          {/* User's avatar and name at the bottom */}
          <div className="user-details">
              <div className="user-avatar">
                  <img src={user.avatar} alt="User Avatar" />
              </div>
              <div className="user-name">{user.name}</div>
          </div>
      </div>
      
  );
};

export default Sidebar;
