// services/apiService.js
import request from "./request"; // Assuming your Request class is in a file named request.js

export const getCustomerProfile = async () => {
  try {
    const response = await request.get("/customer/profile");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch customer profile:", error);
    throw error;
  }
};
