import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Suggest.css";
const Suggest = () => {
  const [prodct, setProdct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          "http://localhost:3030/api/v1/p/featured-products",
          { headers }
        );

        setProdct(response.data.metadata.featuredProducts);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
      }
    };

    fetchProduct();
  }, []);

  // Điều hướng đến đường dẫn mới
  const handleNavigation = (id) => {
    window.location.href = `/List/${id}`;
  };
  return (
    <>
      {prodct.slice(0, 10).map((product) => (
        <div className="productThumb" key={product._id}>
          <div
            className="imgWrapper"
            onClick={() => handleNavigation(product._id)}
          >
            <img
              src={
                product.images.length > 0
                  ? product.images[0].url
                  : "/default-img.png"
              }
              alt={product.name}
            />
          </div>

          <div className="productThumbInfo">
            <span className="d-block productCatname">
              {product.categories.length > 0
                ? product.categories.map((category) => category.name).join(", ")
                : "Unknown Category"}
            </span>
            <h4
              className="productThumbTitle"
              onClick={() => handleNavigation(product._id)}
              style={{ cursor: "pointer" }}
            >
              {product.name}
            </h4>
            <div className="productThumbctn">
              <div className="pdt-pr">
                <p className="price">
                  {product.price.toLocaleString("vi-VN")}{" "}
                  <span style={{ fontSize: "10px" }}>VND</span>
                </p>
                <p className="oldPrice">
                  {product.sale_price}{" "}
                  <span style={{ fontSize: "10px" }}>VND</span>
                </p>
              </div>
              <div
                onClick={() => handleNavigation(product._id)}
                className="adCa"
                style={{ textDecoration: "none" }}
              >
                Xem chi tiết
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Suggest;
