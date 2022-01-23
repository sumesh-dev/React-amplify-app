import axios from 'axios';
import Cookies from 'js-cookie';
import {baseURL_Inventory_Service} from '../constant/BaseURL';

export const ADD_REVIEW_URL = baseURL_Inventory_Service+"/review/";
export const DELETE_REVIEW_URL = baseURL_Inventory_Service+"/review/";
// export const EDIT_REVIEW_URL = baseURL_Inventory_Service+"/review/";

export const addReview = (data,productId)=>(
    axios.post(ADD_REVIEW_URL+productId,data,{
        headers:{
            Authorization: `Bearer ${Cookies.get('JwtToken')}`
         }
    })    
)

export const deleteReview = (productId)=>(
    axios.delete(DELETE_REVIEW_URL+productId,{
        headers:{
            Authorization: `Bearer ${Cookies.get('JwtToken')}`
         }
    })
)

// export const editReview = (data)=>(
//     axios.patch(EDIT_REVIEW_URL,data,{
//         headers:{
//             Authorization: `Bearer ${Cookies.get('JwtToken')}`
//          }
//     })
// )
