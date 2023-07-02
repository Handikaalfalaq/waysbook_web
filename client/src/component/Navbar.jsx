import {React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Nav, NavDropdown} from 'react-bootstrap';
import FolderImage from './assets/img/folderImg'
import './assets/index.css'
import ModalLogin from './auth/ModalLogin'
import ModalRegister from './auth/ModalRegister'
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import {API} from '../config/Api';

function Navbar() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)
  let navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const handleOpenLogin = () => setShowLogin(true);
  const handleOpenRegister = () => setShowRegister(true);

  const hereRegister = (e) => {
    e.preventDefault();
    setShowLogin(false)
    setShowRegister(true)
  }
 
  const hereLogin = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowRegister(false);
  }

    const logout = () => {
        console.log("ini state", state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }

    const [data, setData] = useState({
      qty:'',
    })


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await API.get(`/carts/${state.user.id}`);
          const dataBookById = response.data.data;
          setData(
            {
              qty : dataBookById.length,
            }
            );
            setIsLoading(false)
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [state.user.id]);

  return (
    <Container className='containerNavbar' >
      <Nav className='navbar'>

      {state.user.role === 'admin' ? (
        <Nav.Item onClick={() => navigate('/ListBook')}>
          <img src={FolderImage.LogoBook} alt="icon" className='logoNavbar'/>
        </Nav.Item>
      ) : (
        <Nav.Item onClick={() => navigate('/')}>
          <img src={FolderImage.LogoBook} alt="icon" className='logoNavbar'/>
        </Nav.Item>
      )}

      {state.user.role === 'admin' ?
         
          <NavDropdown align={'left'} className='fotoProfile' style={{ backgroundImage: `url(${FolderImage.AdminProfile})`,  postion: 'relative'}}>
            <NavDropdown.Item style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 10px', position: 'absolute', right: '10px',width: '160px'}}>
              <div style={{ textDecoration: 'none', color: 'black', paddingLeft: '30px', display:'flex', marginBottom: '15px'}}>
                <div><img src={FolderImage.IconBookBlack} alt="icon add book" /> </div>
                <div style={{marginLeft:'20px', margin:'auto'}} onClick={() => navigate("/AddBook" )}>Add Book</div>
              </div>
              <div style={{ textDecoration: 'none', color: 'black', paddingLeft: '20px', display:'flex', marginBottom: '15px'}}>
                <div><img src={FolderImage.Dollar} style={{width:'50px', marginRight:'15px'}} alt="icon transaction List" /> </div>
                <div style={{marginLeft:'20px', margin:'auto'}} onClick={() => navigate("/ListTransaction" )}>Transaction List</div>
              </div>
              <div style={{ padding: '20px 0px 0px 30px', borderTop: '3px solid #A8A8A8', backgroundColor: 'white', display:'flex' }} >
                <div><img src={FolderImage.IconLogout} alt="icon logout" /></div>
                <div style={{marginLeft:'20px', margin:'auto'}} onClick= { () => logout()}>Logout</div>
              </div>
              <img src={FolderImage.Triangle} alt="Triangle" style={{ position: 'absolute', top: '-23px', right: '110px' }} />
            </NavDropdown.Item>
          </NavDropdown>
        
        : state.user.role === 'user' ?
        <div className='dropdownUser'>
          <div className='dropdownCart' style={{ backgroundImage: `url(${FolderImage.CartBlack})`, position:'relative'}} onClick={() => navigate("/Transaction" )}>
            
          {isLoading ? (
            <div></div>
          ) : (
            data.qty !== 0 ? (
              <div style={{backgroundColor:'red', width:'30px', height:'30px', borderRadius:'50%', position:'absolute', right:'-12px', top:'2px', display:'flex', justifyContent:"center", alignItems:"center", color:'white', fontSize:'16px'}}>{data.qty}</div>
            ) : (
              <div></div>
            )
          )}

          </div>
          {state.user.fotoProfile !== "" ? (

          <NavDropdown className='fotoProfile' style={{ backgroundImage: `url(${state.user.fotoProfile})`}}>
            <NavDropdown.Item style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 0px', position: 'absolute'}}>
              
              <div style={{ textDecoration: 'none', color: 'black', paddingLeft: '30px', display:'flex', marginBottom: '15px'}}>
                <div><img src={FolderImage.IconUser} alt="icon profile" /> </div>
                <div style={{marginLeft:'20px'}} onClick={() => navigate("/Profile" )}>Profile</div>
              </div>

              <div style={{ padding: '20px 0px 0px 30px', borderTop: '3px solid #A8A8A8', backgroundColor: 'white', display:'flex' }} >
                <div><img src={FolderImage.IconLogout} alt="icon logout" /></div>
                <div style={{marginLeft:'20px'}} onClick= { () => logout()}>Logout</div>
              </div>
              <img src={FolderImage.Triangle} alt="Triangle" style={{ position: 'absolute', top: '-23px', right: '105px' }} />
            </NavDropdown.Item>
          </NavDropdown>

          ) : (
            
          <NavDropdown className='fotoProfile' style={{ backgroundImage: `url(${FolderImage.UserProfile})`}}>
            <NavDropdown.Item style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 0px', position: 'absolute'}}>
              
              <div style={{ textDecoration: 'none', color: 'black', paddingLeft: '30px', display:'flex', marginBottom: '15px'}}>
                <div><img src={FolderImage.IconUser} alt="icon profile" /> </div>
                <div style={{marginLeft:'20px'}} onClick={() => navigate("/Profile" )}>Profile</div>
              </div>

              <div style={{ padding: '20px 0px 0px 30px', borderTop: '3px solid #A8A8A8', backgroundColor: 'white', display:'flex' }} >
                <div><img src={FolderImage.IconLogout} alt="icon logout" /></div>
                <div style={{marginLeft:'20px'}} onClick= { () => logout()}>Logout</div>
              </div>
              <img src={FolderImage.Triangle} alt="Triangle" style={{ position: 'absolute', top: '-23px', right: '105px' }} />
            </NavDropdown.Item>
          </NavDropdown>

          )}

            

        </div>
        :
        <Nav.Item style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Nav className='buttonLogin' onClick={handleOpenLogin}>Login</Nav>
          <Nav className='buttonRegister' onClick={handleOpenRegister}>Register</Nav>
        </Nav.Item> 
      }

      </Nav>
      
      <ModalLogin show={showLogin} onHide={()=> setShowLogin(false)} hereRegister={hereRegister} />
      <ModalRegister show={showRegister} onHide={()=> setShowRegister(false)} hereLogin={hereLogin}/>
    </Container>
  ); 
}

export default Navbar;
