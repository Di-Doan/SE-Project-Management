import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileStyle from "./UserProfile.module.css";
import { jwtDecode } from "jwt-decode";
import defaultAva from "../../assets/avatar.jpg";
import UserProfileSideBar from "../UserProfileSideBar/UserProfileSideBar";
import axiosInstance from "../../ultilities/axiosInstance";

function UserProfile() {
  const [user, setUser] = useState({course: [], email: "", fullname: "", gpa: "", showGPA: 0, id: 0, mobile: "", rmitSID: ""});
  const [gpa, setGpa] = useState();
  const [oldData, setOldData] = useState();

  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  if (!authTokens) {
    window.location = "/login";
  } else {
    const token = jwtDecode(authTokens.accessToken);
  }

  const getData = async () => {
        try {
      const response = await axiosInstance.get("/profile");
      console.log(response);
          setUser(response.data.user)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    getData();
  }, []);

  const showGPA = () => {};

  const saveChanges = () => {};

  const cancelChanges = () => {
    setUser(oldData);
  };

  return (
    <div>
      <UserProfileSideBar />
      <div>
        <div className={ProfileStyle.userProfile}>User Profile</div>
        <div className={ProfileStyle.vector75}></div>
        <div className={ProfileStyle.group16}>
          <img src={defaultAva} className={ProfileStyle.icon2} />
        </div>
        <div className={ProfileStyle.fullName}>
          {user.fullname ? user.fullname : "Full Name"}
        </div>

        <div className={ProfileStyle.row3}>
          <button className={ProfileStyle.uploadPhoto}>Upload New Photo</button>
          <button className={ProfileStyle.delete}>Delete</button>
        </div>
      </div>

      <div>
        <div className={ProfileStyle.firstName}>Full Name</div>
        <div className={ProfileStyle.nameField}></div>
        <div className={ProfileStyle.egAlaa}>
          {user.fullname ? user.fullname : "Student Name"}
        </div>
        <div className={ProfileStyle.lastName}>Mobile number</div>
        <div className={ProfileStyle.nameField2}></div>
        <div className={ProfileStyle.egMohamed}>
          {user.mobile ? user.mobile : "Student Phone Number"}
        </div>
      </div>

      <div>
        <div className={ProfileStyle.emailAddress}>Email Address</div>
        <div className={ProfileStyle.studentEmail}>
          {user.email ? user.email : "Student Mail"}
        </div>
      </div>

      <div>
        <div className={ProfileStyle.introductionToMangagment}>
          Introduction to Mangagment
        </div>
        <div className={ProfileStyle.buildingITSystem}>Building IT system</div>
        <div className={ProfileStyle.userDesign}>User-Design</div>
        <div className={ProfileStyle.currentCourse}>Current Course</div>
      </div>

      <div>
        <div className={ProfileStyle.currentGPA}>Current GPA</div>
        <div className={ProfileStyle.studentGPA}>Student GPA</div>
        <input
          className={ProfileStyle.showGPA}
          type="radio"
          id="showGPA"
          name="showGPA"
          value="showGPA"
        />
        <label className={ProfileStyle.showGPALabel} for="showGPA">
          {" "}
          Show GPA
        </label>
      </div>

      <div>
        <button className={ProfileStyle.saveButton}>Save Changes</button>
        <button className={ProfileStyle.cancelButton}>Cancel</button>
      </div>
    </div>
  );
}

export default UserProfile;
