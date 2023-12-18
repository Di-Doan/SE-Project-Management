import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogStyle from "./ForgotPassword.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../ultilities/axiosInstance";

function ResetPassword() {
  const [data, setData] = useState({ code: "123456", id: "", password: "" });
  const [error, setError] = useState("");
  const [token, setToken] = useState();

  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  useState(() => {
    if (authTokens) {
      const token = jwtDecode(authTokens.accessToken);
      setData({ ...data, id: token.id });
      console.log(data);
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/reset-password", data);

      console.log("success");
      window.location = '/login';
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className={LogStyle.body}>
      <div className={LogStyle.box}>
        <div className={LogStyle.form}>
          <form className="login" onSubmit={handleSubmit}>
            <h1 className={LogStyle.title}>Reset Password</h1>
            <p className={LogStyle.idDisplay}>Student ID: {data.id}</p>
            {error && <div className={LogStyle.error}>{error}</div>}
            <div className={LogStyle.input}>
              <label htmlFor="id">Code</label>
              <div>
                <input
                  type="text"
                  name="text"
                  id="text"
                  value={data.code}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={LogStyle.input}>
              <label htmlFor="id">New Password</label>
              <div>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              className={LogStyle.btn}
              type="submit"
              name="login"
              value="Login"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
