import axios from "axios";
import { AppServer } from ".";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

class Request {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      withCredentials: true,
    });

    this.api.interceptors.request.use(
      (config) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error("Unauthorized - Redirecting to login");
          // redirection
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url, config = {}) {
    try {
      const response = await this.api.get(url, config);
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  }

  async post(url, data, config = {}) {
    try {
      const response = await this.api.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  }

  async put(url, data, config = {}) {
    try {
      const response = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error("PUT request failed:", error);
      throw error;
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      console.error("DELETE request failed:", error);
      throw error;
    }
  }
}

const request = new Request(AppServer.api_v1_url);

export default request;
