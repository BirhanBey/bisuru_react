import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <Container>
      <Form
        className="form-signin d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ color: 'white', fontSize: '22px' }}
        >
          Please sign in
        </h1>
        <label
          htmlFor="inputEmail"
          className="sr-only"
          style={{ color: 'white' }}
        >
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
        <label
          htmlFor="inputPassword"
          className="sr-only"
          style={{ color: 'white' }}
        >
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
        <Button
          className="btn btn-lg btn-primary btn-block mt-3"
          style={{ backgroundColor: '#072c7c', border: 'none' }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'afa99f')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#072c7c')}
          type="submit"
        >
          Sign in
        </Button>
      </Form>
    </Container>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
