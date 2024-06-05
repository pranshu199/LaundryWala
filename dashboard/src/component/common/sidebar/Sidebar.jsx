import React from "react";
import { Link, NavLink } from "react-router-dom";
import navLinks from "../../../assets/data/navLinks";
import SidebarItem from "./SidebarItem";
import "./sidebar.css";

const Sidebar = () => {
  // Logout
  const logout = () => {
    localStorage.removeItem("aToken");
    localStorage.removeItem("aID");
    window.location.href = process.env.REACT_APP_FRONTEND;
  };

  return (
    <>
      <section className="sidebar">
        <div className="sidebar-top">
          <div className="img">
            <Link to="/dashboard" title="Home">
              <img src={"/img/logo.png"} alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-menu">
            <ul className="nav-list">
              {navLinks.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
              <li className="nav-item">
                <NavLink
                  onClick={() => {
                    logout();
                  }}
                  className="nav-link sidebar-item"
                >
                  <i className="ri-logout-circle-r-line"></i> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
