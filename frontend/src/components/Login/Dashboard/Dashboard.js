// Import necessary dependencies
import React from 'react';
import './Dashboard.css';  // Import your CSS for styling
import rmitLogo from './rmit-logo.png';  // Import the RMIT logo

// Sample data for courses
const coursesData = [
  { id: 1, title: 'Introduction to Programming', instructor: 'John Smith', schedule: 'Mon, Wed', time: '9:00 AM - 11:00 AM' },
  { id: 2, title: 'Practical Database Concept', instructor: 'Jane Doe', schedule: 'Tue, Thu', time: '1:00 PM - 3:00 PM' },
  { id: 3, title: 'Programming 1', instructor: 'Alex Johnson', schedule: 'Mon, Wed', time: '2:00 PM - 4:00 PM' },
  { id: 4, title: 'Building IT Systems', instructor: 'Emily Brown', schedule: 'Tue, Thu', time: '10:00 AM - 12:00 PM' },
  // Add more courses as needed
];

// Course component to render individual course details
const Course = ({ course }) => (
  <div className="course">
    <h3>{course.title}</h3>
    <p>Instructor: {course.instructor}</p>
    <p>Schedule: {course.schedule}</p>
    <p>Time: {course.time}</p>
  </div>
);

// CourseGrid component to render all courses in rows
const CourseGrid = ({ courses }) => (
  <div className="course-grid">
    {courses.map(course => (
      <Course key={course.id} course={course} />
    ))}
  </div>
);

// Dashboard component to render the entire dashboard
const Dashboard = () => (
  <div className="dashboard">

    {/* Top Section */}
    <div className="top-section">
      {/* User Profile Picture */}
      <img src="path-to-profile-picture.png" alt="User Profile" className="user-profile" />

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search or Type" />
        <button type="button">Search</button>
      </div>
    </div>

    {/* RMIT Logo */}
    <img src={rmitLogo} alt="RMIT Logo" className="rmit-logo" />

    {/* Courses Section */}
    <div className="courses-section">
      <h2>All Courses</h2>
      <CourseGrid courses={coursesData} />
    </div>

    {/* Right-side Navigator */}
    <div className="navigator">
      <p><a href ="#dashboard">Dashboard</a></p>
      <p><a href ="#courses">Courses</a></p>
      <p><a href ="#planning">Planning</a></p>
      <p><a href ="#user-profile">User Profile</a></p>
    </div>
  </div>
);

export default Dashboard;
