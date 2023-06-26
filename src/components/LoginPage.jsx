import LoginForm from './LoginForm';
import { useState } from 'react';
import axios from 'axios';

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
          window.location.href = '/cooperativescontrol';
        }else if (userInfo == 'CoopStaff') {
          window.location.href = '/cooperativescontrol';
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
      });
  };

  return (
    <div>
      <h2>Login Page </h2>
      <LoginForm
        handleLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        token={token}
      />
      {<p>User Info: {token}</p>}
    </div>
  );
}

export default LoginPage;
