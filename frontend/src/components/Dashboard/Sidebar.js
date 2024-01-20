import React from "react";
import axiosInstance from "../../ultilities/axiosInstance.js";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./home-icon.svg";
import { Group1000004376Icon } from "./Group1000004376Icon.tsx";
import { Group1000004379Icon } from "./Group1000004379Icon.tsx";
import { Group1000004380Icon } from "./Group1000004380Icon.tsx";
import rmitLogo from "./rmit-logo.png";
import classes from "./Design.module.css"; // Replace with your actual stylesheet

const Sidebar = () => {
  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  if (!authTokens) {
    window.location = "/login";
  }

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/signout", authTokens);
      localStorage.removeItem("authTokens");
      window.location = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.sidebar}>
      <div>
        <img
          src={rmitLogo}
          alt="RMIT Logo"
          className={classes.rMITLogo_Horizontal1}
        />
      </div>
      <div className={classes.account}>Account</div>
      <div className={classes.rectangle5571}></div>
      <Link to="/Dashboard" className={classes.sidebarLink}>
        <div className={classes.dashboard2}>Dashboard</div>
        <div className={classes.vector}>
          <HomeIcon className={classes.icon4} />
        </div>
      </Link>
      <div className={classes.courses}>Courses</div>
      <div className={classes.group1000004376}>
        <Group1000004376Icon className={classes.icon5} />
      </div>
      <Link to="/Login" className={classes.sidebarLink}>
        <div className={classes.messages}>Messages</div>
        <div className={classes.group1000004379}>
          <Group1000004379Icon className={classes.icon8} />
        </div>
      </Link>
      <button className={classes.settings} onClick={signOut}>Logout</button>
      <div className={classes.group1000004380}>
        <Group1000004380Icon className={classes.icon9} />
      </div>
    </div>
  );
};

export default Sidebar;
