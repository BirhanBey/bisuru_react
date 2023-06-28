import LoginForm from './LoginForm';
import { useState } from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import logo from '../assets/1.png'

function LoginPage() {
  let userInfo = localStorage.getItem('userInfo')
    ? localStorage.getItem('userInfo')
    : 'guest';
  let token = localStorage.getItem('token');
  const isLoggedIn = useState(null);

  const handleLogin = async (email, password) => {
    // Login işlemini gerçekleştir ve gerekli API çağrılarını yap
    await axios
      .request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://s3.syntradeveloper.be/bisurularavel/api/login',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ email, password }),
      })
      .then((response) => {
        userInfo = response.data.adminInfo.roles[0].title;
        localStorage.setItem(
          'userInfo',
          response.data.adminInfo.roles[0].title
        );

        localStorage.setItem('token', response.data.token);
        if (userInfo == 'SuperUser') {
        window.location.href = '/adminpanel';
        }
        else if (userInfo == 'Cooperative') {
          window.location.href = '/cooperativepanel';
        }else if (userInfo == 'CoopStaff') {
          window.location.href = '/cooperativepanel';
        }else if (userInfo == 'Farmer') {
          window.location.href = '/farmers';
        }else if (userInfo == 'Farm') {
          window.location.href = '/farms';
        }else if (userInfo == 'FarmStaff') {
          window.location.href = '/farmstaffcontrol';
        }       
      })
      .catch((error) => {
        console.error('Login Error:', error);
      });
  };

  return (
    <div className='d-flex flex-column align-items-center login-page'>
      <Image src={logo} alt='logo'/>
      <h2 style={{color: "white", marginBottom: "100px"}}>Cooperative Management System</h2>
      <h3 style={{color: "white"}}>Login Page </h3>
      <div className='w-50'>
      <LoginForm
        handleLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        token={token}
      />
      </div>
      {<p>User Info: {token}</p>}
    </div>
  );
}

export default LoginPage;
