import { BACKEND_URL } from "../config/api";
import axios from "axios";

const BASE_URL =
  `${BACKEND_URL}/api/contact`;
  
export const submitContact = async(data)=>{

const response=await axios.post(

BASE_URL,

data

);

return response.data;

};