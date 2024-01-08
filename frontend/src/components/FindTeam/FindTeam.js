import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import defaultAva from "../../assets/avatar.jpg";
import axiosInstance from "../../ultilities/axiosInstance";
import TeamStyle from "./FindTeam.module.css";
import GroupBox from "./GroupBox";

function FindTeam() {
  return (
    <div className={TeamStyle.body}>
      <div className="profile-top-bar">
        <div className={TeamStyle.topLink}>
          <Link className={TeamStyle.link} to="/people">
            People
          </Link>
          <Link className={TeamStyle.link} to="/team">
            Team
          </Link>
        </div>
      </div>
      <div className={TeamStyle.createGroupBtn}>
        <button className={TeamStyle.createBtn}>Create Group</button>
      </div>

      <div className={TeamStyle.groupFilter}>
        <select className={TeamStyle.groupSelect} name="team-sort" id="team-sort">
          <option defaultChecked value="All">All</option>
          <option value="gpa">GPA</option>
          <option value="availability">Availability</option>
          <option value="tutorial">Tutorial Group</option>
        </select>
      </div>

      <div className={TeamStyle.groupList}>
        <GroupBox group="1"></GroupBox>
        <GroupBox group="2"></GroupBox>
        <GroupBox group="3"></GroupBox>
      </div>
    </div>
  );
}

export default FindTeam;
