import { BACKEND_URL } from "../config/api";
import axios from "axios";

const API = `${BACKEND_URL}`;

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// =====================
// GET WISHLIST
// =====================

export const getWishlist = () =>
  axios.get(`${API}/wishlist`, authHeader());

// =====================
// TOGGLE WISHLIST
// =====================

export const toggleWishlist = (productId) =>
  axios.post(
    `${API}/wishlist/toggle`,
    { productId },
    authHeader()
  );

// =====================
// REMOVE ITEM
// =====================

export const removeWishlistItem = (productId) =>
  axios.delete(
    `${API}/wishlist/${productId}`,
    authHeader()
  );

// =====================
// CLEAR WISHLIST
// =====================

export const clearWishlist = () =>
  axios.delete(
    `${API}/wishlist`,
    authHeader()
  );