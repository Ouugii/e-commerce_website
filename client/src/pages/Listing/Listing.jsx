import React, { useEffect, useState } from "react";
import "./Listing.css";
import axios from "axios";
import Header from "../../component/header/header";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Listing = () => {
  const location = useLocation();
  const [prodct, setProdct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || null
  );
  const [categories, setCategories] = useState([]);
  ////////////////
  //Lấy categories
  useEffect(() => {
    const fetchCate = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          " http://localhost:3030/api/v1/p/categories",
          { headers }
        );
        setCategories(response.data.metadata.categories);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
      }
    };

    fetchCate();
  }, []);
  //Lấy sản phẩm
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
      : []
    : prodct;
  return (
    <div>
      <Header />
      <section className="listingPage">
        <div className="container-fluid listing-ctn">
          <div className="row">
            <div className="col-md-3">
              <div className="filterCard1">
                <h1>Category</h1>
                <p onClick={() => setSelectedCategory("")}>Tất cả</p>
                <div className="cardUl">
                  {categories.map((item) => {
                    return (
                      <ul key={item._id}>
                        <li onClick={() => setSelectedCategory(item.name)}>
                          <img src={item.image_url} alt={item.name} />
                          {item.name}
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>

              <img src="/IMG/Home/sale1.png" alt="" className="styleIMGlisst" />
            </div>
            <div className="col-md-9">
              <div className="productListRow">
                <div className="item">
                  {filteredProducts.slice(0, 10).map((product) => (
                    <div className="productThumb1" key={product._id}>
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
                            ? product.categories
                                .map((category) => category.name)
                                .join(", ")
                            : "Unknown Category"}
                        </span>
                        <h4 className="productThumbTitle">
                          <Link to={`/List/${product._id}`}>
                            {product.name}
                          </Link>
                        </h4>
                        <div className="productThumbctn">
                          <div className="pdt-pr">
                            <p className="price">
                              {product.price}{" "}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listing;
