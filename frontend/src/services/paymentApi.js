import { BACKEND_URL } from "../config/api";
import axios from "axios";

const API = `${BACKEND_URL}/api`;

export const createPaymentOrder = async (paymentData) => {

    const token = localStorage.getItem("token");

    const res = await axios.post(

        `${API}/api/payment/create-order`,

        paymentData,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return res.data;
};

export const verifyPayment = async (paymentData) => {

    const token = localStorage.getItem("token");

    const res = await axios.post(

        `${API}/api/payment/verify`,

        paymentData,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return res.data;
};