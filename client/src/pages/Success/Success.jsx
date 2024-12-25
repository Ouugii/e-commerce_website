import React from "react";
import "./Success.css";
import { useNavigate } from "react-router-dom";
import Header from "../../component/header/header";
const Success = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="success-container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Cảm ơn bạn đã mua hàng!</h1>
          <p>Đơn hàng của bạn đã được đặt thành công.</p>
          <div className="buttons">
            <button className="btn" onClick={() => navigate("/")}>
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
