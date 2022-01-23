import axios from "axios";
import Cookies from "js-cookie";
import { baseURL_Buyer_Service} from "../constant/BaseURL";

export const BUYER_SIGN_UP_URL = baseURL_Buyer_Service+"/users/signup";
export const BUYER_SIGN_IN = baseURL_Buyer_Service+"/users/login";
export const UPDATE_SELLER_INFO = baseURL_Buyer_Service+"/seller"
export const GET_AUTHENTICATED_USER_DETAIL = baseURL_Buyer_Service+"/users/me";

export const UserService = async ()=>(
    axios.get(GET_AUTHENTICATED_USER_DETAIL,{
      headers:{
        Authorization: `Bearer ${Cookies.get('JwtToken')}`
     }})
)

export const BuyerLogin = async(data)=>(
  axios.post(BUYER_SIGN_IN,data,{
    validateStatus: function (status) {
      return status < 405; 
    }})  
)

export const BuyerSignUp = async(data)=>(
  axios.post(BUYER_SIGN_UP_URL,data)  
)


