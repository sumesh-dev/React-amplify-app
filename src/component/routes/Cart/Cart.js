import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User } from '../../../context/Context';
import { DeleteFromCart, GetAllItemFromCart } from '../../../service/CartService';
import { UserService } from '../../../service/buyerService';
import { createOrder, updateOrder } from '../../../service/PaymentService';
// import CheckOut from './Checkout';

const Cart = () => {

    const [carts, setCarts ] = useState([])
    const { user, setUser } = useContext(User);
    const [isProductLoaded,setIsProductLoaded] = useState(false);
    const navigate = useNavigate()
    // const [totalAmount,setTotalAmount]= useState(0);
    let totalamount=0;

    const saveCart = () => {   
        GetAllItemFromCart()
        .then((response) => {
            console.log(response.data)
            setCarts(response.data);
            setIsProductLoaded(true);
        })
        .catch((e) => {
            console.log(e);
            toast.error("error occured while fetching the product")
            Navigate('/servererror')
        })
    }

    const cartDelete = (productId) => {
        DeleteFromCart(productId)
            .then((response) => {
                toast.success("removed from cart successfully")
                setIsProductLoaded(false)
                UserService().then((response) => {
                    setUser(response.data)
                })
                saveCart();
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const CheckOut = async (totalAmount, user) => {
        createOrder(totalAmount)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const options = {
                        key: "rzp_test_XZmE9htlGHPrr3",
                        amount: response.data.amount,
                        currency: response.data.currency,
                        name: "ecommerce",
                        description: response.data.notes,
                        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpjfH5ZEAnfm2zufUDfd3SWciPuyN2jiK5EA&usqp=CAU",
                        order_id: response.data.id,
                        handler: async function (response) {
                            console.log(response);
                            const data = {
                                order_id: response.razorpay_order_id,
                                payment_id: response.razorpay_payment_id,
                                status: "sucess"
                            }
                            console.log(data)
                            updateOrder(data)
                                .then((response) => {
                                    console.log(response)
                                    UserService()
                                    .then((response) => {
                                        setUser(response.data)
                                        toast.success("payment successful")
                                    navigate('/order')
                                    })
                                    
                                })
                                .catch((e)=>{
                                    console.log(e)
                                    UserService()
                                    .then((response) => {
                                        setUser(response.data)
                                    })
                                    toast.success("payment successful")
                                    navigate('/order')
                                })
                                
                        },
                        prefill: {
                            name: user.firstName,
                            email: user.email,
                            contact: "9999999999",
                        },
                        notes: {
                            address: "Razorpay Corporate Office",
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    }
                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                }
            })
        }
    useEffect(() => {
        if (user.productInCart.length > 0)
            saveCart();
    }, [user])

    return (
        <div className="container" style={{ marginTop: "5rem" }}>
            {user.productInCart.length > 0&&user.productInCart[0]&&isProductLoaded?
                <>
                    <h6 className="display-6">Cart</h6>
                    <div className="row">
                        <div className="col-lg-8">
                            {carts.map(
                                cart =>
                                    <div className="card mb-3" style={{width:"90%"}} key={cart._id}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img style={{width:"200px"}} src={cart.img} alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{cart.name}</h5>
                                                    <p className="card-text">{cart.desc}</p>
                                                    <button className="btn btn-sm btn-danger" onClick={()=>{cartDelete(cart._id)}}>remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                        <div className="col-lg-4"> 
                        <h6 className="display-6">Products</h6>
                        <ul className="list-group">
                            {
                                carts.map(
                                    cart=>
                                        <div key ={cart._id}>
                                        <li className="list-group-item">{cart.name} <strong>&#8377;{cart.price}</strong> </li>
                                        <div style={{display:"none"}}>{totalamount = totalamount+cart.price}</div>
                                        </div> 
                                )
                            }
                         </ul>   
                         <div className="mt-2">
                            <p className="fw-bold">Total Amount :  &#8377; {totalamount}</p>
                            <button className="btn btn-success"onClick={()=>{CheckOut(totalamount,user)}}>Proceed To Pay</button>
                        </div>
                        </div>
                    </div>
                </> 
                :<>{user.productInCart[0]?<h5>fetching product from server....</h5>:<><h6 className="display-6">Currently you have no items in your cart. please add items!!!!</h6></>}</>  
            }
         </div>
        )
}

export default Cart;
