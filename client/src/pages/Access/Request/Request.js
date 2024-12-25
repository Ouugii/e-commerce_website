import axios from "axios";
import axiosDefaults from "axios";
import Cookies from "js-cookie";
const urlLogin = "http://localhost:3030/api/v1/access/login";
const urlLogout = "http://localhost:3030/api/v1/access/logout";

const loginHeaders = {
  "Content-Type": "application/json",
};
const logoutHeaders = {
  "Content-Type": "application/json",
};

axios.defaults.withCredentials = true;

// export const loginUser = async (user, setError, navigate) => {
//   try {
//     const r = await axios.post(urlLogin, user, loginHeaders);

//     const data = {
//       message: r.data.message,
//       statusCode: r.data.statusCode,
//       metadata: {
//         accessToken: r.data.metadata.accessToken,
//       },
//     };
//     navigate("/");
//     window.location.reload();
//     return data;
//   } catch (error) {
//     // Xử lý lỗi
//     setError("Tên tài khoản hoặc mật khẩu không đúng");
//   }
// };

export const loginUser = async (user, setError, navigate, currentLocation) => {
  try {
    const r = await axios.post(urlLogin, user, loginHeaders);

    const data = {
      message: r.data.message,
      statusCode: r.data.statusCode,
      metadata: {
        accessToken: r.data.metadata.accessToken,
      },
    };

    // Kiểm tra xem currentLocation.state?.from có tồn tại không
    const from = currentLocation.state?.from?.pathname || "/"; // Mặc định chuyển về /home nếu không có trang trước đó

    // Điều hướng đến trang trước hoặc mặc định
    navigate(from, { replace: true });

    return data;
  } catch (error) {
    // Xử lý lỗi và hiển thị thông báo
    setError("Tên tài khoản hoặc mật khẩu không đúng");
  }
};

export const logoutUser = async (navigate, setError) => {
  try {
    await axios.delete(urlLogout, logoutHeaders);
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.error("Lỗi khi logout", error);
    setError("Đã xảy ra lỗi khi đăng xuất.");
  }
};

export const apiGetPublicProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefaults({
        method: "get",
        url: "http://localhost:3030/api/v1/address/procince",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicDistrict = (province_code) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefaults({
        method: "get",
        url: `http://localhost:3030/api/v1/address/district/${province_code}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicWard = (district_code) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!district_code) {
        // If district_code is null or undefined, resolve immediately with empty data
        resolve({ data: { metadata: { ward: [] } } });
      } else {
        const response = await axiosDefaults({
          method: "get",
          url: `http://localhost:3030/api/v1/address/ward/${district_code}`,
        });
        resolve(response);
      }
    } catch (error) {
      reject(error);
    }
  });
