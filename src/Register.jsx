import { Container, Form } from 'react-bootstrap';

import axios from 'axios';
import { useState } from 'react';

function RegisterPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let userId = localStorage.getItem('userId')
    ? localStorage.getItem('userId')
    : 'guest';
  // console.log(userId);
  //console.log(token);
  const handleRegister = async () => {
    // Login işlemini gerçekleştir ve gerekli API çağrılarını yap
    await axios
      .request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/login',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(),
      })
      .then((response) => {
        userId = response.data.adminInfo.roles[0].title;
        localStorage.setItem(
          'userId',
          response.data.adminInfo.roles[0].title
        );
        if (response === 200) {
          window.location.href = '/login';
        } else if (!response === 200) {
          window.location.href = '/customerpage';
        }
        console.log(response);
      })
      .catch((error) => {
        console.error('Login Error:', error);
      });
  };

  // if (!response === 200) {
  //   window.location.href = "/login";
  // } else if (response === 200) {
  //   window.location.href = "/adminpage";
  // }

  return (
    <Container>
      <Form className="form-signin" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="inputName"
          className="form-control"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="inputEmail" className="sr-only">
          Surname
        </label>
        <input
          type="text"
          id="inputSurname"
          className="form-control"
          placeholder="Surname"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        {userId}
      </Form>
    </Container>
  );
}

export default RegisterPage;
