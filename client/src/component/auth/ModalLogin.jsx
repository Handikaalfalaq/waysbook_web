import {Form, Modal, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import {API, setAuthToken } from '../../config/Api';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';


function ModalLogin({show, onHide, hereRegister}){
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      setAuthToken(localStorage.token);
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('email', formLogin.email);
      formData.set('password', formLogin.password);

      const response = await API.post('/login', formLogin, config);

      console.log("login success : ", response);

      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      

      // Status check
      if (response.data.data.role === 'admin') {
        navigate('/ListBook');
      } else {
        navigate('/');
      }
      onHide()
      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log("login failed : ", error);
    }
  });

    return(
        <Modal show={show} onHide={onHide}>  
        <Modal.Body style={{ width: '416px', height: 'auto', margin: "auto"}}>
          <Modal.Title style={{fontSize: '36px', marginBottom:'20px', fontWeight:'bold'}}>Login</Modal.Title>
          {/* {message && message} */}
          <Form style={{ width: '416px', margin:'auto'}} onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" >
              <Form.Control name="email" style={{ height: '60px', width: '90%', marginTop: '30px'}} type="text" onChange={handleChange} placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control name="password" style={{ height: '60px', width: '90%', marginTop: '30px'}} type="password" onChange={handleChange} placeholder="password" />
            </Form.Group>

            <Button type="submit" style={{height: '60px', width: '90%', marginTop: '20px', backgroundColor: '#393939', borderColor: '#393939', fontSize:'18px'}}>Login</Button>

            <div style={{textAlign:'center', fontWeight:'500'}}>Don't have an account ? klik
              <button style={{border:'0px', backgroundColor:'transparent', fontWeight:'bold', marginTop: '10px'}} onClick={hereRegister}>Here</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
}

export default ModalLogin