import axios from 'axios'
import Cookies from 'js-cookie';
import { baseURL_Buyer_Service } from '../constant/BaseURL';

const ADD_TO_CART_URL = baseURL_Buyer_Service+"/cart/";
const ALL_ITEM_IN_CART = baseURL_Buyer_Service+"/cart/showAllItemInCart";
const DELETE_Item_FORM_CART = baseURL_Buyer_Service+"/cart/";

export const GetAllItemFromCart = async()=>{
    return axios.get(ALL_ITEM_IN_CART, {
        headers:{
            Authorization: `Bearer ${Cookies.get('JwtToken')}`
            // Cookie: `JwtToken=${Cookies.get('JwtToken')};`
         }})
}

export const DeleteFromCart = async(productId)=>{
    return axios.delete(DELETE_Item_FORM_CART+productId, {
        headers:{
            Authorization: `Bearer ${Cookies.get('JwtToken')}`
            // Cookie: `JwtToken=${Cookies.get('JwtToken')};`
         },
        })
}

export const AddToCart = async(productId)=>{
    return axios.get(ADD_TO_CART_URL+productId,{
        headers:{
            Authorization: `Bearer ${Cookies.get('JwtToken')}`
            // Cookie: `JwtToken=${Cookies.get('JwtToken')};`
         },
         })
}