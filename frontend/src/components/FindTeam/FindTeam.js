import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import defaultAva from "../../assets/avatar.jpg";
import axiosInstance from "../../ultilities/axiosInstance";
import TeamStyle from "./FindTeam.module.css";
import GroupBox from "./GroupBox";

function FindTeam() {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);
  const [team, setTeam] = useState([]);

  if (auth) {
    window.location = "/login";
  }

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      setUser(response.data.user);
      console.log(response.data.user);
    } catch (error) {
      if (error) {
        setAuth(true);
      }
    }
  };

  useEffect(() => {
    getUser();
    getTeam();
    
  }, []);

  const getTeam = async () => {
    try {
      const response = await axiosInstance.get("/courses/8/teams");
      setTeam(response.data.data)
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        <select
          className={TeamStyle.groupSelect}
          name="team-sort"
          id="team-sort"
        >
          <option defaultChecked value="All">
            All
          </option>
          <option value="availability">Availability</option>
          <option value="tutorial">Tutorial Group</option>
        </select>
      </div>

      <div className={TeamStyle.groupList}>
      {team.map((item) => (
        <GroupBox name={item.name} member={item.memberCount} teamId = {item.id} courseId = "8" ></GroupBox>
      ))}
      </div>
    </div>
  );
}

export default FindTeam;
