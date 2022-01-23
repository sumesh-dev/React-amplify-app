import axios from "axios";
import Cookies from "js-cookie";
import { baseURL_Inventory_Service } from "../constant/BaseURL";

export const GET_ALL_PRODUCT_URL = baseURL_Inventory_Service+"/product/getAllProducts";
export const ADD_PRODUCT_URL = baseURL_Inventory_Service+"/product/addProduct";
export const DELETE_PRODUCT_URL = baseURL_Inventory_Service+"/product/delete/";
export const UPDATE_PRODUCT_URL = baseURL_Inventory_Service+"/product/update/";
export const GET_ALL_PRODUCT_BY_ME_URL = baseURL_Inventory_Service+"/product/getAllProductsByMe/";
export const IMAGE_UPLOAD_URL = baseURL_Inventory_Service+"/product/upload";
export const SINGLE_PRODUCT_URL = baseURL_Inventory_Service+"/product/getProduct/"
export const SEARCH_PRODUCT_URL = baseURL_Inventory_Service+"/product/searchByName/"

export const getAllProduct = async()=>{
    return axios.get(GET_ALL_PRODUCT_URL);
}

export const addProduct = async(data)=>{
    return axios.post(ADD_PRODUCT_URL,data,{
        headers:{
            Authorization: `Bearer ${Cookies.get('SJwtToken')}`
         }})
}

export const DeleteProduct= async(productId)=>{
    return axios.delete(DELETE_PRODUCT_URL+productId,{
        headers:{
            Authorization: `Bearer ${Cookies.get('SJwtToken')}`
         }})
}

export const UpdateProduct = async(data,id)=>{
    return axios.patch(UPDATE_PRODUCT_URL+id,data,{
        headers:{
            Authorization: `Bearer ${Cookies.get('SJwtToken')}`
         }})
}

export const getSingleProductInfo = async(productId)=>{
    return axios.get(SINGLE_PRODUCT_URL+productId)
}

export const getMyProduct = async()=>{
    return axios.get(GET_ALL_PRODUCT_BY_ME_URL,{
        headers:{
            Authorization: `Bearer ${Cookies.get('SJwtToken')}`
         }})
}

export const imageUpload = async(data)=>{
    return axios.post(IMAGE_UPLOAD_URL,data,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${Cookies.get('SJwtToken')}`
         }})
}

export const searchProductService = async(searchName)=>(
    axios.get(SEARCH_PRODUCT_URL+searchName)
)