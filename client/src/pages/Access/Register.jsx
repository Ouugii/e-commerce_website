import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Header from "../../component/header/header";
const { useState } = require("react");

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLG = () => {
    navigate("/Login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3030/api/v1/access/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Data sent successfully");
        navigate("/Login", { state: location.state });
      } else {
        console.error("Failed to send data to the server");
        alert("tài khoản đã tồn tại");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <div className="bgr">
        <div className="container-fluid w-100">
          <div className="Login_Ctn">
            <div className="Login_ctnn">
              <div className="Form-BackGrn2">
                <h1>Đăng ký</h1>
                <p>Truy cập vào giỏ hàng của bạn</p>
                <p>Wishlist và Sản phẩm khuyến nghị</p>
                <img src="/IMG/Home/regis.png" alt="" />
              </div>
              <form className="Form-login" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="imput-box">
                  <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    id="form3Example3c"
                    className="form-control"
                    placeholder="Email"
                  />

                  <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    id="form3Example4c"
                    className="form-control"
                    placeholder="Mật Khẩu"
                  />
                  <button type="submit" className="btn btn-primary btn-lg">
                    Tạo Tài Khoản
                  </button>
                </div>
                <div className="login-register">
                  <p>
                    Already have an account?{" "}
                    <span onClick={handleLG}>Login</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
