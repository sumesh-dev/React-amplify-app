import axios from 'axios';
import Cookies from 'js-cookie';
import {baseURL_Seller_Service} from '../constant/BaseURL'

export const SELLER_SIGN_UP_URL = baseURL_Seller_Service+"/seller/signup";
export const SELLER_SIGN_IN = baseURL_Seller_Service+"/seller/signin";
export const GET_AUTHENTICATED_SELLER_DETAIL = baseURL_Seller_Service+"/seller/me";
export const UPDATE_SELLER_INFO = baseURL_Seller_Service+"/seller"


export const SellerSignInService = async(data)=>(
    axios.post(SELLER_SIGN_IN,data,{
        validateStatus: function (status) {
                return status < 405; 
        }})
)

export const SellerSignUpService = async(data)=>(
    axios.post(SELLER_SIGN_UP_URL,data)
)

export const AuthenticatedSellerService = async()=>(
    axios.get(GET_AUTHENTICATED_SELLER_DETAIL,{
        headers:{
            Authorization: `Bearer ${Cookies.get('SJwtToken')}`
        },
        validateStatus: function (status) {
            return status < 405; 
          }
    })
)

export const UpdateSellerService = async(data)=>{
    axios.post(UPDATE_SELLER_INFO,data,{
        headers:{
            Authorization: `Bearer ${Cookies.get('SJwtToken')}`
        }
    })
}