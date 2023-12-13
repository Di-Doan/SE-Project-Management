import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogStyle from "./ForgotPassword.module.css";
import axios from "axios";

function ForgotPassword() {
  const [data, setData] = useState({ id: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth";
      const { data: res } = await axios.post(url, data);
      sessionStorage.setItem("token", res.data);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("userid", data.id);
        sessionStorage.setItem("signed", data.signed);
      }
      window.location = "/";
      console.log(res.message);
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
            <h1 className={LogStyle.title}>Forgotten Password</h1>
            {error && <div className={LogStyle.error}>{error}</div>}

            <div className={LogStyle.input}>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
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

export default ForgotPassword;
