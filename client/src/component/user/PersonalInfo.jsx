import {React, useState, useEffect, useContext} from 'react';
import '../assets/index.css'
import folderImage from '../assets/img/folderImg'
import {Form, Button, Modal} from 'react-bootstrap';
import { API } from '../../config/Api';
import { UserContext } from '../../context/UserContext';
import { useMutation } from 'react-query';

function PersonalInfo() {
    const [state] = useContext(UserContext);
    const [updateProfile, setUpdateProfile] = useState(false)

    const hadleFormProfile = () => {
        setUpdateProfile(true)
      }

    const handleCloseFromProfile = () => {
        setUpdateProfile(false)
    }

    const [formUpdateProfile, setFormUpdateProfile] = useState({
        fullName: '',
        gender: '',
        email:'',
        phone: '',
        address:'',
        image:'',
    })

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("id user", state.user.id)
            const response = await API.get(`/user/${state.user.id}`);
            const dataUserById = response.data.data;

            var imageProfile = ''
                if (dataUserById.fotoProfile !== '') {
                    imageProfile = dataUserById.fotoProfile
                } else {
                    imageProfile = folderImage.UserProfile
                }
                
            setFormUpdateProfile(
              {
                fullName: dataUserById.fullName,
                email: dataUserById.email,
                gender: dataUserById.gender,
                phone: dataUserById.phone,
                address: dataUserById.address,
                image: imageProfile,
              }
            );
            
          } catch (error) {
            console.log("ada", error);
          }
        };
    
        fetchData();
      }, [state.user.id]);

      const handleChange = (e) => {
        setFormUpdateProfile({
            ...formUpdateProfile,
            [e.target.name]:
              e.target.type === 'file' ? e.target.files : e.target.value,
          })
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
                    formData.set('fullName', formUpdateProfile.fullName)
                    formData.set('email', formUpdateProfile.email)
                    formData.set('gender', formUpdateProfile.gender)
                    formData.set('phone', formUpdateProfile.phone)
                    formData.append('image', formUpdateProfile.image[0], formUpdateProfile.image[0].name);
              
              const response = await API.patch(`/user/${state.user.id}`, formData, config);
              setUpdateProfile(false)
              console.log("add user success : ", response);
              console.log("data : ", formData);
                
                
            } catch (error) { 
              console.log("add profile failed : ", error);
            }
          });


    return (
        <div className='containerPersonalInfo'>
            <div className='personalInfoTitle'>Profile</div>
            <div className='boxPersonalInfo'>
                <div className='boxInformasiPersonalInfo'>
                    <div className="boxPersonalInformation">
                        <div className='iconProfileFullName' style={{backgroundImage: `url(${folderImage.Akun})`}}></div>
                        <div className="dataInformation">
                            <div className="titleInformationPersonal">{formUpdateProfile.fullName}</div>
                            <div className="titlePersonalInfo">fullname</div>
                        </div>
                    </div>

                    <div className="boxPersonalInformation">
                        <div className='iconProfileEmail' style={{backgroundImage: `url(${folderImage.Email})`}}></div> 
                        <div className="dataInformation">
                            <div className="titleInformationPersonal">{formUpdateProfile.email}</div>
                            <div className="titlePersonalInfo">Email</div>
                        </div>
                    </div>

                    <div className="boxPersonalInformation">
                        <div className='iconProfileGender' style={{backgroundImage: `url(${folderImage.Gender})`}}></div>
                        <div className="dataInformation">
                            <div className="titleInformationPersonal">{formUpdateProfile.gender}</div>
                            <div className="titlePersonalInfo">Gender</div>
                        </div>
                    </div>

                    <div className="boxPersonalInformation">
                        <div className='iconProfilePhone' style={{backgroundImage: `url(${folderImage.Phone})`}}></div>
                        <div className="dataInformation">
                            <div className="titleInformationPersonal">{formUpdateProfile.phone}</div>
                            <div className="titlePersonalInfo">Phone</div>
                        </div>
                    </div>

                    <div className="boxPersonalInformation">
                        <div className='iconProfileAddress' style={{backgroundImage: `url(${folderImage.Address})`}}></div>
                        <div className="dataInformation">
                            <div className="titleInformationPersonal">{formUpdateProfile.address}</div>
                            <div className="titlePersonalInfo">Address</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='fotoPersonalInfo' style={{backgroundImage: `url(${formUpdateProfile.image})`}}></div>
                    <div className='editProfile' onClick={hadleFormProfile} >Edit Profile</div>
                </div>
            </div>
            

            <Modal show={updateProfile} onHide={handleCloseFromProfile} display={{alignItems:'center', width:'500px'}}>
                <Form className='containerRegister' display={{width:'500px'}} onSubmit={(e) => handleSubmit.mutate(e)}>

                    <p style={{margin:'51px 0px 75px', textAlign:'center', fontSize:'36px'}}>Update Profile</p>

                    <Form.Group style={{marginBottom:'35px'}}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={formUpdateProfile.fullName}  type="text" placeholder="Enter Full Name" name="fullName"  onChange={handleChange} required />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group style={{marginBottom:'35px'}}>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control value={formUpdateProfile.phone} type="text" placeholder="Enter Phone" name="phone" onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <div style={{ display: 'flex' }}>
                            <Form.Check type="radio" name="gender" id="male" label="Male" value="male" style={{marginRight: '10px'}} onChange={handleChange} required/>
                            <Form.Check type="radio" name="gender" id="female" label="Female" value="female" onChange={handleChange} required/>
                        </div>
                    </Form.Group>

                    <Form.Group style={{marginBottom:'35px'}}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={formUpdateProfile.address} type='textarea' placeholder="Address" name="address" style={{height:'70px'}} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Foto Profile</Form.Label>
                        <Form.Control name="image" onChange={handleChange} type="file" required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{backgroundColor:'#FFAF00', border:'0px', width:'100%', marginBottom:'10px'}} >Update</Button>
                </Form>
            </Modal>   
        </div>
    )
}

export default PersonalInfo