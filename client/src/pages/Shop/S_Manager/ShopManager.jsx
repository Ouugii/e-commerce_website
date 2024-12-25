import React from "react";
import "./ShopManage.css";
import Slidebar from "../S_component/slideBar";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../../component/header/header";
const ShopManager = () => {
  return (
    <div>
      <Header />
      <div className="ShopManagerContainer">
        {/* left component */}
        <div className="ShopM-l">
          <Slidebar />
        </div>

        {/* right component */}
        <div className="Shop-r">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShopManager;
