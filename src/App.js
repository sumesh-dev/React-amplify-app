import { useContext, useEffect } from 'react';
import './App.css';
import { IsSignedIn, User } from './context/Context';
import NavbarComponent from './component/routes/Navbar/NavbarComponent';
import Login from './component/routes/Login/Login';
import Home from './component/routes/Home/Home';
import SignUp from './component/routes/SignUp/SignUp';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserService } from './service/buyerService';
import ServerError from './component/ErrorComponent/ServerError';
import Cart from './component/routes/Cart/Cart';
import Logout from './component/routes/Login/Logout';
import Order from './component/routes/Order/Order';
import Dashboard from './component/routes/Dashboard/Dashboard';
import NotFound from './component/ErrorComponent/NotFound';
import AddNewProduct from './component/routes/Product/AddNewProduct';
import Unauthorize from './component/routes/Unauthorize';
import ShowSellerProduct from './component/routes/Product/ShowSellerProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SellerLogin from './component/routes/Login/SellerLogin';
import SellerSignUp from './component/routes/SignUp/SellerSignUp';
import { AuthenticatedSellerService } from './service/SellerService';
import SearchPage from './component/routes/Search/SearchPage';
import Product from './component/routes/Product/Product';

function App() {

  const { user, setUser } = useContext(User);
  const { isSignedIn, setIsSignedIn } = useContext(IsSignedIn);
  const setIntialState = async () => {
    if (Cookies.get('JwtToken')) {
      const response = await UserService();
      // console.log(response.status);
      if (response.status === 200) {
        setUser(response.data);
        setIsSignedIn(true);
      }
      if(response.status===403){
        Cookies.remove('JwtToken')
        setIsSignedIn(false);
        setUser([]);
        toast.info(" your session expired, please relogin again!! ")
      }
    }
    else
    if (Cookies.get('SJwtToken')) {
      const response = await AuthenticatedSellerService();
      // console.log(response.status);
      if (response.status === 200) {
        setUser(response.data);
        setIsSignedIn(true);
      }
      if(response.status===403){
        Cookies.remove('SJwtToken')
        setIsSignedIn(false);
        setUser([]);
        toast.info(" your session expired, please relogin again!! ")
      }
    }
  }
  useEffect(() => {
    setIntialState();
  }, [])

  return (
    <Router>
      <div className='App'>
        <NavbarComponent />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* <Error /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/sellerlogin" element={<SellerLogin />} />
          <Route exact path="/sellersignup" element={<SellerSignUp />} />
          {/* <Route exact path="/product/:id" element={<Product/>}/> */}
          <Route exact path="/servererror" element={<ServerError />} />
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/product/:id" element={<Product/>}/>
          {/* {!isSignedIn?<Route exact path="/login" element={<Login />} />
            :<Route exact path="/login" element={<LoginUser />} />} */}
          {isSignedIn ? <>
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/order" element={<Order />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/myproducts" element={<ShowSellerProduct />} />
            {user.role === "seller" && <Route exact path="/addnewproduct" element={<AddNewProduct />} />}
            {user.role === "admin" && <Route exact path="/dashboard" element={<Dashboard />} />}
          </>
            : <Route exact path="*" element={<Unauthorize />} />
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
