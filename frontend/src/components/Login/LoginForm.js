import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogStyle from "./LoginForm.module.css";
import axios from "axios";

function LoginForm() {
  const [data, setData] = useState({ id: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/auth";
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
            <h1 className={LogStyle.title}>Login</h1>
            {error && <div className={LogStyle.error}>{error}</div>}
            <div className={LogStyle.input}>
              <label htmlFor="id">Student ID</label>
              <div>
                <input
                  type="text"
                  name="text"
                  id="text"
                  value={data.id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={LogStyle.input}>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type="password"
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
              Login
            </button>
          </form>

          <div>
            <Link to="/forgot-password">
              Forget your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
