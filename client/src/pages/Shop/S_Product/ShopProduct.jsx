import React, { useEffect, useState } from "react";
import "./ShopProduct.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import UserUpcoming from "../APIclone/UserUpcoming";
const ShopProduct = () => {
  //state
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [Product, SetProduct] = useState([]);
  const [Cate, setCate] = useState([]);
  const [selectedCate, setSelectedCate] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    sale_price: "",
    stock_quantity: "",
    brand_id: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  // Lấy cookies
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const accessToken = getCookie("accessToken");
  //mở thẻ
  const handleOpen = (i) => {
    setOpen(true);
  };
  const handleOpen1 = (productId) => {
    setSelectedProductId(productId);
    setOpen1(true);
  };

  //Lấy Categories
  useEffect(() => {
    const fetchCate = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          "http://localhost:3030/api/v1/p/categories",
          { headers }
        );
        setCate(response.data.metadata.categories);
      } catch (error) {
        console.error("Lỗi khi lấy dữ", error);
      }
    };

    fetchCate();
  }, []);
  //Lấy brand
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          " http://localhost:3030/api/v1/p/brands",
          { headers }
        );
        setBrands(response.data.metadata.brands);
      } catch (error) {
        console.error("Lỗi khi lấy dữ", error);
      }
    };

    fetchBrand();
  }, []);

  ////////////
  //HandleInputChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //HandleChange
  const handleCateChange = (id) => {
    if (selectedCate.includes(id)) {
      setSelectedCate(selectedCate.filter((cateId) => cateId !== id));
    } else {
      setSelectedCate([...selectedCate, id]);
    }
  };
  //handleImageChange
  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    const totalImages = [...selectedImages, ...newImages];
    if (totalImages.length > 6) {
      alert("Bạn chỉ có thể chọn tối đa 6 hình ảnh.");
      return;
    }
    setSelectedImages(totalImages);
  };
  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Cập nhật formData với danh mục đã chọn
      const updatedFormData = { ...formData, category_ids: selectedCate };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };

      const response = await axios.post(
        "http://localhost:3030/api/v1/shop/products",
        updatedFormData,
        { headers }
      );

      if (response.status === 200) {
        console.log("Sản phẩm được thêm thành công");
        SetProduct([]);
        setOpen(false);
      } else {
        console.error("Không thể thêm sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu", error);
    }
  };

  ////
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const formData1 = new FormData();
    selectedImages.forEach((image) => {
      formData1.append("productImages", image);
    });

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      };

      const response = await axios.post(
        `http://localhost:3030/api/v1/shop/product-images/${selectedProductId}`,
        formData1,
        { headers }
      );

      if (response.status === 200) {
        alert("Thành công");

        setOpen(false);
        window.location.reload();
      } else {
        console.error("Không thể thêm sản phẩm");
        console.log(formData1);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu", error);
      console.log(formData1);
    }
  };
  ///////////
  //Lấy sản phẩm
  useEffect(() => {
    const FetchProduct = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        };
        const response = await axios.get(
          "http://localhost:3030/api/v1/shop/profile",
          { headers }
        );
        const as = response.data.metadata.shop.products;
        if (as.length === 0) {
          return;
        } else {
          SetProduct(response.data.metadata.shop.products);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
      }
    };
    if (Product.length === 0) {
      FetchProduct();
    }
  }, [Product]);
  //
  //test log
  console.log();
  return (
    <div className="container-fluid">
      <div className="Product_Header">
        <h1>Sản phẩm của shop</h1>
        <button onClick={() => handleOpen()}>Thêm sản phẩm</button>
      </div>
      <div className="ShopProduct_content">
        <div className="SC_left">
          {Product.map((item) => {
            return (
              <div className="SC_item" key={item._id}>
                <img
                  src={
                    item.images.length > 0
                      ? item.images[0].url
                      : "/IMG/Home/i.png"
                  }
                  alt={item.name}
                />
                <div className="SC_descipt">
                  <h1>{item.name}</h1>

                  <h1>Giá: {item.price}VND</h1>
                  <h1
                    style={{
                      color: "red",
                      fontSize: "15px",
                      paddingTop: "20px",
                    }}
                  >
                    Sale: {item.sale_price}VND
                  </h1>
                  <h1 style={{ fontSize: "15px" }}>
                    Kho: {item.stock_quantity}
                  </h1>
                </div>
                <button onClick={() => handleOpen1(item._id)}>
                  Chỉnh sửa sản phẩm
                </button>
              </div>
            );
          })}
        </div>
        <div className="Dashboard-content-right">
          <div className="Db-title">
            <h1>Upcoming Visitors</h1>
          </div>
          {/* user info */}
          <div className="Db-container">
            {UserUpcoming.map((user) => {
              return (
                <div className="Db-visitor" key={user.id}>
                  <div className="Visitor">
                    <img
                      src={user.image_user}
                      alt="User Avatar"
                      className="userImgsss"
                    />
                    <div className="Visitor-n">
                      <span className="Visitor-Name">{user.Name}</span>
                      <span className="Upcoming-date">{user.UpCm}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {open && (
        <div className="CreateProoduct" onClick={() => setOpen(false)}>
          <form
            className="CreateProduct-Content"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onSubmit={handleSubmit}
          >
            <p style={{ margin: "0" }}>Tên sản phẩm</p>
            <input
              name="name"
              type="Type"
              id="form3Example4c"
              onChange={handleChange}
              className="form-control"
            />
            <p style={{ margin: "0" }}>Chú thích</p>
            <input
              name="description"
              type="Type"
              id="form3Example4c"
              onChange={handleChange}
              className="form-control"
            />
            <p style={{ margin: "0" }}>Giá tiền VND (Không dấu không cách)</p>
            <input
              name="price"
              type="Type"
              onChange={handleChange}
              id="form3Example4c"
              className="form-control"
            />

            <p style={{ margin: "0" }}>Giá giảm VND (Không dấu không cách)</p>
            <input
              name="sale_price"
              type="Type"
              id="form3Example4c"
              onChange={handleChange}
              className="form-control"
            />
            <p style={{ margin: "0" }}>Số lượng (ghi bằng số)</p>
            <input
              name="stock_quantity"
              type="Type"
              id="form3Example4c"
              onChange={handleChange}
              className="form-control"
            />
            <select
              onChange={handleChange}
              name="brand_id"
              className="form-control"
            >
              <option value="">Chọn thương hiệu</option>
              {brands &&
                brands.map((i) => (
                  <option value={i._id} key={i._id}>
                    {i.name}
                  </option>
                ))}
            </select>

            <p style={{ margin: "0" }}>Danh mục</p>
            <div className="cateList">
              <ul>
                {Cate ? (
                  Cate.map((item) => (
                    <li key={item._id}>
                      <input
                        type="checkbox"
                        checked={selectedCate.includes(item._id)}
                        onChange={() => handleCateChange(item._id)}
                      />
                      {item.name}
                    </li>
                  ))
                ) : (
                  <p>Loading categories...</p>
                )}
              </ul>
            </div>
            <button type="submit" className="btn btn-primary ">
              Tạo sản phẩm
            </button>
          </form>
        </div>
      )}
      {open1 && (
        <div className="CreateProoduct" onClick={() => setOpen1(false)}>
          <div
            className="CreateProduct-Content1"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p>Thông tin chi tiết sản phẩm</p>
            <div className="ProDuct_ifChange">
              <p>
                Tên sản phẩm: <span></span>
              </p>
              <p>
                Chú thích: <span></span>
              </p>
              <p>
                Giá niêm yết: <span></span>
              </p>
              <p>
                Giá sale: <span></span>
              </p>
            </div>{" "}
            <p className="m-0">Cập nhật hình ảnh sản phẩm</p>
            <p style={{ fontSize: "12px", color: "gray" }}>Tối đa 6 hình</p>
            <form onSubmit={handleSubmit1}>
              <div>
                <label
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    border: "dashed 2px",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  htmlFor="file"
                >
                  <FontAwesomeIcon
                    style={{ fontSize: "100px", color: "#003580" }}
                    icon={faCamera}
                  />
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "400",
                      color: "#003580",
                    }}
                  >
                    Thêm ảnh
                  </span>
                </label>
                <input
                  hidden
                  type="file"
                  id="file"
                  multiple
                  name="images"
                  onChange={handleImageChange}
                />
              </div>
              <button
                style={{
                  backgroundColor: "#003580",
                  color: "white",
                  marginTop: "20px",
                  padding: "10px 25px 10px 25px",
                  borderRadius: "5px",
                }}
                type="submit"
              >
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProduct;
