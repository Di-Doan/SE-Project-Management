import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faBookOpen,
  faCommentDots,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import CourseModal from "../Modal/CourseModal.js";

import axiosInstance from "../../ultilities/axiosInstance.js";
import rmitLogo from "../Dashboard/rmit-logo.png";
import classes from "./Sidebar.module.css"; // Replace with your actual stylesheet

const Sidebar = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState();
  const [modal, setModal] = useState(false);
  const handleShow = () => {
    setModal(true);
  };

  const signOut = async (e) => {
    e.preventDefault();
    const authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : {};

    try {
      axiosInstance.post("/auth/signout", {
        refreshToken: authTokens.refreshToken,
      });
      localStorage.removeItem("authTokens");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getCourses = async () => {
    try {
      const response = await axiosInstance.get("/courses");
      setCourses(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className={`${classes.sidebar} d-flex flex-column shadow`}>
      <CourseModal modal={modal} setModal={setModal} course={courses} />
      <img
        src={rmitLogo}
        alt="RMIT Logo"
        className={`${classes.RMITLogo_Horizontal1} m-4`}
      />

      <NavLink
        to="/dashboard"
        className={`text-primary-emphasis text-danger-hover text-decoration-none d-flex align-items-center gap-3 py-2 px-4 fs-5 rounded-end-pill ${classes.navlink}`}
      >
        <FontAwesomeIcon icon={faHouseChimney} />
        Dashboard
      </NavLink>
      <div
        onClick={handleShow}
        className={`text-primary-emphasis text-decoration-none d-flex align-items-center gap-3 py-2 px-4 fs-5 rounded-end-pill ${classes.navlink}`}
      >
        <FontAwesomeIcon icon={faBookOpen} />
        Courses
      </div>
      <NavLink
        to="/messages"
        className={`text-primary-emphasis text-decoration-none d-flex align-items-center gap-3 py-2 px-4 fs-5 rounded-end-pill ${classes.navlink}`}
      >
        <FontAwesomeIcon icon={faCommentDots} />
        Messages
      </NavLink>
      <div className="ms-3 mt-3 mb-2">Account</div>
      <NavLink
        to="/profile"
        className={`text-primary-emphasis text-decoration-none d-flex align-items-center gap-3 py-2 px-4 fs-5 rounded-end-pill ${classes.navlink}`}
      >
        <FontAwesomeIcon icon={faUser} />
        Profile
      </NavLink>
      <button
        onClick={signOut}
        className={`text-primary-emphasis text-decoration-none d-flex align-items-center gap-3 py-2 px-4 fs-5 rounded-end-pill border-0 bg-transparent ${classes.navlink}`}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
