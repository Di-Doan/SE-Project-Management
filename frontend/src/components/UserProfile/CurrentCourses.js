import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileStyle from "./UserProfile.module.css";
import { jwtDecode } from "jwt-decode";
import defaultAva from "../../assets/avatar.jpg";
import UserProfileSideBar from "../UserProfileSideBar/UserProfileSideBar";
import axiosInstance from "../../ultilities/axiosInstance";
import { NavLink, Outlet } from "react-router-dom";
import "../UserProfileSideBar/UserProfileSideBar.css";
import { ReactComponent as MenuIcon } from "../../assets/menu-icon.svg";

function CurrentCourses() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [courses, setCourses] = useState([]);

  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  if (auth) {
    window.location = "/login";
  }

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      console.log(response.data.user.courses);
      setUser(response.data.user);
      setCourses(response.data.user.courses);
    } catch (error) {
      if (error) {
        setAuth(true);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/signout", authTokens);
      localStorage.removeItem("authTokens");
      window.location = "/profile";
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    let toggle = document.querySelector(".toggle");
    let sideNav = document.querySelector(".side-nav");
    let adminMain = document.querySelector(".admin-main");
    toggle.classList.toggle("active");
    sideNav.classList.toggle("active");
    adminMain.classList.toggle("active");
    console.log(courses);
  };

  return (
    <div>
      <div>
        <div className="side-nav">
          <ul>
            <li className="side-nav-link logo-container">
              <span className="side-nav-icon">
                <em className="fas fa-bold"></em>
              </span>
              <span className="title">RMIT </span>
            </li>
            <li className="side-nav-link">
              <NavLink to="/profile">
                <span className="side-nav-icon">
                  <em className="fas fa-home"></em>
                </span>
                <span className="title">User Profile</span>
              </NavLink>
            </li>
            <li className="side-nav-link">
              <NavLink to="/current-courses">
                <span className="side-nav-icon">
                  <em className="fas fa-ad"></em>
                </span>
                <span className="title">Current Courses</span>
              </NavLink>
            </li>
            <li className="side-nav-link">
              <NavLink to="/admin/users">
                <span className="side-nav-icon">
                  <em className="fas fa-user"></em>
                </span>
                <span className="title">Manage Team</span>
              </NavLink>
            </li>
            <li className="side-nav-link">
              <NavLink to="https://mytimetable.rmit.edu.vn/odd/student">
                <span className="side-nav-icon">
                  <em className="fas fa-file"></em>
                </span>
                <span className="title">Edit Time</span>
              </NavLink>
            </li>

            <li className="side-nav-link" id="sign-out-link">
              <span className="side-nav-icon">
                <em className="fas fa-sign-out"></em>
              </span>
              <button className="title" onClick={signOut}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
        <div className="admin-main">
          <div className="profile-top-bar">
            <div className="toggle" onClick={() => toggleMenu()}>
              <MenuIcon />
            </div>
          </div>
          <div>
            <div>
              <h1>Current Courses</h1>
            </div>

            <div>
              {courses
                .filter((filtered) => filtered.status == 1)
                .map((item) => (
                  <div className={ProfileStyle.courses}>{item.name}</div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentCourses;
