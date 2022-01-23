import axios from "axios";
import Cookies from "js-cookie";
import { baseURL_Payment_Order_Service } from "../constant/BaseURL";

export const CREATE_ORDER_URL= baseURL_Payment_Order_Service+"/payment/createOrder";
export const SHOW_MY_ORDER_URL= baseURL_Payment_Order_Service+"/order/showAllMyOrders"
export const UPDATE_ORDER_URL = baseURL_Payment_Order_Service+"/payment/updateOrder"

export const createOrder = async(totalAmount)=>{
    const data = {amount: totalAmount}; 
    return axios.post(CREATE_ORDER_URL,data,{
        headers:{
            Authorization: `Bearer ${Cookies.get('JwtToken')}`
            // Cookie: `JwtToken=${Cookies.get('JwtToken')};`
         }})
}

export const showOrder = async()=>{
    return axios.get(SHOW_MY_ORDER_URL,{
        headers:{
            Authorization: `Bearer ${Cookies.get('JwtToken')}`
            // Cookie: `JwtToken=${Cookies.get('JwtToken')};`
         }})
}

export const updateOrder= async(data)=>{
    return axios.post(UPDATE_ORDER_URL,data,{
        headers:{
            Authorization: `Bearer ${Cookies.get('JwtToken')}`
            // Cookie: `JwtToken=${Cookies.get('JwtToken')};`
         }})
}