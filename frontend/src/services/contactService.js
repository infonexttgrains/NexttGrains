import { BACKEND_URL } from "../config/api";
import axios from "axios";

const BASE_URL =
`${import.meta.env.VITE_BACKEND_URL}/api/contact`;

export const submitContact = async(data)=>{

const response=await axios.post(

BASE_URL,

data

);

return response.data;

};