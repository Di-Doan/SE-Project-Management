import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import defaultAva from "../../assets/avatar.jpg";
import axiosInstance from "../../ultilities/axiosInstance";
import PeopleStyle from "./People.module.css";

function PeopleBlock(props) {
  return (
    <tr>
      <td>
        <div className={PeopleStyle.avaBox}>
          <img className={PeopleStyle.ava} src={defaultAva}></img>
        </div>
      </td>
      <td>{props.name}</td>
      <td>{props.tutorial}</td>
      <td>
        <button className={PeopleStyle.btn} >Send Message</button>
      </td>
    </tr>
  );
}

export default PeopleBlock;
