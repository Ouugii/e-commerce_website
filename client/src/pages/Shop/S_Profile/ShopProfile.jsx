import React from "react";
import "./ShopProfile.css";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);
const ShopProfile = () => {
  const soldData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Số lượng hàng đã bán",
        data: [30, 50, 70, 40, 90],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu cho biểu đồ hàng tồn kho
  const stockData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Số lượng hàng tồn kho",
        data: [80, 60, 30, 90, 70],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu cho hoạt động hàng tuần của shop
  const weeklyActivityData = {
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    datasets: [
      {
        label: "Hoạt động của shop",
        data: [20, 40, 50, 60],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu doanh thu 12 tháng
  const revenueData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu (triệu đồng)",
        data: [200, 300, 250, 400, 450, 500, 550, 600, 650, 700, 750, 800],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      {" "}
      <div className="container">
        <main className="main-content">
          <div>
            <h3>Sơ lược</h3>
          </div>
          <div className="grid-container">
            <div className="grid-item">
              <h3>Hàng đã bán</h3>
              <Bar data={soldData} />
            </div>

            <div className="grid-item">
              <h3>Hàng tồn kho</h3>
              <Bar data={stockData} />
            </div>

            <div className="grid-item">
              <h3>Hoạt động hàng tuần</h3>
              <Line data={weeklyActivityData} />
            </div>

            <div className="grid-item large-chart">
              <h3>Doanh thu 12 tháng</h3>
              <Line data={revenueData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopProfile;
