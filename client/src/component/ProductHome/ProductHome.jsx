import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductHome.css";
const ProductHome = ({ selectedCategory }) => {
  const [prodct, setProdct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          "http://localhost:3030/api/v1/p/products",
          { headers }
        );

        setProdct(response.data.metadata.products);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
      }
    };

    fetchProduct();
  }, []);

  //filter
  const filteredProducts = selectedCategory
    ? prodct.filter((product) =>
        product.categories.some(
          (category) => category.name === selectedCategory
        )
      ).length > 0
      ? prodct.filter((product) =>
          product.categories.some(
            (category) => category.name === selectedCategory
          )
        )
      : prodct
    : prodct;

  return (
    <>
      {filteredProducts.slice(0, 10).map((product) => (
        <div className="productThumb" key={product._id}>
          <Link to={`/List/${product._id}`}>
            <div className="imgWrapper">
              <img
                src={
                  product.images.length > 0
                    ? product.images[0].url
                    : "/default-img.png"
                }
                alt={product.name}
              />
            </div>
          </Link>
          <div className="productThumbInfo">
            <span className="d-block productCatname">
              {product.categories.length > 0
                ? product.categories.map((category) => category.name).join(", ")
                : "Unknown Category"}
            </span>
            <h4 className="productThumbTitle">
              <Link to={`/List/${product._id}`}>{product.name}</Link>
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
              <Link
                to={`/List/${product._id}`}
                className="adCa"
                style={{ textDecoration: "none" }}
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductHome;
