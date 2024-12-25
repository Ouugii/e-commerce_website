import React, { useEffect, useState } from "react";
import axios from "axios";
import "../header/header.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../pages/Access/Request/Request.js";
import {
  faCircleUser,
  faCartShopping,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../selectDrop/select";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Nav from "./nav/nav.jsx";
const Header = (shouldFetch) => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isOpenDropDown1, setisOpenDropDown1] = useState(false);
  // const [names, setNames] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });
  const [curentUser, setCurentUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([
    "Tất cả",
    "Điện thoại",
    "Thời trang",
    "Thiết bị điện tử",
    "Thú cưng",
    "Nội thất",
    "Chăm sóc sắc đẹp",
    "Thực phẩm",
  ]);
  ////////////////
  //Lay accessToken
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const accessToken = getCookie("accessToken");
  ///////////////////
  //Hien thi Ten User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        };
        const response = await axios.get(
          " http://localhost:3030/api/v1/customer/profile",
          { headers }
        );
        setCurentUser(response.data.metadata.user);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
        setCurentUser(null);
      }
    };
    if (shouldFetch) {
      fetchUser();
    }
  }, [shouldFetch]);
  ///////////
  // tạo shop
  // const handleChange = (e) => {
  //   setNames(e.target.value);
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };
      const response = await axios.post(
        "http://localhost:3030/api/v1/shop/register",
        formData,
        { headers }
      );
      if (response.status === 200) {
        console.log("Đăng ký thành công!");
      }
    } catch (err) {
      console.log("Đăng ký thất bại!");
    }
  };

  ////////
  //log out
  const handleLogout = () => {
    logoutUser(navigate, setError);
  };

  /////////
  //handle click tạo cửa hàng hoặc đăng hàng
  const handleShopClick = () => {
    if (curentUser?.isSeller) {
      navigate("/Shop/Profile");
    } else {
      setisOpenDropDown1(!isOpenDropDown1);
    }
  };
  const home = () => {
    navigate("/");
  };
  const cart = () => {
    navigate("/cart");
  };
  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className=" col-lg-2 logos">
              <img
                className="logoHeader"
                src="/IMG/Home/logo-no-background.png"
                alt=""
                onClick={home}
              />
            </div>
            {/* Header */}
            <div className=" col-lg-5 ">
              <div className="headerSearch ">
                <Select data={categories} />

                <div className="search">
                  <input type="text" placeholder="Tìm kiếm sản phẩm" />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="searchIcon"
                  />
                </div>
              </div>
            </div>
            {/* Header */}

            {/*User login*/}
            {curentUser ? (
              <>
                <div
                  className="col-lg-5"
                  style={{
                    display: "flex",
                  }}
                >
                  <div className="btnNav1">
                    <div
                      className="loginNav"
                      onClick={() => setisOpenDropDown(!isOpenDropDown)}
                    >
                      <div className="navButtonn">
                        <FontAwesomeIcon
                          icon={faCircleUser}
                          style={{ fontSize: "25px", paddingRight: "10px" }}
                        />{" "}
                        {curentUser.user_name}
                      </div>
                    </div>
                    {isOpenDropDown !== false && (
                      <ClickAwayListener
                        onClickAway={() => setisOpenDropDown(false)}
                      >
                        <ul className="dropdownMenu">
                          <li>
                            <Link to="/my-profile" className="full-link">
                              Thông tin cá nhân
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              className="full-link"
                              onClick={handleLogout}
                            >
                              Đăng xuất
                            </Link>
                          </li>
                          <li>
                            <Link to="/Login" className="full-link">
                              Đơn hàng
                            </Link>
                          </li>
                          <li>
                            <Link to="/Login" className="full-link">
                              Wishlist
                            </Link>
                          </li>
                          <li>
                            <Link to="/Login" className="full-link">
                              Mã giảm giá
                            </Link>
                          </li>
                        </ul>
                      </ClickAwayListener>
                    )}
                  </div>
                  <div className="loginNav" onClick={cart}>
                    <div className="navButtonn">
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ fontSize: "25px", paddingRight: "10px" }}
                      />{" "}
                      Giỏ hàng
                    </div>
                  </div>

                  <div className="btnNav3">
                    <div className="loginNav" onClick={handleShopClick}>
                      <div className="navButtonn">
                        <FontAwesomeIcon
                          icon={faShop}
                          style={{ fontSize: "25px", paddingRight: "10px" }}
                        />{" "}
                        {curentUser.isSeller ? "Bán hàng" : "Tạo gian hàng"}
                      </div>
                    </div>
                    {isOpenDropDown1 !== false && (
                      <ClickAwayListener
                        onClickAway={() => setisOpenDropDown1(false)}
                      >
                        <div className="dropdownMenu">
                          <div className="Shop-regis-Drop">
                            <h1>Hãy nhập tên cho cửa hàng của bạn</h1>
                            <h2>
                              Lưu ý nhỏ: Nên đặt tên shop theo mẫu như sau "Shop
                              Abc"
                            </h2>
                            <form onSubmit={handleSubmit}>
                              <input
                                onChange={handleChange}
                                name="name"
                                type="name"
                                className="form-control"
                                placeholder="Nhập tên"
                              />
                              <button type="submit">Submit</button>
                            </form>
                          </div>
                        </div>
                      </ClickAwayListener>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div
                className="col-lg-4"
                style={{
                  display: "flex",
                }}
              >
                <div className="btnNav1">
                  <div
                    className="loginNav"
                    onClick={() => setisOpenDropDown(!isOpenDropDown)}
                  >
                    <div className="navButtonn">
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        style={{ fontSize: "25px", paddingRight: "10px" }}
                      />{" "}
                      Tài khoản
                    </div>
                  </div>
                  {isOpenDropDown !== false && (
                    <ClickAwayListener
                      onClickAway={() => setisOpenDropDown(false)}
                    >
                      <ul className="dropdownMenu">
                        <li>
                          <Link
                            to="/Login"
                            state={{ from: location }}
                            className="full-link"
                          >
                            Đăng nhập
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/Register"
                            state={{ from: location }}
                            className="full-link"
                          >
                            Đăng ký
                          </Link>
                        </li>
                        <li>
                          <Link to="/Login" className="full-link">
                            Đơn hàng
                          </Link>
                        </li>
                        <li>
                          <Link to="/Login" className="full-link">
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link to="/Login" className="full-link">
                            Mã giảm giá
                          </Link>
                        </li>
                      </ul>
                    </ClickAwayListener>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <Nav />
    </>
  );
};

export default Header;
