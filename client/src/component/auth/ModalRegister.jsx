import {Form, Modal, Button, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import {API} from '../../config/Api';
import { useMutation } from 'react-query';

function ModalRegister({show, onHide, hereLogin}) {
  const [message, setMessage] = useState(false);
  const [formRegister, setFormRegister] = useState({
      email: '',
      password: '',
      fullName: '',
      gender:'',
      phone: '',
      address: '',
    });
    
      const handleChange = (e) => {
        setFormRegister({
          ...formRegister,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
          
          const config = {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          };
    
          const formData = new FormData();
          formData.set('email', formRegister.email);
          formData.set('password', formRegister.password);
          formData.set('fullName', formRegister.fullName);
          formData.set('gender', formRegister.gender);
          formData.set('phone', formRegister.phone);
          formData.set('address', formRegister.address);
    
          const response = await API.post('/register', formData, config);
    
          console.log("register success : ", response)
          const alert = (
            <Alert variant="success" className="py-1">
              Register success!
            </Alert>
          );
          setMessage(alert);
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-1">
              Failed to register!
            </Alert>
          );
          setMessage(alert);
          console.log("register failed : ", error);
        }
      });
    return(
        <Modal show={show} onHide={onHide} onSubmit={(e) => handleSubmit.mutate(e)}>  
        <Modal.Body style={{ width: '416px', height: 'auto', margin: "auto"}}>
          <Modal.Title style={{fontSize: '36px', marginBottom:'20px', fontWeight:'bold'}}>Register</Modal.Title>
          {message && message}
          <Form style={{ width: '416px', margin:'auto'}}>
            <Form.Group className="mb-3" >
              <Form.Control name="email" style={{ height: '60px', width: '90%', marginTop: '30px'}} type="text" placeholder="Email" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control name="password" style={{ height: '60px', width: '90%', marginTop: '30px'}} type="password" placeholder="password" onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control name="fullName" style={{ height: '60px', width: '90%', marginTop: '30px'}} type="text" placeholder="Full Name" onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div style={{ display: 'flex' }}>
                <Form.Check type="radio" name="gender" id="male" label="Male" value="male" style={{marginRight: '10px'}} onChange={handleChange} required/>
                <Form.Check type="radio" name="gender" id="female" label="Female" value="female" onChange={handleChange} required/>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control name="phone" style={{ height: '60px', width: '90%', marginTop: '30px'}} type="text" placeholder="Phone" onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control name="address" style={{ height: '60px', width: '90%', marginTop: '30px'}} type="text" placeholder="Address" onChange={handleChange} required/>
            </Form.Group>

            <Button type="submit" style={{height: '60px', width: '90%', marginTop: '20px', backgroundColor: '#393939', borderColor: '#393939', fontSize:'18px'}}>Register</Button>

            <div style={{textAlign:'center', fontWeight:'500'}}>Don't have an account ? klik
              <button style={{border:'0px', backgroundColor:'transparent', fontWeight:'bold', marginTop: '10px'}} onClick={hereLogin}>Here</button>
            </div>
            
          </Form>
        </Modal.Body>
      </Modal>
    )
}

export default ModalRegister