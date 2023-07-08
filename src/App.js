import {Route, Routes, redirect} from "react-router-dom"
import Navbar from "./component/Navbar" 
import { Container } from "react-bootstrap"; 
import Home from "./component/Home"
import AddBook from "./pages/AddBook"
import DetailBook from "./pages/DetailBook"
import Profile from "./pages/Profile"
import Transaction from "./pages/Transaction"
import ListTransaction from "./pages/ListTransaction"
import ListBook from "./pages/ListBook"
import UpdateBook from "./pages/UpdateBook"
// import { PrivateRouteLogin, PrivateRouteUser, PrivateRouteAdmin } from './components/PrivateRoute';
import { UserContext } from './context/UserContext';
import { useContext, useEffect, useState } from 'react';
import {API, setAuthToken} from './config/Api';

function App() {
  // let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    
    if (!isLoading) {
      if (state.isLogin === false) {
        // navigate('/');
        redirect('/');
      }
    }
  }, [isLoading]);

  

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);


  return (
    <>
      <Container style={{maxWidth: "1440px", height: "auto", margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#E5E5E5"}}> 

        <Navbar/>

        <Routes>
        {/* <Route exact path="/" element={<PrivateRoute role="admin"/>} >    */}
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/DetailBook/:id" element={<DetailBook/>} />
            <Route exact path="/Profile" element={<Profile/>} />
            <Route exact path="/Transaction" element={<Transaction/>} />
          {/* </Route> */}
          
          {/* <Route exact path="/" element={<PrivateRoute role="admin"/>} >   */}
            <Route exact path="/AddBook" element={<AddBook/>} />
            <Route exact path="/ListTransaction" element={<ListTransaction/>} />
            <Route exact path="/ListBook" element={<ListBook/>} />
            <Route exact path="/UpdateBook/:id" element={<UpdateBook/>} />
          {/* </Route> */}
        </Routes>

      </Container>
    </>
  );
}

export default App;
