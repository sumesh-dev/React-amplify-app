import React, { useContext, useEffect, useState } from 'react';
import { Container, Navbar, Button, NavDropdown, Nav, Form, FormControl } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IsSignedIn, User } from '../../../context/Context';
import { BsCart4 } from 'react-icons/bs';

const NavbarComponent = () => {
    const [searchTerm,setSearchTerm] = useState("")
    const { isSignedIn } = useContext(IsSignedIn);
    const { user } = useContext(User);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(isSignedIn);
        console.log(user);
        console.log(location)
    }, [isSignedIn, user, location])

    return (
        <div id="nav">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid >
                    <Navbar.Brand as={Link} to={"/"}>ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        {user.role != "seller"&&<Nav.Link as={Link} to={"/"}>Home</Nav.Link>}
                        </Nav>
                        {((location.pathname==="/")||((location.pathname==="/search")))&&
                        (<Form className="d-flex" onSubmit={(e)=>{e.preventDefault();return navigate('/search',{state:{searchTerm:searchTerm}})}}>
                            <FormControl
                                type="input"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button type="submit" variant="outline-success">Search</Button>
                        </Form>)
                        }
                        {isSignedIn ? <>
                            {user.role === "customer"&&
                            <Nav.Link as={Link} to={"/cart"}>
                                <h4><BsCart4 /><sup><span className="badge bg-danger">{user.productInCart.length > 0 && user.productInCart[0] ? user.productInCart.length : ""}</span></sup></h4>
                            </Nav.Link>
                            }
                            {user.role === "seller" && <>
                                <Nav.Link as={Link} to={"/addnewproduct"}>
                                    <h4>Add New Product</h4>
                                </Nav.Link>
                            </>
                            }
                            <NavDropdown title={"Hello " + user.firstName} id="navbarScrollingDropdown">
                                {user.role === "customer" ? <>
                                    <NavDropdown.Item as={Link} to='/order'>view orders</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/logout'>Logout</NavDropdown.Item>
                                </>
                                    : user.role === "admin" ? <>
                                        <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                                    </>
                                        : <>
                                            <NavDropdown.Item as={Link} to='/myproducts'>Show My Products</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to='/logout'>Logout</NavDropdown.Item>
                                        </>
                                }
                            </NavDropdown>
                        </>
                            : <Nav.Link as={Link} to={"/login"}>Login/Register</Nav.Link>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;