import React, { useEffect, useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getAllProduct } from '../../../service/InventoryService';
import { Link, useNavigate } from 'react-router-dom';
import {FaRupeeSign} from 'react-icons/fa';
import { IsSignedIn, User} from '../../../context/Context';
import { AddToCart } from '../../../service/CartService';
import { UserService } from '../../../service/buyerService';
import { toast } from 'react-toastify';

const Home = () => {

    const [products, setProducts] = useState([]);
    const {isSignedIn} = useContext(IsSignedIn);
    const  {setUser} = useContext(User);
    const navigate = useNavigate();

    const getProducts = async () => {
        getAllProduct()
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
    }

    const AddToCartHandler = (productId)=>{
        AddToCart(productId)
        .then((response)=>{
            UserService()
            .then((response)=>{
                setUser(response.data);
                toast.success("successfully added to cart")
                // reactDom.render(<AlertMsg msg=" product successfully added to cart "/>,document.getElementById('error'))
                navigate('/')
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

    useEffect(() => {
        getProducts()
    }, [])


    return (
        products.length<1?<><h1 style={{textAlign:"center"}}>loading the product</h1></>:<>
        <div className="container">
            <div className="row" style={{justifyContent:"center"}}>
                {
                    products.map(
                        product =>
                            <div className='col-lg-4 col-md-6 col-sm-12' style={{maxHeight:"430px", minHeight:"430px"}} key={product._id}>
                                {/* style={{border:"1px solid black", padding: "15px", height: "220px",margin: "5px auto"}}> */}
                                <Card style={{ width: '18rem', minHeight: "400px", maxHeight:"400px", textAlign:"center", }} className="m-3">
                                    <Card.Img style={{overflow:"hidden",maxHeight:"250px",minHeight:"200px"}} variant="top" src={product.img} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        {(product.desc.length<35)?
                                            <Card.Text style={{marginBottom:"2rem", marginTop: "1rem"}}>
                                                {(product.desc.length>60)?product.desc.slice(0,60)+"..":product.desc}
                                            </Card.Text>
                                            :<Card.Text>
                                            {(product.desc.length>60)?product.desc.slice(0,55)+"..":product.desc}
                                            </Card.Text>
                                        }
                                        <div className="mb-3">
                                            <h5><span className="font-bold d-grid gap-2 col-6 mx-auto"><strong><FaRupeeSign/>-{product.price}</strong></span></h5>
                                        </div>
                                        <Link to={"/product/"+product._id}>
                                        <Button variant="primary" className="d-grid gap-2 col-6 mx-auto" style={{padding:"10px"}}>
                                            Details
                                        </Button></Link> 
                                    </Card.Body>
                                </Card>
                            </div>
                    )
                }
            </div>
        </div></>)
}
export default Home
