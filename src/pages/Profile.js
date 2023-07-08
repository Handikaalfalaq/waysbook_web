import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalInfo from '../component/user/PersonalInfo';
import MyBook from '../component/user/MyBook';

function Profile() {
    return (
      <> 
        <PersonalInfo/>
        <MyBook/>
      </>
    );
  }
  
  export default Profile;
  