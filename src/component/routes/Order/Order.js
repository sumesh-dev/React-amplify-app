import React, { useEffect, useState } from 'react';
import { Navigate} from 'react-router-dom';
import { showOrder } from '../../../service/PaymentService';
import { FaRupeeSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Order = () => {

    const [orders, setOrders] = useState([]);
    // const [orderedProducts, setOrderedProducts] = useState([])

    const getOrder = () => {
        showOrder()
            .then((response) => {
                console.log(response)
                setOrders(response.data.filter((order)=>{return order.paymentStatus==="sucess"}).sort((a,b)=>((a.orderedDate < b.orderedDate) ? 1 : ((b.orderedDate < a.orderedDate) ? -1 : 0))))
        })
            .catch((e) => {
                console.log(e);
                toast.error("error occured")
                Navigate('/')
            })
    }

    useEffect(() => {
        getOrder()
    }, [])


    return (
        <div className="container" style={{marginTop: "5rem"}}>
            {orders.length>0?
                <>
                <h6 className="display-6">My Orders</h6>  
                <div className="row">
                    {orders.map(
                        order=>
                        <div className="col-lg-12" key={order.orderId}>
                            <div className="card" style={{width: "80%",margin: "10px auto"}}>
                                <h5 className="card-header">
                                    <p>Total : <FaRupeeSign/> {order.amount} </p>
                                    <p className="fw-light fs-6">Transaction Id : {order.txnId} </p>
                                    <p className="fw-light fs-6">Order Date : {order.orderedDate.substr(0,19)} </p>
                                </h5>
                            </div>
                        </div>
                    )}
                    
                </div>
                </>
                :<>
                <h6 className="display-6">You not done any order till now!!!!! please order it now</h6>
                </>
            }
        </div>
    )}

export default Order;