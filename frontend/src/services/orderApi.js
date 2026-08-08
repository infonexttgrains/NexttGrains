import { BACKEND_URL } from "../config/api";
import axios from "axios";

const API = `${BACKEND_URL}`;

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ===============================
// GET MY ORDERS
// ===============================

export const getMyOrders = (userId) => {
  return axios.get(
    `${API}/orders/user/${userId}`,
    authHeader()
  );
};

// ===============================
// GET ORDER DETAILS
// ===============================

export const getOrderDetails = (orderId) => {
  return axios.get(
    `${API}/orders/${orderId}`,
    authHeader()
  );
};

// ===============================
// CANCEL ORDER
// ===============================

export const cancelOrder = (orderId, reason) => {
  return axios.put(
    `${API}/orders/cancel/${orderId}`,
    {
      cancelReason: reason
    },
    authHeader()
  );
};