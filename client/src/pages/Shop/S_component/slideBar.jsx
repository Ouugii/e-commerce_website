import React from "react";
import "./css/slideBar.css";
import { useNavigate } from "react-router-dom";
import menuSidebar from "../APIclone/menuSidebar";
import { NavLink } from "react-router-dom";
const activeStyle = "active";
const noActiveStyle = "sliderBarItem";
const slideBar = () => {
  return (
    <div>
      <div className="slideBar">
        {menuSidebar.map((item) => {
          return (
            <NavLink
              className={noActiveStyle}
              activeClassName={activeStyle}
              key={item.id}
              to={item?.path}
            >
              {item.text}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default slideBar;
