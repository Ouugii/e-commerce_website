import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeSlider from "./Slider/Slider";
import CatSlider from "../../component/catSlider/CatSlider";
import Brand from "../../component/Brand/Brand";
import "./style.css";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../../component/header/header";
import ProductHome from "../../component/ProductHome/ProductHome";
import FeatureHome from "../../component/FeatureHome/FeatureHome";
import Sale from "../../component/SaleImg/Sale";
import Success from "../Success/Success";
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const accessToken = getCookie("accessToken");
  const navigate = useNavigate();
  //Navigate truyền prop
  const handleNavigation = () => {
    const newCategory = "";
    setSelectedCategory(newCategory);
    navigate("/List", { state: { selectedCategory: newCategory } });
  };
  return (
    <div>
      <Header />
      <HomeSlider />
      <CatSlider />
      <Brand />
      <Sale />
      <section className="homeProducts">
        <div className="container-fluid homeProductsCtn">
          <h2 className="hd">Sản phẩm mới</h2>
          <ul className="list list-inline ml-auto filterTab">
            <li className="list-inline-item">
              <p onClick={() => setSelectedCategory("")}>Tất cả</p>
            </li>
            <li className="list-inline-item">
              <p onClick={() => setSelectedCategory("Thời Trang Nam")}>
                Thời trang nam
              </p>
            </li>{" "}
            <li className="list-inline-item">
              <p onClick={() => setSelectedCategory("Thời Trang Nữ")}>
                Thời trang nữ
              </p>
            </li>
            <li className="list-inline-item">
              <p onClick={() => setSelectedCategory("Điện thoại & Phụ Kiện")}>
                Điện thoại
              </p>
            </li>
            <li className="list-inline-item">
              <p onClick={() => setSelectedCategory("Máy Tính & Laptop")}>
                Laptop
              </p>
            </li>
            <li className="list-inline-item">
              <p>Giày dép</p>
            </li>
            <li className="list-inline-item">
              <p>Thực phẩm</p>
            </li>
            <li className="list-inline-item">
              <p>Đồng hồ</p>
            </li>
          </ul>
        </div>
        <div className=" productRow">
          <div className=" item">
            <ProductHome selectedCategory={selectedCategory} />
          </div>
        </div>

        <p className="morebtn" onClick={handleNavigation}>
          Xem thêm ...
        </p>
        <FeatureHome />
      </section>
    </div>
  );
};

export default Home;
