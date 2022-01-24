import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaRupeeSign } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IsSignedIn, User } from '../../../context/Context';
import { UserService } from '../../../service/buyerService';
import { AddToCart } from '../../../service/CartService';
import { getSingleProductInfo } from '../../../service/InventoryService';
import Rating from 'react-star-review';
import { addReview, deleteReview } from '../../../service/reviewService';

const Product = () => {
    const { user, setUser } = useContext(User)
    const [product, setProduct] = useState([])
    // const [firstName,setFirstName] = useState(user.firstName)
    const [email,setEmail] = useState("")
    const [rating,setRating] = useState()
    const [comment,setComment] = useState("")
    // const [responseCheck, setResponseCheck] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { isSignedIn } = useContext(IsSignedIn)
    const [commentFound, setCommentFound] = useState(false) 

    const AddToCartHandler = (productId)=>{
        AddToCart(productId)
        .then((response)=>{
            UserService()
            .then((response)=>{
                setUser(response.data);
                toast.success("successfully added to cart")
                // navigate('/')
            })
            .catch((e)=>{
                console.log(e)
                toast.error("unable to add product in cart error occured in server side")
                // navigate('/servererror')
            })
        // }
        })
        .catch((e)=>{
            console.log(e)
            toast.error("unable to add product in cart")
            // reactDom.render(<AlertMsg msg=" unable to add product in cart "/>,document.getElementById('error'))
        })
    }

    const commentHandler =(e)=>{
        e.preventDefault()
        console.log(user)
        // setFirstName(user.firstName)
        const data = {firstName:user.firstName,email:email,rating:rating,comment:comment}
        console.log(data)
        addReview(data,id)
        .then((response)=>{
            getSingleProductInfo(id)
            .then((response) => {
                console.log(response.data)
                setProduct(response.data,)
            })
            console.log(response.data)
        })
        .catch(()=>{
            toast.error("error occured at server side")
        })
    }

    const deletereview = (e)=>{
        deleteReview(id)
        .then((response)=>{
            getSingleProductInfo(id)
            .then((response) => {
                console.log(response.data)
                setProduct(response.data)
                console.log(product)
                // console.log(product)
            })
            console.log(response.data)
        })
    }

    useEffect(()=>{
        if(isSignedIn&&product.reviews){
            let review = product.reviews.find((review)=>review.email == user.email)
            console.log(review)
            if(review!=undefined){
                setCommentFound(true)
                console.log(commentFound)
            }
            else{
                setCommentFound(false)
                console.log(commentFound)
            }
        }
    },[product])

    useEffect(() => {
        getSingleProductInfo(id)
            .then((response) => {
                console.log(response.data)
                setProduct(response.data)
                // console.log(product)
                // console.log(product.reviews.find((review)=>review.email === user.email))
            })
            .catch((err) => {
                console.log(err)
                navigate('/servererror')
            })
    }, [isSignedIn])

    return (
        <div className="container" style={{ marginTop: "5rem" }}>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card" style={{ width: "25rem" }}>
                        <img src={product.img} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <h5 className="card-title"><FaRupeeSign /> {product.price}</h5>
                            <p className="card-text">{product.desc}</p>
                            <div className="mb-3 mt-3">
                                {isSignedIn ?
                                    <Button className="d-grid gap-2 col-6 mx-auto" variant="primary"  style={{ padding: "10px" }} onClick={() => { AddToCartHandler(product._id) }}>
                                        Add to cart
                                    </Button>
                                    :
                                    <Button className="d-grid gap-2 col-6 mx-auto" variant="secondary" style={{ padding: "10px" }} disabled>
                                        login to add in cart
                                    </Button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <h1 className="display-4">Leave a Review</h1>
                    {!commentFound&&
                    <Form onSubmit={commentHandler}>
                        <Rating required className ="mt-3" rating={0} interactive onRatingChanged={(r) => setRating(r)}/>
                        <Form.Control className ="mt-3" as="textarea" rows={2} placeholder="enter comment here..." value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
                        <Button className="d-grid gap-2 col-6 mx-auto mt-3" type="submit" variant="primary" disabled={!isSignedIn}>Submit</Button>
                    </Form>
                    }
                    <div className="mb-3 mt-3">
                        {product.reviews!=null&&product.reviews.map(
                            review =>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Rating: {review.rating}</h5>
                                    <Rating rating={review.rating} />
                                    <p style={{color: "gray"}}>By {review.firstName} </p>
                                    <p className="card-text">Review: {review.comment} </p>
                                    {(review.email === user.email)&&<Button className="d-grid gap-2 col-6 mx-auto" variant="danger" onClick={deletereview}>Delete</Button>}
                                </div>
                            </div>)
                        } 
                    </div>

                </div>
            </div>
        </div>)
}

export default Product;