import { Button, Modal, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const LogoutModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem('token');
  // console.log(token);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = '/';

    await axios
      .request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/logout',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Login Error:', error);
      });
  };

  return (
    <Container>
      <Row>
        <Button className='w-25 ms-auto' onClick={handleShow}>Logout</Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Do you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You can click to LogOut!.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              LogOut
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};

export default LogoutModal;
