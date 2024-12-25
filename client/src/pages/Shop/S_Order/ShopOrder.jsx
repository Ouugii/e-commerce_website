import "./ShopOrder.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
const ShopOrder = () => {
  const [orders, setOrders] = useState([]);
  //Lấy cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const accessToken = getCookie("accessToken");
  const data = [
    {
      id: 1,
      productName: "abc",
      quantity: 2,
      total: "100.000.000 VND",
      paymentMethod: "Thanh toán khi nhận",
      shippingFee: "Miễn phí",
    },
    {
      id: 2,
      productName: "abc",
      quantity: 2,
      total: "100.000.000 VND",
      paymentMethod: "Thanh toán khi nhận",
      shippingFee: "Miễn phí",
    },
  ];
  //Lấy thông tin
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        };
        const response = await axios.get(
          "http://localhost:3030/api/v1/shop/profile",
          { headers }
        );
        setOrders(response.data.metadata.shop.orders);
        console.log(orders);
      } catch (error) {
        console.error("Lỗi khi lấy dữ", error);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotalQuantity = (products) => {
    return products.reduce(
      (total, product) => total + product.OrderItem.quantity,
      0
    );
  };

  const calculateTotalAmount = (products) => {
    return products.reduce(
      (total, product) =>
        total + product.OrderItem.quantity * product.OrderItem.unit_price,
      0
    );
  };
  return (
    <div className="container-fluid">
      <h1>Danh sách order của khách hàng</h1>
      <div className="tbb">
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Mã khách hàng</th>
                <th>Tên sản phẩm</th>
                <th>Tổng số lượng sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Phí ship</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.customer_id}</td>
                  <td>
                    {order.products.map((product) => product.name).join(", ")}
                  </td>
                  <td>{calculateTotalQuantity(order.products)}</td>
                  <td>
                    {calculateTotalAmount(order.products).toLocaleString()} VND
                  </td>
                  <td>
                    {order.is_paid ? "Đã thanh toán" : "Thanh toán khi nhận"}
                  </td>
                  <td>
                    {order.shipping_cost
                      ? `${order.shipping_cost} VND`
                      : "Miễn phí"}
                  </td>
                  <td>
                    <button className="edit-button">Chỉnh sửa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShopOrder;
