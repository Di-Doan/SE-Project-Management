import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileStyle from "./UserProfile.module.css";
import defaultAva from "../../assets/avatar.jpg";
import UserProfileSideBar from "../UserProfileSideBar/UserProfileSideBar";

function UserProfile() {
  return (
    <div>
      <UserProfileSideBar />
      <div>
        <div className={ProfileStyle.userProfile}>User Profile</div>
        <div className={ProfileStyle.vector75}></div>
        <div className={ProfileStyle.group16}>
          <img src={defaultAva} className={ProfileStyle.icon2} />
        </div>
        <div className={ProfileStyle.fullName}>Full Name</div>
        <div className={ProfileStyle.major}>Major</div>

        <div className={ProfileStyle.row3}>
          <button className={ProfileStyle.uploadPhoto}>Upload New Photo</button>
          <button className={ProfileStyle.delete}>Delete</button>
        </div>
      </div>

      <div>
        <div className={ProfileStyle.firstName}>First Name</div>
        <div className={ProfileStyle.nameField}></div>
        <div className={ProfileStyle.egAlaa}>eg. Alaa</div>
        <div className={ProfileStyle.lastName}>Last Name</div>
        <div className={ProfileStyle.nameField2}></div>
        <div className={ProfileStyle.egMohamed}>eg. Mohamed</div>
      </div>

      <div>
        <div className={ProfileStyle.emailAddress}>Email Address</div>
        <div className={ProfileStyle.studentEmail}>Student mail</div>
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
        <button className={ProfileStyle.saveButton}>Save Changes</button>
        <button className={ProfileStyle.cancelButton}>Cancel</button>
      </div>
    </div>
  );
}

export default UserProfile;
