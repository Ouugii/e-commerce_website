import React, { useState } from "react";
import "./css/Login.css";
import { loginUser } from "./Request/Request";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../component/header/header";

const Login = () => {
  const [option, setOption] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      option: option,
      password: password,
    };

    await loginUser(user, setError, navigate, currentLocation);
  };

  return (
    <div>
      <Header />
      <div className="bgr">
        <div className="container-fluid w-100">
          <div className="Login_Ctn">
            <div className="Login_ctnn">
              <div className="Form-BackGrn">
                <h1>Đăng nhập</h1>
                <p>Truy cập vào giỏ hàng của bạn</p>
                <p>Wishlist và Sản phẩm khuyến nghị</p>
                <img src="/IMG/Home/login.png" alt="" />
              </div>
              <form className="Form-login" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
