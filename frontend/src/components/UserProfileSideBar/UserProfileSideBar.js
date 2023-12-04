import { NavLink, Outlet } from "react-router-dom";
import "./UserProfileSideBar.css";

function UserProfileSideBar() {
  return (
    <div className="admin-container">
      <div className="side-nav">
        <ul>
          <li className="side-nav-link logo-container">
            <span className="side-nav-icon">
              <em className="fas fa-bold"></em>
            </span>
            <span className="title">RMIT </span>
          </li>
          <li className="side-nav-link">
            <NavLink to="/admin/">
              <span className="side-nav-icon">
                <em className="fas fa-home"></em>
              </span>
              <span className="title">User Profile</span>
            </NavLink>
          </li>
          <li className="side-nav-link">
            <NavLink to="/admin/billboards">
              <span className="side-nav-icon">
                <em className="fas fa-ad"></em>
              </span>
              <span className="title">My Task</span>
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
            <NavLink to="/admin/login">
              <span className="side-nav-icon">
                <em className="fas fa-sign-out"></em>
              </span>
              <span className="title">Sign out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserProfileSideBar;
