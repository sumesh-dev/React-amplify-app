import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { addProduct, imageUpload, UpdateProduct,} from '../../../service/InventoryService'
import { TiTick } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddNewProduct = (props) => {
    const location = useLocation();
    const [id,setid] = useState();
    const [updateProduct, setUpdateProduct] = useState(false)
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [isFilePicked, setIsFilePicked] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(location)
        if (location.state!=null && location.state.name && location.state.price && location.state.img && location.state.desc&&location.state.id) {
            setUpdateProduct(true)
            setid(location.state.id)
            setName(location.state.name)
            setDesc(location.state.desc)
            setUrl(location.state.img)
            setPrice(location.state.price)
            setName(location.state.name)
        }
    }, [])

    const fileHandler = (e) => {
        console.log(e)
        setSelectedFile(e.target.files[0])
        // console.log(selectedFile)
        setIsFilePicked(true);
        let formData = new FormData();
        formData.append("file",e.target.files[0])
        imageUpload(formData)
        .then((response) => {
            console.log(response.data)
            setUrl(response.data)
        })
        .catch((e) => {
            console.log(e);
            setError(true);
        })
    }
    // const updateHandler=()=>{
    //     UpdateProduct()
    // }
    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            img: url,
            price: price,
            desc: desc
        }
        if (updateProduct) {
            UpdateProduct(data,id).then((response)=>{
                toast.success(" product updated successfully ")
                setUpdateProduct(false)
                navigate('/myproducts')
                // reactDom.render(<AlertMsg msg=" product updated successfully " />, document.getElementById('error'))
                // Navigate('/myproducts')
            })
            .catch((e)=>{
                console.log(e)
                setUpdateProduct(false)
                toast.error("unabe to update product error occured at server side")
                navigate('/myproducts')
            })
        }
        else {
            addProduct(data)
                .then((response) => {
                    toast.success("product added successfully")
                    console.log(response.data)
                    navigate('/myproducts')
                })
                .catch((e) => {
                    console.log(e)
                    toast.error("error occured ")
                    setName("")
                    setPrice("")
                    setDesc("")
                })
        }
    }

    return (
        <div className="container" style={{ marginTop: "3rem", width: "80vw" }}>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>upload single Jpeg/png file</Form.Label>
                    <Form.Control required={url==null} type="file" onChange={fileHandler} />
                    {isFilePicked && <div>
                        <p>Filename: {selectedFile.name}</p>
                        {()=>setUrl(null)}
                    </div>
                    }
                    {url && <div>
                        <p>file successfully uploaded to <a href={url} target='_blank'>{url}</a> {<TiTick />}</p>
                    </div>
                    }
                    {error && <div>
                        <p>error occured on uploading file please again select file</p>
                    </div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>price</Form.Label>
                    <Form.Control type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Desription</Form.Label>
                    <Form.Control as="textarea" cols={30} rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} />
                </Form.Group>
                {updateProduct ?
                    <Button className="d-grid gap-2 col-6 mx-auto" variant="primary" type="submit">
                        Update Product
                    </Button>
                    : <Button className="d-grid gap-2 col-6 mx-auto" variant="primary" type="submit">
                        Submit
                    </Button>
                }
            </Form>
        </div>
    )
}

export default AddNewProduct;
