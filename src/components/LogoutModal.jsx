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
        url: 'https://s3.syntradeveloper.be/bisurularavel/api/logout',
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
    <Container style={{ backgroundColor: '#cbc0d3' }}>
      <Row style={{ backgroundColor: '#cbc0d3' }}>
        <Button
          style={{
            boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
            backgroundColor: '#072c7c',
            border: '0px',
            color: 'white',
          }}
          onClick={handleShow}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#afa99f')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#072c7c')}
        >
          Logout
        </Button>
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
