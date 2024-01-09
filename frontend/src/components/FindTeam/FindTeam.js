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
  const [teamId, setTeamId] = useState();
  const [filter, setFilter] = useState("all");
  const course = "8";

  if (auth) {
    window.location = "/login";
  }

  const getUser = async () => {
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
    getUser();
    getTeamId();
    getTeam();
  }, []);

  const getTeam = async () => {
    try {
      const response = await axiosInstance.get(`/courses/${course}/teams`);
      setTeam(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamId = async () => {
    try {
      const response = await axiosInstance.get(`/courses/${course}/teamId`);
      setTeamId(response.data);
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
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option defaultChecked value="all">
            All
          </option>
          <option value="availability">Availability</option>
        </select>
      </div>

      <div className={TeamStyle.groupList}>
        {team
          .filter((item) => {
            if (filter == "availability") {
              return item.memberCount < 4;
            } else {
              return item;
            }
          })
          .map((item) => (
            <GroupBox
              name={item.name}
              member={item.memberCount}
              teamId={item.id}
              courseId={course}
              id={teamId}
            ></GroupBox>
          ))}
      </div>
    </div>
  );
}

export default FindTeam;
