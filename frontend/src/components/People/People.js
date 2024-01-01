import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import defaultAva from "../../assets/avatar.jpg";
import axiosInstance from "../../ultilities/axiosInstance";
import PeopleStyle from "./People.module.css";
import PeopleBlock from "./PeopleBlock";

function People() {
  return (
    <div>
      <div className={PeopleStyle.box}>
        <div className={PeopleStyle.tableBlock}>
          <table className={PeopleStyle.table}>
            <thead className={PeopleStyle.thead}>
              <tr>
                <th className={PeopleStyle.th}></th>
                <th className={PeopleStyle.th}>Name</th>
                <th className={PeopleStyle.th}>Tutorial Class</th>
                <th className={PeopleStyle.th}>Direct Message</th>
              </tr>
            </thead>
            <tbody className={PeopleStyle.tbody}>
              <PeopleBlock name="Doan Thien Di" tutorial="1"></PeopleBlock>
              <PeopleBlock name="Doan Thien Di" tutorial="1"></PeopleBlock>
              <PeopleBlock name="Doan Thien Di" tutorial="1"></PeopleBlock>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default People;
