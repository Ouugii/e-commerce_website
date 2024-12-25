import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import "./InCart.css";
import axios from "axios";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";
import { useNavigate } from "react-router-dom";
const InCart = () => {
  ///state
  const [address, setAddress] = useState([]);
  const [cart, setCart] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigate = useNavigate();
  ///Lay cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const accessToken = getCookie("accessToken");

  // Lấy địa chỉ giao hàng
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        };
        const response = await axios.get(
          "http://localhost:3030/api/v1/customer/shipping-addresses",
          { headers }
        );

        setAddress(response.data.metadata.shipping_ddresses);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
      }
    };

    fetchAddress();
  }, []);

  // Lấy sản phẩm trong giỏ hàng
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        };
        const response = await axios.get(
          "http://localhost:3030/api/v1/customer/cart",
          { headers }
        );

        setCart(response.data.metadata);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
        setCart(null);
      }
    };

    fetchCart();
  }, []);

  //change
  const handleProductSelect = (productId) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  //change
  const handleCheckout = async () => {
    if (selectedProductIds.length === 0 || !selectedAddress) {
      alert("Vui lòng chọn sản phẩm và địa chỉ giao hàng.");
      return;
    }

    const data = {
      productIds: selectedProductIds,
      customer_shipping_address_id: selectedAddress,
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };

      const response = await axios.post(
        "http://localhost:3030/api/v1/customer/orders",
        data,
        { headers }
      );

      console.log("Đặt hàng thành công");
      navigate("/Cart/Success");
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div>
      <Header />
      <section className="cartSection">
        <div className="CartCtn">
          <div className="row">
            <div
              className="col-md-7"
              style={{ maxHeight: "700px", overflowY: "scroll" }}
            >
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1>Giỏ hàng của bạn</h1>
                  <p>
                    Có{" "}
                    <span style={{ color: "#00ff62", fontWeight: "600" }}>
                      {cart &&
                      cart.shops &&
                      cart.shops.length > 0 &&
                      cart.shops[0].items.length > 0
                        ? cart.shops[0].items.length
                        : 0}
                    </span>{" "}
                    sản phẩm trong giỏ hàng của bạn
                  </p>
                </div>
              </div>
              <div className="cartWrapper">
                {cart &&
                cart.shops &&
                cart.shops.length > 0 &&
                cart.shops[0].items.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Giá</th>
                          <th>Tổng giá</th>
                          <th>Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.shops[0].items.map((item) => (
                          <tr key={item.productId}>
                            <td
                              style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "20px",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedProductIds.includes(
                                  item.productId
                                )}
                                onChange={() =>
                                  handleProductSelect(item.productId)
                                }
                              />
                              <div className="d-flex align-items-center">
                                <div className="imgCart">
                                  <img
                                    src="/IMG/Home/ads.png"
                                    alt=""
                                    className="w-100"
                                  />
                                </div>
                                <div className="infoCart">
                                  <h4>{item.productName}</h4>
                                  <Rating
                                    name="half-rating-read"
                                    defaultValue={5}
                                    precision={0.5}
                                    readOnly
                                    style={{
                                      fontSize: "15px",
                                      paddingLeft: "10px",
                                    }}
                                  />
                                  <span style={{ fontSize: "10px" }}>(12)</span>
                                </div>
                              </div>
                            </td>
                            <td>{item.quantity} sản phẩm</td>
                            <td>
                              {item.unitPrice.toLocaleString("vi-VN")} VND
                            </td>
                            <td>
                              {item.totalPrice.toLocaleString("vi-VN")} VND
                            </td>
                            <td>
                              <p className="m-0">delete</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div
                    className="emptyCart"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      height: "300px",
                    }}
                  >
                    <h3>Giỏ hàng trống</h3>
                    <p>Hãy thêm sản phẩm vào giỏ hàng của bạn!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-5" style={{ paddingLeft: "10px" }}>
              <div className="card p-4 shadow">
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "10px" }}
                >
                  <h5 style={{ fontSize: "15px" }}>Tổng giá trị hóa đơn</h5>
                  <h3 className="totalPrice">
                    {cart ? cart.total_amount.toLocaleString("vi-VN") : 0} VND
                  </h3>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "10px" }}
                >
                  <h5 style={{ fontSize: "15px" }}>Số điện thoại</h5>
                  <h3 className="ShiptotalPrice">0917058121</h3>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "10px" }}
                >
                  <h5 style={{ fontSize: "15px" }}>Phí vận chuyển</h5>
                  <h3 className="ShiptotalPrice">Free</h3>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "10px" }}
                >
                  <h5 style={{ fontSize: "15px" }}>Địa chỉ giao hàng</h5>
                  <select
                    name="shippingAddress"
                    className="form-control"
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  >
                    <option value="">Chọn địa chỉ</option>
                    {address &&
                      address.map((st) => (
                        <option value={st._id} key={st._id}>
                          {st.address}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <button className="btnCart" onClick={handleCheckout}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InCart;
