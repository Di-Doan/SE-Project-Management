import { NavLink, Outlet } from "react-router-dom";
import "./UserProfileSideBar.css";
import { ReactComponent as MenuIcon } from "../../assets/menu-icon.svg";
import axiosInstance from "../../ultilities/axiosInstance";

function UserProfileSideBar() {
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
      window.location = "/profile";
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    let toggle = document.querySelector(".toggle");
    let sideNav = document.querySelector(".side-nav");
    let adminMain = document.querySelector(".admin-main");
    toggle.classList.toggle("active");
    sideNav.classList.toggle("active");
    adminMain.classList.toggle("active");
  };

  return (
    <div>
      <div>
        <div className="side-nav">
          <ul>
            <li className="side-nav-link logo-container">
              <span className="side-nav-icon">
                <em className="fas fa-bold"></em>
              </span>
              <span className="title">RMIT </span>
            </li>
            <li className="side-nav-link">
              <NavLink to="/profile">
                <span className="side-nav-icon">
                  <em className="fas fa-home"></em>
                </span>
                <span className="title">User Profile</span>
              </NavLink>
            </li>
            <li className="side-nav-link">
              <NavLink to="/current-courses">
                <span className="side-nav-icon">
                  <em className="fas fa-ad"></em>
                </span>
                <span className="title">Current Courses</span>
              </NavLink>
            </li>
            <li className="side-nav-link">
              <NavLink to="/admin/users">
                <span className="side-nav-icon">
                  <em className="fas fa-user"></em>
                </span>
                <span className="title">Manage Team</span>
              </NavLink>
            </li>
            <li className="side-nav-link">
              <NavLink to="https://mytimetable.rmit.edu.vn/odd/student">
                <span className="side-nav-icon">
                  <em className="fas fa-file"></em>
                </span>
                <span className="title">Edit Time</span>
              </NavLink>
            </li>

            <li className="side-nav-link" id="sign-out-link">
              <span className="side-nav-icon">
                <em className="fas fa-sign-out"></em>
              </span>
              <button className="title" onClick={signOut}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
        <div className="admin-main">
          <div className="profile-top-bar">
            <div className="toggle" onClick={() => toggleMenu()}>
              <MenuIcon />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserProfileSideBar;
