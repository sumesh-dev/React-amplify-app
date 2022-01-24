import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { FaRupeeSign } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteProduct, getMyProduct } from '../../../service/InventoryService'

// user will get to see only those product which he created
const ShowSellerProduct = () => {
    const [products,setProducts] =useState([]);
    const navigate = useNavigate()

    const deleteProduct = (productId)=>{
        DeleteProduct(productId)
        .then((response)=>{
            // console.log(response)
            toast.success("product deleted successfully")
            getMyProduct()
            .then((response)=>{
            console.log(response.data)
            setProducts(response.data)
            })
            .catch((e)=>{
            console.log(e);
            navigate('/servererror')
            })
        })
        .catch((e)=>{
            toast.error("error occured on product delete")

        })
    }
    useEffect(()=>{
        getMyProduct()
        .then((response)=>{
            console.log(response.data)
            setProducts(response.data)
        })
        .catch((e)=>{
            console.log(e);
            navigate('/servererror')
        })
    },[])

    return (
        <div className="container">
            {products.length>0?
                <div className="row" style={{justifyContent:"center"}}>
                {
                    products.map(
                        product =>
                            <div className='col-lg-4 col-md-6 col-sm-12' style={{maxHeight:"500px", minHeight:"500px"}} key={product._id}>
                                {/* style={{border:"1px solid black", padding: "15px", height: "220px",margin: "5px auto"}}> */}
                                <Card style={{ width: '18rem', minHeight: "500px", maxHeight:"500px", textAlign:"center" }} className="m-3">
                                    <Card.Img style={{overflow:"hidden",border:"1px solid black",maxHeight:"200px",minHeight:"200px"}} variant="top" src={product.img} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            {(product.desc.length>60)?product.desc.slice(0,60)+"..":product.desc}
                                        </Card.Text>
                                        <div className="mb-3">
                                            <h5><span className="font-bold d-grid gap-2 col-6 mx-auto"><strong><FaRupeeSign/>-{product.price}</strong></span></h5>
                                        </div>
                                        <Button variant="primary" className="d-grid gap-2 col-6 mx-auto" style={{padding:"10px"}} onClick={()=>(navigate('/addnewproduct',{state:{id:product._id,name:product.name,img:product.img,desc:product.desc,price:product.price}}))}>Update</Button>
                                        <Button variant="danger" className="d-grid gap-2 col-6 mx-auto mt-3" style={{padding:"10px"}} onClick={()=>{deleteProduct(product._id)}}>Delete</Button>                                    
                                    </Card.Body>
                                </Card>
                            </div>
                    )
                }
            </div>
                :<>
                <h4 className="display-6">You didn't add any product till yet please add some product <Link className="link-primary" to="/addnewproduct"> <Button variant="primary">Add New Product</Button></Link></h4>
                </>}
        </div>
    )
}

export default ShowSellerProduct
