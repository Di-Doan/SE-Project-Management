import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileStyle from "./UserProfile.module.css";
import { jwtDecode } from "jwt-decode";
import defaultAva from "../../assets/avatar.jpg";
import UserProfileSideBar from "../UserProfileSideBar/UserProfileSideBar";
import axiosInstance from "../../ultilities/axiosInstance";

function CurrentCourses() {
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
        <div className={ProfileStyle.body}>
            <UserProfileSideBar/>
            <div >
                <div>Current Courses</div>
            
            </div>
            
        </div>
      )
}

export default CurrentCourses;